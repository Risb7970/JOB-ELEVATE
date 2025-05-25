import { Link, useLocation } from "react-router-dom";


const NavLinks=()=>{
    
    const isLoggedIn = localStorage.getItem("token") || localStorage.getItem("user");

    const links=[
        {name:"Find Jobs" , url:"/find-jobs"},
        {name:"Find Talent" , url:"/find-talent"},
        {name:"Post Job" , url:"/post-job/0"},
        {name:"Posted Jobs" , url:"/posted-jobs/0"},
        {name:"Job History" , url:"/job-history"},
        {name:"SignUp" , url:"/signup"}
    ].filter(link => !(isLoggedIn && link.name === "SignUp"));
    const location = useLocation();
return <div className="flex bs-mx:hidden gap-5 h-full items-center text-mine-shaft-300 ">
    {
        links.map((link , index)=><div key={index} className=
        {`${location.pathname===link.url?"border-bright-sun-400 text-bright-sun-400" : "border-transparent"}
         border-t-[3px] h-full flex items-center`}>
                <Link  to={link.url} >{link.name}</Link>
            </div>)
        
    }
</div>
}
export default NavLinks;