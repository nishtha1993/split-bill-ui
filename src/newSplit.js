import React from 'react';
import { Form, Text, Radio, RadioGroup, TextArea, Checkbox } from 'react-form';


    // Assuming submitForm should be called to handle form submission correctly
const handleSubmit = (submitForm) => {
        submitForm(); // This should be a function that handles the form submission


    return (
        <div>
            <Form render={({ submitForm }) => (
                <form onSubmit={() => handleSubmit(submitForm)}>
                    <Text field="firstName" placeholder='First Name' />
                    <Text field="lastName" placeholder='Last Name' />
                    <RadioGroup field="gender">
                        <Radio value="male" />Male
                        <Radio value="female" />Female
                    </RadioGroup>
                    <TextArea field="bio" />
                    <Checkbox field="agreesToTerms" />
                    <button type="submit">Submit</button>
                </form>
            )} />
            <h5>Source Code:</h5>
        </div>
    );
};
