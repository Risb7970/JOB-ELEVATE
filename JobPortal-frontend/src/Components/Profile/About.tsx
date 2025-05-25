import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";


const About = () => {
    const dispatch = useDispatch();
     const[edit , setEdit] = useState(false);
     const profile = useSelector((state:any)=>state.profile);
     const [about , setAbout] = useState("");
     const matches = useMediaQuery('(max-width :475px)')
        const handleClick=()=>{
            if(!edit){
                setEdit(true);
                setAbout(profile.about);
            }else setEdit(false);
        }
        const handleSave=()=>{
                 setEdit(false);
            let updatedProfile = {...profile , about:about};
            dispatch(changeProfile(updatedProfile));
            successNotification("Success" , "About Updated Successfully");
        }
  return (
     <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">About <div>
                {edit && <ActionIcon onClick={handleSave}
                    size={matches?"md":"lg"} color="green.8" variant="subtle">
                     <IconCheck className="h-4/5 w-4/5" stroke={1.5} />
                </ActionIcon>}
                <ActionIcon onClick={handleClick}
                    size={matches?"md":"lg"} color={edit?"red.8":"brightSun.4"} variant="subtle">
                    {edit? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                </ActionIcon>
                </div></div>
                {
                    edit ? <Textarea value={about} placeholder="Enter about Yourself..." autosize minRows={3} onChange={(e) => setAbout(e.target.value)}
                    /> : <div className="text-sm text-mine-shaft-300 text-justify">
                        {profile?.about}
                    </div>
                }

            </div>
  )
}

export default About