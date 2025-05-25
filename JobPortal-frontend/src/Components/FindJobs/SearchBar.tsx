import React, { useState } from 'react'
import MultiInput from './MultiInput'
import { dropdownData } from '../../Data/JobsData'
import { Button, Collapse, Divider, RangeSlider } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../../Slices/FilterSlice'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

const SearchBar = () => {
const matches=useMediaQuery('(max-width:475px)');
  const dispatch = useDispatch();
  const [value, setvalue] = useState<[number, number]>([0, 300]);
const [opened ,{toggle}]=useDisclosure(false);

  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  }

  return (
    <div>
      <div className='flex justify-end'>
     {matches && <Button onClick={toggle}variant='outline' m="sm" radius="lg" color='brightSun.4' autoContrast>{opened ?"Close":"Filters"}</Button>}
      </div>
    <Collapse in={(opened || !matches)}>
    <div className='flex lg-mx:flex-wrap px-5 py-8 items-center !text-mine-shaft-100'>
      {
        dropdownData.map((item, index) => <React.Fragment key={index}><div className='w-1/5 hover:[&_.mantine-PillGroup-group]:cursor-pointer 
        lg-mx:w-1/4 bs-mx:w-[40%] sm-mx:w-[48%] xs-mx:w-full  xs-mx:mb-1'>
          <MultiInput {...item} />
        </div>
          <Divider className='sm-mx:hidden' mr="xs" size="xs" orientation='vertical' />
        </React.Fragment>)
      }
      <div className='w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[40%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1'>   {/*[&_.mantine-Slider-label]:!translate-y-10 */}
        <div className='flex justify-between text-sm'>
          <div>Salary</div>
          <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
        </div>
        <RangeSlider min={1} max={300} minRange={1} onChangeEnd={(e) => handleChange(e)} size='xs' value={value} onChange={setvalue} color='brightSun.4' labelTransitionProps={{ transition: 'skew-down', duration: 150, timingFunction: 'linear' }} />
      </div>
    </div>
    </Collapse>
    </div>
  )
}

export default SearchBar

// import { Divider, RangeSlider } from "@mantine/core";
// import { dropdownData } from "../../Data/JobsData";
// import MultiInput from "./MultiInput";
// import { useState } from "react";
// import { updateFilter } from "../../Slices/FilterSlice";
// import { useDispatch } from "react-redux";

// const SearchBar = () => {
//         const dispatch = useDispatch();
//     const [value, setValue] = useState<[number, number]>([0, 300]);
//      const handleChange = ( event: any) => {
//      dispatch(updateFilter({ salary: event }));
//   }
//     return (
//         <div className="flex px-5 py-8">
//             {
//                 dropdownData.map((item, index) => <><div key={index} className="w-1/5">
//                     <MultiInput {...item} />
//                 </div>
//                     <Divider mr="xs" size="xs" orientation="vertical" />
//                 </>)
//             }
//             <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
//             <div className="flex text-sm justify-between">
//                 <div>Salary</div>
//                 <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
//             </div>
//                 <RangeSlider color="brightSun.4" size="xs" value={value} onChange={setValue}  onChangeEnd={(e)=>handleChange(e)}
//                 labelTransitionProps={{
//                     transition: 'skew-down',
//                     duration: 150,
//                     timingFunction: 'linear',
//                   }} 
//                  />
//             </div>
//         </div>
//     )
// }

// export default SearchBar;

