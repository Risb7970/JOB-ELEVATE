import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import { dropdownData } from "../../Data/JobsData";

import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const matches = useMediaQuery('(max-width:475px)');
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([1, 50]);
    const [name, setName] = useState('');
    const handleChange = (name: any, event: any) => {
        if (name == "exp") dispatch(updateFilter({ exp: event }));
        else {
            dispatch(updateFilter({ name: event.target.value }));
            setName(event.target.value);
        }
    }
    return (
        <div>
            <div className='flex justify-end'>
                {matches && <Button onClick={toggle} variant='outline' m="sm" radius="lg" color='brightSun.4' autoContrast>{opened ? "Close" : "Filters"}</Button>}
            </div>
            <Collapse in={(opened || !matches)}>
                <div className="flex px-5 py-8 lg-mx:flex-wrap items-center">
                    <div className=" w-1/5 flex items-center lg-mx:w-1/4 bs-mx:w-[40%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
                        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20} /></div>
                        <Input defaultValue={name} onChange={(e) => handleChange("name", e)} className="[&_input]:!placeholder-mine-shaft-200"
                            variant="unstyled" placeholder="Talent Name" />
                    </div>

                    {
                        searchFields.map((item, index) => <React.Fragment key={index}><div key={index} className="w-1/5  lg-mx:w-1/4 bs-mx:w-[40%]
                 sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
                            <MultiInput {...item} />
                        </div>
                            <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
                        </React.Fragment>)
                    }
                    <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[40%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 [&_.mantine-Slider-label]:!translate-y-10">
                        <div className="flex text-sm justify-between">
                            <div>Experience (Year)</div>
                            <div>{value[0]} - {value[1]}</div>
                        </div>
                        <RangeSlider value={value} onChange={setValue} onChangeEnd={(e) => handleChange("exp", e)} min={1} max={50} minRange={1} color="brightSun.4" size="xs"
                            labelTransitionProps={{
                                transition: 'skew-down',
                                duration: 150,
                                timingFunction: 'linear',
                            }}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default SearchBar;

// import { Divider, Input, RangeSlider } from "@mantine/core";
// import { dropdownData } from "../../Data/JobsData";
// import React, { useState } from "react";
// import MultiInput from "../FindJobs/MultiInput";
// import { searchFields } from "../../Data/TalentData";
// import { IconUserCircle } from "@tabler/icons-react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateFilter } from "../../Slices/FilterSlice";
// import { Navigate } from "react-router-dom";

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: any) => state.user);
//   const [value, setValue] = useState<[number, number]>([1, 50]);
//   const [name, setName] = useState('');

//   // 🔐 Redirect to login if user is not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   const handleChange = (type: string, event: any) => {
//     if (type === "exp") {
//       dispatch(updateFilter({ exp: event }));
//     } else {
//       setName(event.target.value);
//       dispatch(updateFilter({ name: event.target.value }));
//     }
//   };

//   return (
//     <div className="flex px-5 py-8">
//       <div className="flex items-center mr-4">
//         <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
//           <IconUserCircle size={20} />
//         </div>
//         <Input
//           value={name}
//           onChange={(e) => handleChange("name", e)}
//           className="[&_input]:!placeholder-mine-shaft-200"
//           variant="unstyled"
//           placeholder="Talent Name"
//         />
//       </div>

//       {searchFields.map((item, index) => (
//         <React.Fragment key={index}>
//           <div className="w-1/5">
//             <MultiInput {...item} />
//           </div>
//           {index !== searchFields.length - 1 && (
//             <Divider mr="xs" size="xs" orientation="vertical" />
//           )}
//         </React.Fragment>
//       ))}

//       <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10 ml-4">
//         <div className="flex text-sm justify-between mb-1">
//           <div>Experience (Year)</div>
//           <div>{value[0]} - {value[1]}</div>
//         </div>
//         <RangeSlider
//           value={value}
//           onChange={setValue}
//           onChangeEnd={(e) => handleChange("exp", e)}
//           min={1}
//           max={50}
//           minRange={1}
//           color="brightSun.4"
//           size="xs"
//           labelTransitionProps={{
//             transition: 'skew-down',
//             duration: 150,
//             timingFunction: 'linear',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
