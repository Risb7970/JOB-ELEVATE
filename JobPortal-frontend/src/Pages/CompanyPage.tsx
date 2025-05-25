import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"

import SimilarCompanies from "../Components/CompanyProfile/SimilarCompanies";
import Company from "../Components/CompanyProfile/Company";

const CompanyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Button onClick={()=>navigate(-1)} my="md" leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">Back</Button>
        <div className="flex gap-5 justify-between">
          <Company/>
          <SimilarCompanies/>
        </div>
      </div>)
}

export default CompanyPage;