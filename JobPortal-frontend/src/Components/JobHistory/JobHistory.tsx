import { Tabs } from "@mantine/core"
import { jobList } from "../../Data/JobsData"
import Card from "./Card"
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const [activeTab, setActiveTab] = useState<any>('APPLIED');
    const [jobList, setJobList] = useState<any>([]);
    const [showList, setShowList] = useState<any>([]);


    useEffect(() => {

        if (!user?.id) {
            // User logged out or not loaded yet
            setJobList([]);
            setShowList([]);
            return;
        }

        getAllJobs().then((res) => {
            setJobList(res);
            setShowList(res.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id &&
                        applicant.applicationStatus == "APPLIED") {
                        found = true;
                    }
                })
                return found;
            }));
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleTabChange = (value: string | null) => {
        setActiveTab(value);
        if (value == "SAVED") {
            setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
        } else {
            setShowList(jobList.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id &&
                        applicant.applicationStatus == value) {
                        found = true;
                    }
                })
                return found;
            }));
        }
    }

    if (!user?.id) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-mine-shaft-100">
        Please login to view job history.
      </div>
    );
  }

    return (
        <div className="">
            <div className="text-2xl font-semibold mb-5 ">Job History</div>
            <div>
                <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" defaultValue="about">
                    <Tabs.List className="[&_button]:text-xl sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5
                    xs-mx:[&_button]:!py-2 font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400 xs-mx:font-medium">
                        <Tabs.Tab value='APPLIED'>Applied</Tabs.Tab>
                        <Tabs.Tab value='SAVED'>Saved</Tabs.Tab>
                        <Tabs.Tab value='OFFERED'>Offered</Tabs.Tab>
                        <Tabs.Tab value='INTERVIEWING'>In Progress</Tabs.Tab>

                    </Tabs.List>

                    <Tabs.Panel value={activeTab}>
                        <div className="mt-10 flex flex-wrap gap-11 justify-between">
                            {
                                showList.map((job: any, index: any) => <Card key={index}{...job} {...{ [activeTab.toLowerCase()]: true }} />)
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}

export default JobHistory;





