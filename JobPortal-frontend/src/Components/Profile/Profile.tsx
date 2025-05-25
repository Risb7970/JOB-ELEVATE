import { ActionIcon, Avatar, Button, Divider, FileInput, Overlay, TagsInput, Textarea } from "@mantine/core";
import { IconAdjustments, IconBriefcase, IconDeviceFloppy, IconEdit, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { profile } from "../../Data/TalentData";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../../Services/NotificationService";
import { getBase64 } from "../../Services/Utilities";

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const { hovered, ref } = useHover();
    const handleFileChange = async (image: any) => {
        let picture: any = await getBase64(image);
        let updatedProfile = { ...profile, picture: picture.split(',')[1] };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", 'Profile Picture Updated Successfully');
    }
   
    return (
        <div className="w-4/5 lg-mx:w-full mx-auto">
            <div className="">
            <div className="relative px-5">
                <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="Banner" />
                <div ref={ref} className="-bottom-1/3 cursor-pointer !rounded-full absolute flex items-center justify-center md-mx:-bottom-10
                sm-mx:-bottom-16 left-6">
                    <Avatar className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 rounded-full sm-mx:!w-36 sm-mx:!h-36 xm-mx:!w-32 xs-mx:!w-36
                     border-mine-shaft-950 border-8"
                        src={profile.picture?`data:image/jpeg;base64, ${profile.picture}`:"/Profile/avatarpro.png"} alt="Avatar" />
                    {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
                    {hovered && <IconEdit className='absolute z-[300] !w-16 !h-16' />}
                    {hovered && <FileInput className='absolute w-full z-[301] [&_*]:!h-full [&_*]:rounded-full'
                      variant='transparent' accept='image/png,image/jpeg' onChange={handleFileChange} />}
                </div>
            </div>
            <div className="px-3 mt-20">
                <Info />
            </div>
            <Divider mx="xs" my="xl" />
            <About />
            <Divider mx="xs" my="xl" />
            <Skills />
            <Divider mx="xs" my="xl" />
            <Experience />
            <Divider mx="xs" my="xl" />
            <Certificate />
            </div>
        </div>
    )
}

export default Profile;