import { ActionIcon, Button, Divider } from "@mantine/core"
import { IconAdjustments, IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { card } from "../../Data/JobDescData"
//@ts-ignore
import DOMPurify from "dompurify"
import { timeAgo } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"
import { useEffect, useState } from "react"
import { errorNotification, successNotification } from "../../Services/NotificationService"
import { postJob } from "../../Services/JobService"

const JobDesc = (props: any) => {
    const dispatch = useDispatch();
    const [applied, setApplied] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
     const data = DOMPurify.sanitize(props.description);
    const handleSaveJob = () => {
        const savedJobs = profile.savedJobs?.includes(props.id)
            ? profile.savedJobs.filter((id: any) => id !== props.id)
            : [...(profile.savedJobs || []), props.id];

        const updatedProfile = { ...profile, savedJobs };
        dispatch(changeProfile(updatedProfile));
    };
    useEffect(() => {
        if (props.applicants?.filter((applicant: any) => applicant.applicantId == user.id).length > 0) {
            setApplied(true);
        } else {
            setApplied(false);
        }
    }, [props]);
    const handleClose = () => {
        postJob({ ...props, jobStatus: "CLOSED" }).then((res) => {
            successNotification("Success", "Job Closed Successfully");
        }).catch((err) => {
            errorNotification("Error", err.response.data.errorMessage);
        })
    }

    
   
    return (
        <div className="w-2/3  bs-mx:w-full">
            <div className="flex justify-between flex-wrap">
                <div className="flex gap-2 items-center ">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl  flex shrink-0">
                        <img className="h-14 rounded-md xs-mx:h-10 xs-mx:w-10 " src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-2xl  xs-mx:text-2xl">{props.jobTitle}</div>
                        <div className="text-lg text-mine-shaft-300 flex flex-wrap xs-mx:text-base"><span>{props.company} &#x2022;</span> 
                        <span>{timeAgo(props.postTime)} &#x2022; </span> <span> {props.applicants ? props.applicants.length : 0} 
                            Applicants </span></div>
                    </div>
                </div>
                <div className="flex  sm:flex-col gap-2 items-center sm-mx:my-5 sm-mx:w-full sm-mx:[&>button]:w-1/2">
                    {(props.edit || !applied) && <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
                        <Button color="brightSun.4" size="sm" variant="light">{props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}</Button>
                    </Link>}
                    {
                        !props.edit && applied && <Button color="green.8" size="sm" variant="light">Applied</Button>
                    }
                    {props.edit && !props.closed ? <Button color="red.5" onClick={handleClose} size="sm" variant="outline">Close</Button>
                        : profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled
                            onClick={handleSaveJob} className='cursor-pointer text-bright-sun-400' stroke={1.5} />
                            : <IconBookmark onClick={handleSaveJob} className='text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400'
                                stroke={1.5} />}
                </div>
            </div>
            <Divider my="xl" />
            <div className="flex justify-between gap-4 sm-mx:flex-wrap">
                {
                    card.map((item: any, index: number) => <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon color="brightSun.4" className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8" variant="light" radius="xl" aria-label="Settings">
                            <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <div className="text-sm text-mine-shaft-300 xs-mx:text-sm">{item.name}</div>
                        <div className="font-semibold text-base xs-mx:text-sm">{props ? props[item.id] : "NA"}
                            {item.id == "packageOffered" && <> LPA</>}</div>
                    </div>)
                }
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-xl font-semibold mb-5">Required Skills</div>
                <div className="flex  flex-wrap gap-2">
                    {
                        props?.skillsRequired?.map((skill: any, index: number) => <ActionIcon key={index} color="brightSun.4" 
                        className="!h-fit font-medium !text-sm xs-mx:!text-xs !w-fit"
                            variant="light" radius="xl" p="xs" aria-label="Settings">{skill}</ActionIcon>)
                    }

                </div>
            </div>
            <Divider my="xl" />
            <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold [&_li]:marker:text-bright-sun-400
            [&_li]:mb-1 [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_p]:text-sm [&_li]:text-sm" dangerouslySetInnerHTML={{ __html: data }}>
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-xl font-semibold mb-5">About Company</div>
                <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
                    <div className="flex gap-2 items-center">
                        <div className="p-3 bg-mine-shaft-800 rounded-xl">
                            <img className="h-8 " src={`/Icons/${props.company}.png`} alt="" />
                        </div>
                        <div className="flex flex-col ">
                            <div className="font-medium text-lg">{props.company}</div>
                            <div className="text-mine-shaft-300">10K+ Employees</div>
                        </div>
                    </div>
                    <Link to={`/company/${props.company}`}>
                        <Button color="brightSun.4" variant="light">Company Page</Button>
                    </Link>
                </div>
                <div className="text-mine-shaft-300 text-justify xs-mx:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sed atque, necessitatibus dolore iusto et fugiat
                    similique voluptatem! Veniam aliquam temporibus laboriosam rerum vero reprehenderit nostrum, repudiandae a
                    exercitationem totam. Soluta necessitatibus obcaecati quisquam aliquid beatae enim ut accusamus dolore.</div>
            </div>
        </div>
    )
}

export default JobDesc;

// import {
//   ActionIcon,
//   Button,
//   Divider
// } from "@mantine/core";
// import {
//   IconBookmark,
//   IconBookmarkFilled
// } from "@tabler/icons-react";
// import { Link } from "react-router-dom";
// import { card } from "../../Data/JobDescData";
// //@ts-ignore
// import DOMPurify from "dompurify";
// import { timeAgo } from "../../Services/Utilities";
// import { useDispatch, useSelector } from "react-redux";
// import { changeProfile } from "../../Slices/ProfileSlice";
// import { useEffect, useState } from "react";
// import {
//   errorNotification,
//   successNotification
// } from "../../Services/NotificationService";
// import { postJob } from "../../Services/JobService";

// const JobDesc = (props: any) => {
//   const dispatch = useDispatch();
//   const [applied, setApplied] = useState(false);
//   const profile = useSelector((state: any) => state.profile);
//   const user = useSelector((state: any) => state.user);

//   const handleSaveJob = () => {
//     const savedJobs = profile?.savedJobs?.includes(props.id)
//       ? profile.savedJobs.filter((id: any) => id !== props.id)
//       : [...(profile.savedJobs || []), props.id];

//     const updatedProfile = { ...profile, savedJobs };
//     dispatch(changeProfile(updatedProfile));
//   };

//   useEffect(() => {
//     if (
//       props?.applicants?.some(
//         (applicant: any) => applicant.applicantId === user?.id
//       )
//     ) {
//       setApplied(true);
//     } else {
//       setApplied(false);
//     }
//   }, [props]);

//   const handleClose = () => {
//     postJob({ ...props, jobStatus: "CLOSED" })
//       .then(() => {
//         successNotification("Success", "Job Closed Successfully");
//       })
//       .catch((err) => {
//         errorNotification("Error", err?.response?.data?.errorMessage || "Error closing job.");
//       });
//   };

//   const data = DOMPurify.sanitize(props?.description || "");

//   if (!props) return <p>Loading job details...</p>;

//   return (
//     <div className="w-2/3">
//       {/* Top section with logo and title */}
//       <div className="flex justify-between">
//         <div className="flex gap-2 items-center">
//           <div className="p-3 bg-mine-shaft-800 rounded-xl">
//             <img
//               className="h-14"
//               src={`/Icons/${props.company || "default"}.png`}
//               alt="Company logo"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <div className="font-semibold text-2xl">{props.jobTitle || "Untitled Job"}</div>
//             <div className="text-lg text-mine-shaft-300">
//               {props.company || "Unknown"} &#x2022;{" "}
//               {timeAgo(props.postTime) || "Some time ago"} &#x2022;{" "}
//               {props.applicants?.length || 0} Applicants
//             </div>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="flex flex-col gap-2 items-center">
//           {(props.edit || !applied) && (
//             <Link to={props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`}>
//               <Button color="brightSun.4" size="sm" variant="light">
//                 {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
//               </Button>
//             </Link>
//           )}
//           {!props.edit && applied && (
//             <Button color="green.8" size="sm" variant="light">
//               Applied
//             </Button>
//           )}
//           {props.edit && !props.closed ? (
//             <Button color="red.5" onClick={handleClose} size="sm" variant="outline">
//               Close
//             </Button>
//           ) : profile?.savedJobs?.includes(props.id) ? (
//             <IconBookmarkFilled
//               onClick={handleSaveJob}
//               className="cursor-pointer text-bright-sun-400"
//               stroke={1.5}
//             />
//           ) : (
//             <IconBookmark
//               onClick={handleSaveJob}
//               className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400"
//               stroke={1.5}
//             />
//           )}
//         </div>
//       </div>

//       <Divider my="xl" />

//       {/* Job details cards */}
//       <div className="flex justify-between">
//         {card.map((item: any, index: number) => (
//           <div key={index} className="flex flex-col items-center gap-1">
//             <ActionIcon
//               color="brightSun.4"
//               className="!h-12 !w-12"
//               variant="light"
//               radius="xl"
//               aria-label="Settings"
//             >
//               <item.icon className="h-4/5 w-4/5" stroke={1.5} />
//             </ActionIcon>
//             <div className="text-sm text-mine-shaft-300">{item.name}</div>
//             <div className="font-semibold text-base">
//               {props?.[item.id] || "NA"}
//               {item.id === "packageOffered" && " LPA"}
//             </div>
//           </div>
//         ))}
//       </div>

//       <Divider my="xl" />

//       {/* Skills */}
//       <div>
//         <div className="text-xl font-semibold mb-5">Required Skills</div>
//         <div className="flex flex-wrap gap-2">
//           {props?.skillsRequired?.map((skill: string, index: number) => (
//             <ActionIcon
//               key={index}
//               color="brightSun.4"
//               className="!h-fit font-medium !text-sm !w-fit"
//               variant="light"
//               radius="xl"
//               p="xs"
//               aria-label="Skill"
//             >
//               {skill}
//             </ActionIcon>
//           ))}
//         </div>
//       </div>

//       <Divider my="xl" />

//       {/* Job description (HTML) */}
//       <div
//         className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold [&_li]:marker:text-bright-sun-400
//             [&_li]:mb-1 [&_h4]:text-mine-shaft-200 [&_p]:text-justify"
//         dangerouslySetInnerHTML={{ __html: data }}
//       ></div>

//       <Divider my="xl" />

//       {/* Company info */}
//       <div>
//         <div className="text-xl font-semibold mb-5">About Company</div>
//         <div className="flex justify-between mb-3">
//           <div className="flex gap-2 items-center">
//             <div className="p-3 bg-mine-shaft-800 rounded-xl">
//               <img
//                 className="h-8"
//                 src={`/Icons/${props.company || "default"}.png`}
//                 alt=""
//               />
//             </div>
//             <div className="flex flex-col">
//               <div className="font-medium text-lg">{props.company || "Company Name"}</div>
//               <div className="text-mine-shaft-300">10K+ Employees</div>
//             </div>
//           </div>
//           <Link to={`/company/${props.company}`}>
//             <Button color="brightSun.4" variant="light">
//               Company Page
//             </Button>
//           </Link>
//         </div>
//         <div className="text-mine-shaft-300 text-justify">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sed atque, necessitatibus
//           dolore iusto et fugiat similique voluptatem! Veniam aliquam temporibus laboriosam rerum
//           vero reprehenderit nostrum, repudiandae a exercitationem totam. Soluta necessitatibus
//           obcaecati quisquam aliquid beatae enim ut accusamus dolore.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDesc;
