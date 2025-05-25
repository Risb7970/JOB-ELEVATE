import { Tabs } from "@mantine/core"
import { activeJobs, drafts } from "../../Data/PostedJob"
import PostedJobCard from "./PostedJobCard"
import { useEffect, useState } from "react";

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>('ACTIVE');

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || 'ACTIVE');
  }, [props.job]);
  return (<div className="w-1/5 mt-5">
    <div className="text-2xl font-semibold mb-5 ">Jobs</div>
    <div>
      <Tabs autoContrast variant='pills' value={activeTab} onChange={setActiveTab}>
        <Tabs.List className='[&_button[aria-selected="false"]]:bg-mine-shaft-900 font-medium'>
          <Tabs.Tab value='ACTIVE'>Active [{props.jobList?.filter((job: any) => job?.jobStatus == "ACTIVE").length}]</Tabs.Tab>
          <Tabs.Tab value='DRAFT'>Drafts [{props.jobList?.filter((job: any) => job?.jobStatus == "DRAFT").length}]</Tabs.Tab>
          <Tabs.Tab value='CLOSED'>Closed [{props.jobList?.filter((job: any) => job?.jobStatus == "CLOSED").length}]</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
    <div className='flex flex-col gap-5 mt-5 flex-wrap'>
      {
        props.jobList?.filter((job: any) => job?.jobStatus == activeTab).map((item: any, index: number) => 
        <PostedJobCard key={index} {...item} />)
      }
    </div>
  </div>
  )
}

export default PostedJob

// import { Tabs } from "@mantine/core";
// import PostedJobCard from "./PostedJobCard";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PostedJob = (props: any) => {
//   const [activeTab, setActiveTab] = useState<string | null>('ACTIVE');
//   const user = useSelector((state: any) => state.user);

//   useEffect(() => {
//     setActiveTab(props.job?.jobStatus || 'ACTIVE');
//   }, [props.job]);

  
//   // 🔐 Redirect if user is not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }


//   const getJobCount = (status: string) =>
//     props.jobList?.filter((job: any) => job?.jobStatus === status).length || 0;

//   const filteredJobs = props.jobList?.filter(
//     (job: any) => job?.jobStatus === activeTab
//   ) || [];

//   return (
//     <div className="w-1/5 mt-5">
//       <div className="text-2xl font-semibold mb-5">Jobs</div>
//       <div>
//         <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
//           <Tabs.List className='[&_button[aria-selected="false"]]:bg-mine-shaft-900 font-medium'>
//             <Tabs.Tab value="ACTIVE">Active [{getJobCount("ACTIVE")}]</Tabs.Tab>
//             <Tabs.Tab value="DRAFT">Drafts [{getJobCount("DRAFT")}]</Tabs.Tab>
//             <Tabs.Tab value="CLOSED">Closed [{getJobCount("CLOSED")}]</Tabs.Tab>
//           </Tabs.List>
//         </Tabs>
//       </div>
//       <div className="flex flex-col gap-5 mt-5 flex-wrap">
//         {filteredJobs.map((item: any, index: number) => (
//           <PostedJobCard key={index} {...item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostedJob;
