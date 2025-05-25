import { Avatar, Button, Divider, Modal, Text } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconMapPin } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfile } from '../../Services/ProfileService';
import { changeAppStatus } from '../../Services/JobService';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { openBase64PDF } from '../../Services/Utilities';

const TalentCard = (props: any) => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProfile(props);
    }
  }, [props]);

  const handleOffer = (status: string) => {
    if (status === 'INTERVIEWING') {
      if (!date || !time || !time.includes(":")) {
        errorNotification("Invalid Input", "Please provide both date and time in correct format");
        return;
      }

      // Parse time string "HH:mm"
      const [hours, minutes] = time.split(":").map(Number);

      // Create a new Date object combining date and time
      const interviewDateTime = new Date(date);
      interviewDateTime.setHours(hours, minutes, 0, 0);

      // Convert to ISO string (backend expected format)
      const isoDateTime = interviewDateTime.toISOString();

      const interview: any = {
        id,
        applicantId: profile?.id,
        applicationStatus: status,
        interviewTime: isoDateTime,
      };

      changeAppStatus(interview)
        .then(() => {
          successNotification("Interview Scheduled", "Interview Scheduled Successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          errorNotification("Error", err.response?.data?.errorMessage || "An error occurred");
        });

      return;
    }

    const interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };

    changeAppStatus(interview)
      .then(() => {
        if (status === "OFFERED") successNotification("Offered", "Offered has been sent Successfully");
        else successNotification("Rejected", "Applicant has been Rejected");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response?.data?.errorMessage || "An error occurred");
      });
  };

  // Format interview time in local display
  const formatLocalTime = (dateTimeString: string) => {
    const dateObj = new Date(dateTimeString);
    return dateObj.toLocaleString();
  };

  const handleMsg = () => {
    if (profile?.email) {
      window.open(`mailto:${profile.email}`, '_blank');
    }
  };

  return (
    <div className='bg-mine-shaft-900 p-4 w-96  bs-mx:w-full flex flex-col gap-3 rounded-xl
     hover:shadow-[0_0_5px_1px_yelllow] !shadow-bright-sun-400'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <div className='p-2 bg-mine-shaft-800 rounded-full'>
            <Avatar src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : "/Icons/avatar1.png"} />
          </div>
          <div>
            <div className='font-semibold text-lg'>{props.name}</div>
            <div className='text-smtext-mine-shaft-300'>{profile?.jobTitle} &#x2022; {profile?.company}</div>
          </div>
        </div>
        <IconHeart className='cursor-pointer text-mine-shaft-300 stroke{1.5}'/>
      </div>
      
      <div className='flex gap-2 flex-wrap [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs'>
        {profile?.skills?.map((skill: any, index: any) => (index < 4 &&
          <div key={index}>{skill}</div>
        ))}
      </div>

      <div>
        <Text lineClamp={3} className='!text-xs text-justify !text-mine-shaft-300'>
          {profile.about}
        </Text>
      </div>

      <Divider color='mine-shaft.7' size="xs" />
      {
        props.invited ? (
          <div className='flex gap-1 text-mine-shaft-200 text-sm items-center'>
            <IconCalendarMonth stroke={1.5} /> Interview: {formatLocalTime(props.interviewTime)}
          </div>
        ) : (
          <div className='flex justify-between'>
            <div className=' text-mine-shaft-300'>Exp: {profile.totalExp ? profile.totalExp : 0} Years</div>
            <div className='flex items-center gap-1 text-xs text-mine-shaft-400'>
              <IconMapPin stroke={1.5} className='h-5 w-5' />{profile?.location}
            </div>
          </div>
        )
      }

      <Divider color='mine-shaft.7' size="xs" />
      <div className='flex [&>*]:w-1/2 [&>*]:p-1'>
        {
          !props.invited && <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color='brightSun.4' fullWidth variant='outline'>Profile</Button>
            </Link>
            <div>
              {props.posted ?
                <Button onClick={open} rightSection={<IconCalendarMonth className='w-5 h-5' />} color='brightSun.4' fullWidth variant='light'>Schedule</Button> :
                <Button color='brightSun.4' fullWidth variant='light' onClick={handleMsg}>Message</Button>}
            </div>
          </>
        }

        {
          props.invited && <>
            <div>
              <Button color='brightSun4' onClick={() => handleOffer("OFFERED")} fullWidth variant='outline'>Accept</Button>
            </div>
            <div>
              <Button color='brightSun.4' onClick={() => handleOffer("REJECTED")} fullWidth variant='light'>Reject</Button>
            </div>
          </>
        }
      </div>

      {(props.invited || props.posted) && <Button color='brightSun.4' fullWidth variant='filled' autoContrast onClick={openApp}>View Application</Button>}

      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-4'>
          <DateInput
            minDate={new Date()}
            value={date}
            onChange={(value) => {
              if (value === null) {
                setDate(null);
              } else if (Object.prototype.toString.call(value) === '[object Date]') {
                setDate(value as unknown as Date);  // <-- cast via unknown
              } else if (typeof value === "string") {
                setDate(new Date(value));
              }
            }}
            label="Date"
            placeholder="Enter Date"
          />



          <TimeInput
            value={time ?? ''}
            label="Time"
            ref={ref}
            onChange={(event) => setTime(event.currentTarget.value)}
            onClick={() => ref.current?.showPicker()}
          />
          <Button onClick={() => handleOffer("INTERVIEWING")} color='brightSun.4' fullWidth variant='light'>Schedule</Button>
        </div>
      </Modal>

      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className='flex flex-col gap-4'>
          <div>
            Email :&emsp;<a href={`mailto:${props.email}`} className='text-bright-sun-400 hover:underline cursor-pointer text-center'>{props.email}</a>
          </div>
          <div>
            Website :&emsp;<a href={props.website} className='text-bright-sun-400 hover:underline cursor-pointer text-center' target='_blank'>{props.website}</a>
          </div>
          <div>
            Resume :&emsp;<span onClick={() => openBase64PDF(props.resume)} className='text-bright-sun-400 hover:underline cursor-pointer text-center'>{props.name}</span>
          </div>
          <div>
            Cover Letter :&emsp;<div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
