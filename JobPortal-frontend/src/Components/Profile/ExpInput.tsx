import React, { useEffect, useState } from 'react'
import fields from '../../Data/Profile'
import SelectInput from './SelectInput'
import { Button, Checkbox, Textarea } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { isNotEmpty, useForm } from '@mantine/form';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';



const ExpInput = (props:any) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [checked ,setChecked]=useState(false);
    const profile=useSelector((state:any)=>state.profile);
    const select=fields;
    const [value,setValue]=useState("")
    const dispatch=useDispatch();


    const form = useForm({
      mode: 'controlled',
      validateInputOnChange:true,
      initialValues: { title: '', company: '', location: '' ,description:'',startDate:new Date(),endDate:new Date(),working:false},
      validate:{
        title:isNotEmpty("Title is Required"),
        company:isNotEmpty("Company is Required"),
        description:isNotEmpty("Description is Required"),
        location:isNotEmpty("Location is Required"),
      }
    });
    useEffect(()=>{
      if(!props.add)
      form.setValues({title:props.title, company:props.company , location: props.location ,description:props.description ,startDate: new Date(props.startDate),endDate:new Date(props.endDate), working:props.working})
    },[])

//     const handleSave=()=>{
//       form.validate();
//       if(!form.isValid())return;
//       let exp=[...profile.experiences];
//       if(props.add)
//         {
//           exp.push(form.getValues());
//           exp[exp.length-1].startDate=exp[exp.length-1].startDate.toISOString();
//           exp[exp.length-1].endDate=exp[exp.length-1].endDate.toISOString();

//         }
//       else {
//         exp[props.index]=form.getValues();
//         exp[props.index].startDate = exp[props.index].startDate.toISOString();
// exp[props.index].endDate = exp[props.index].endDate.toISOString();

//       }
//       let updatedProfile={...profile,experiences:exp};
//       props.setEdit(false);
//       dispatch(changeProfile(updatedProfile));
//       successNotification("Success", `Experience ${props.add?"Added" :"Updated"} Successfully`);
//     }
const handleSave = () => {
  form.validate();
  if (!form.isValid()) return;

  // Get current form values
  let values = form.getValues();
  values.startDate = new Date(values.startDate);
  if (values.endDate) {
    values.endDate = new Date(values.endDate); // Ensure endDate is a Date object
  }

  let updatedExp = {
    ...values,
    startDate: values.startDate.toISOString(), // Convert startDate to ISO string
    endDate: values.endDate ? values.endDate.toISOString() : null, // Handle null endDate case
  };

  // Log the updated experience
  console.log(updatedExp);

  let exp = [...profile.experiences];

  if (props.add) {
    exp.push(updatedExp); // Add new experience
  } else {
    exp[props.index] = updatedExp; // Edit existing experience
  }

  let updatedProfile = { ...profile, experiences: exp };

  // Log the updated profile before dispatching
  console.log(updatedProfile);

  props.setEdit(false); // Close the form after saving

  // Dispatch the action to update the Redux store
  dispatch(changeProfile(updatedProfile));

  // Show success notification
  successNotification('Success', `Experience ${props.add ? 'Added' : 'Updated'} Successfully`);
};

    
  return (

    <div className='flex flex-col gap-3'>
        <div className='text-lg font-semibold'>{props.add?"Add" :"Edit"} Experience</div>
        <div className='flex gap-10 [&>*]:w-1/2 md-mx:gap-5 xs-mx:[&>*]:w-full xs-mx:flex-wrap'>
          <SelectInput form={form} name="title" {...select[0]}/>
          <SelectInput form={form} name="company" {...select[1]}/>
        
        </div>
        <SelectInput form={form} name="location" {...select[2]}/> 
        <Textarea {...form.getInputProps('description')} withAsterisk label="Summary" autosize minRows={3} />
        <div className='flex gap-10 [&>*]:w-1/2 md-mx:gap-5 xs-mx:[&>*]:w-full xs-mx:flex-wrap'>
        <MonthPickerInput {...form.getInputProps('startDate')} withAsterisk
  maxDate={form.getValues().endDate || undefined}
  label="Start Date"
  placeholder="Pick date"
/>

<MonthPickerInput {...form.getInputProps('endDate')} withAsterisk
disabled={form.getValues().working}
  minDate={form.getValues().startDate || undefined}
  maxDate={new Date()}
  label="End Date"
  placeholder="Pick date"
/>
</div>
<Checkbox checked={form.getValues().working} onChange={(event)=>form.setFieldValue("working",event.currentTarget.checked)} autoContrast label="Currently Working here" />
<div className='flex gap-5'>
      <Button color='green.8' variant='light' onClick={handleSave}>Save</Button>
      <Button color='red.8'  onClick={()=>props.setEdit(false)} variant='light'>Cancel</Button>

    </div>

    </div>
  )
}

export default ExpInput;