import React from 'react';
import fields from '../../Data/Profile';
import SelectInput from './SelectInput';
import { Button, TextInput } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';


const CertiInput = (props: any) => {
  const select = fields;
 
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      issuer: '',
      issueDate: new Date(), // use Date instead of string
      certificateId: '',
    },
    validate: {
      name: isNotEmpty('Name is Required'),
      issuer: isNotEmpty('Company or Issuer is Required'),
      issueDate: isNotEmpty('Date is Required'),
      certificateId: isNotEmpty('Certificate ID is Required'),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    const values = form.getValues();

    // Adjust time to noon to prevent timezone shifting months
    const toISOStringNoon = (date: Date) => {
      const d = new Date(date);
      d.setHours(12, 0, 0, 0);
      return d.toISOString();
    };

    const newCert = {
      ...values,
      issueDate: toISOStringNoon(values.issueDate),
    };

    const updatedCertifications = [...profile.certifications, newCert];
    const updatedProfile = {
      ...profile,
      certifications: updatedCertifications,
    };

    dispatch(changeProfile(updatedProfile));
    successNotification('Success', 'Certificate Added Successfully');
    props.setEdit(false); // Close the input form
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>

      <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 xs-mx:[&>*]:w-full xs-mx:flex-wrap">
        <TextInput {...form.getInputProps('name')} label="Title" withAsterisk placeholder="Enter Title" />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>

      <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 xs-mx:[&>*]:w-full xs-mx:flex-wrap">
        <MonthPickerInput
          withAsterisk
          label="Issue Date"
          placeholder="Pick date"
          maxDate={new Date()}
          {...form.getInputProps('issueDate')}
        />
        <TextInput
          label="Certificate ID"
          withAsterisk
          placeholder="Enter ID"
          {...form.getInputProps('certificateId')}
        />
      </div>

      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          Save
        </Button>
        <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
