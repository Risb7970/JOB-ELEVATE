import { IconAnchor, IconArrowLeft, IconWorld } from "@tabler/icons-react";
import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
    const location = useLocation();
    const navigate =useNavigate();
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] sm-mx:overflow-y-auto overflow-hidden relative ">
            <Button className="!absolute left-5 z-10" onClick={()=>navigate("/")} my="md" leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">Home</Button>
            <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0
                 ${location.pathname==='/signup'?'-translate-x-1/2 sm-mx:-translate-x-full':'translate-x-0'}`}>
                <Login/>
                <div className={`w-1/2 h-full sm-mx:hidden sm-mx:min-h-full transition-all duration-1000 ease-in-out
                     ${location.pathname==="/signup"?"rounded-r-[300px]":"rounded-l-[300px]"} bg-mine-shaft-900 flex items-center
                      gap-5 justify-center flex-col`}>
                    <div className="flex gap-1  items-center text-bright-sun-400">
                        <IconWorld className="h-16 w-16" stroke={2.5} />
                        <div className="text-6xl font-semibold  bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl ">JobElevate</div>
                    </div>
                    <div className="text-2xl text-mine-shaft-200 font-semibold  bs-mx:text-xl md-mx:text-lg">Find the Job made for you</div>
                </div>
                <SignUp/>
            </div>
        </div>
    )
}

export default SignUpPage; 