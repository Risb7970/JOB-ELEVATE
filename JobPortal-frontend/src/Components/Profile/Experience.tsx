import { ActionIcon } from '@mantine/core'
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import ExpInput from './ExpInput'
import { useSelector } from 'react-redux'
import ExpCard from './ExpCard'
import { useMediaQuery } from '@mantine/hooks'

const Experience = () => {
    const profile=useSelector((state:any)=>state.profile);
    const [edit,setEdit]=useState(false);
    const [addexp,setAddExp]=useState(false);
      const matches=useMediaQuery('(max-width:475px)')
    
    const handleClick=()=>{
        setEdit(!edit);
    }
  return (
    <div className='px-3'>
    <div className='text-2xl font-semibold mb-5 flex justify-between'>Experience <div className='flex gap-2'>
      <ActionIcon onClick={() =>setAddExp(true)} variant='subtle' size={matches?"md":"lg"} color='brightSun.4'>
        <IconPlus className='h-4/5 w-4/5 ' />
      </ActionIcon>
      <ActionIcon variant='subtle' size={matches?"md":"lg"} color={edit?"red.8":"brightSun.4"} onClick={handleClick}>
        {edit ? <IconX className='h-4/5 w-4/5 ' /> : <IconPencil className='h-4/5 w-4/5 ' />}
      </ActionIcon></div></div>
    <div className='flex flex-col gap-8'>
      {
      profile?.experiences?.map((exp: any, index: number) => <ExpCard {...exp} key={index} index={index} edit={edit} />)
      }
      
      
      {addexp && <ExpInput setEdit={setAddExp} add/>}
    </div>

  </div>
  )
}

export default Experience