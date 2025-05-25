import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "../Components/Header/Header"
import { Divider } from "@mantine/core"
import FindJobs from "./FindJobs"
import FindTalentPage from "./FindTalentPage"
import CompanyPage from "./CompanyPage"
import PostedJobPage from "./PostedJobPage"
import JobHistoryPage from "./JobHistoryPage"
import JobDescPage from "./JobDescPage"
import Footer from "../Components/Footer/Footer"
import HomePage from "./HomePage"
import TalentProfilePage from "./TalentProfilePage"
import ProfilePage from "./ProfilePage"
import SignUpPage from "./SignUpPage"
import PostJobPage from "./PostJobPage"
import ApplyJobPage from "./ApplyJobPage"
import { useSelector } from "react-redux"
import ProtectedRoute from "../Services/ProtectedRoute"
import PublicRoute from "../Services/PublicRoute"

const AppRoutes=()=>{
    const user = useSelector((state:any)=>state.user);
    return(
     <BrowserRouter>
      <div className='relative'>
      <Header/>
      <Divider size="xs" mx="md" />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/find-jobs' element={<FindJobs/>}/>
        <Route path='/find-talent' element={<FindTalentPage/>}/>
        <Route path='/company/:name' element={<CompanyPage/>}/>
        <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobPage/></ProtectedRoute>}/>
        <Route path='job-history' element={<PublicRoute><JobHistoryPage/></PublicRoute>}/>
        <Route path='/jobs/:id' element={<JobDescPage/>}/>
        <Route path='/apply-job/:id' element={<ApplyJobPage/>}/>
        <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage/></ProtectedRoute>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<SignUpPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/talent-profile/:id' element={<TalentProfilePage/>}/>
      </Routes>
      <Footer/>
      </div>
      </BrowserRouter>
    )
}

export default AppRoutes;