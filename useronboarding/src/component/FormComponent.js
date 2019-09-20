import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const FormComponent = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])
    return (
        <div>
            <div className='formContainer'>
                <Form className='form'>
                    <label>New User</label>
                    <Field className='formField' type='text' name='name' placeholder='Name' />
                    {touched.name && errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                    <Field className='formField' type='email' name='email' placeholder='Email' />
                    {touched.email && errors.email && (
                        <p className='error'>{errors.email}</p>
                    )}
                    <Field className='formField' type='password' name='password' placeholder='Password' />
                    {touched.password && errors.password && (
                        <p className='error'>{errors.password}</p>
                    )}
                    <h3>Agree to the Terms of Service</h3>
                    <div className='tosAgree'>
                        <Field className='formField' type='checkbox' name='tos' /><span className='agree'>Agree</span>
                    </div>
                    {touched.tos && errors.tos && (
                        <p className='error'>{errors.tos}</p>
                    )}
                    <button type='submit'>Register</button>
                </Form>
            </div>
            <div className='userContainer'>
                {users.map(user => (
                        <ul key={user.id}>
                            <li>Name: {user.name}</li>
                            <li>Email: {user.email}</li>
                            <li>Password: {'*'.repeat(user.password.length)}</li>
                        </ul>
                    ))}
            </div>
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must enter your name'),
        email: Yup.string().required('You must enter you email address'),
        password: Yup.string().required('You must enter an email'),
        tos: Yup.bool().oneOf([true], 'You must agree to the TOS')
    }),
    handleSubmit(values, { setStatus, resetForm}) {
        axios
        .post('https://reqres.in/api/users/', values)
        .then(res => setStatus(res.data))
        .catch(err => console.log(err.response))
        resetForm();
    },
})(FormComponent);

export default FormikUserForm;