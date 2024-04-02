import React, { Component } from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from 'react-form';
 
const newSplit = () => (
  <Form render={({
    submitForm
  }) => (
    <form onSubmit={newSplit}>
      <Text field="firstName" placeholder='First Name' />
      <Text field="lastName" placeholder='Last Name' />
      <RadioGroup field="gender">
        <Radio value="male" />
        <Radio value="female" />
      </RadioGroup>
      <TextArea field="bio" />
      <Checkbox field="agreesToTerms" />
      <button type="submit">Submit</button>
    </form>
  )} 
  />
  return (
    <div>
      <h5>Source Code:</h5>
   
    </div>
  )
}
