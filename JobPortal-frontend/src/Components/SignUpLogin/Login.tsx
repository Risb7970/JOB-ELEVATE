import { Button, LoadingOverlay, PasswordInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginValidation } from "../../Services/FormValidation"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch } from "react-redux"
import { setUser } from "../../Slices/UserSlice"
import { errorNotification, successNotification } from "../../Services/NotificationService"
import { setJwt } from "../../Slices/JwtSlice"
import { loginUser } from "../../Services/AuthService"
import { jwtDecode } from "jwt-decode"

const Login = () => {
  const dispatch = useDispatch();
  const form = {
  email: "",
  password: "",
}
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  }
  const handleSubmit = () => {
    let valid = true, newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
       setLoading(true);
      loginUser(data).then((res) => {
        successNotification('Login Successful' , "Redirecting to home page..." );
          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
           dispatch(setUser({...decoded , email:decoded.sub}));
        setTimeout(() => {
          navigate("/");
        }, 4000)
      }).catch((err) => {
        setLoading(false);
        console.log(err);
        errorNotification("Login Failed" , err.response.data.errorMessage );
      });
    }
  }

  return (
    <>
     <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'green', type: 'bars' }}
        />

      <div className="w-1/2 px-20 bs-mx:px-10 md-mx:px-5 sm-mx:w-full flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Login to Your Account</div>
        <TextInput error={formError.email} value={data.email} name="email" onChange={handleChange} 
        withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email"
          placeholder="Your email" />


        <PasswordInput error={formError.password} value={data.password} name="password" onChange={handleChange}
         withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />


        <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>


        <div className="text-center sm-mx:text-sm xs-mx:text-xs">Don't have an account? <span onClick={() => { navigate("/signup"); 
          setFormError(form); setData(form) }} className="text-bright-sun-400 hover:underline cursor-pointer">SignUp</span></div>
        <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center sm-mx:text-sm xs-mx:text-xs">Forget Password</div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  )
}

export default Login