import { Button, Divider, Text } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled, IconClockHour3 } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"

const JobCard = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const handleSaveJob = () => {
    const savedJobs = profile.savedJobs?.includes(props.id)
      ? profile.savedJobs.filter((id: any) => id !== props.id)
      : [...(profile.savedJobs || []), props.id];

    const updatedProfile = { ...profile, savedJobs };
    dispatch(changeProfile(updatedProfile));
  };

  return (
    <div className="bg-mine-shaft-900 p-5 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow]
    transition duration-300 ease-in-out sm-mx:w-full !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-md">
            <img className="h-7 " src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">{props.company} &#x2022;{props.applicants ? props.applicants.length : 0} Applicants</div>
          </div>
        </div>
        {profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className='cursor-pointer text-bright-sun-400' stroke={1.5} />
          : <IconBookmark onClick={handleSaveJob} className='text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400' stroke={1.5} />}
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>{props.about}</Text>
      <Divider size="sm" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          &#8377; {props.packageOffered} LPA
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-5 w-5" stroke={1.5} />Posted {timeAgo(props.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">View Job</Button>
      </Link>
    </div>
  )
}

export default JobCard