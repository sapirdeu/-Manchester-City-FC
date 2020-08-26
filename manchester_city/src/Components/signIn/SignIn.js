import React, { useState } from 'react'
import FormFields from '../ui/FormFields'
import { validate } from '../ui/Misc'
import { firebase } from '../../firebase'

function SignIn(props) {
    const [formError, setFormError] = useState(false);
    const [formData, setFormData] = useState({
        email:{
            element: 'input',
            value: '',
            config: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Enter your email'
            },
            validation:{
                required: true,
                email: true
            },
            valid: false,
            validationMessage: ''
        },
        password:{
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter your password'
            },
            validation:{
                required: true,
            },
            valid: false,
            validationMessage: ''
        }
    });

    const updateForm = (element) => {
        const newFormData = {...formData};
        const newElement = {...newFormData[element.id]}

        newElement.value = element.event.target.value;

        let isValidData = validate(newElement);

        newElement.valid = isValidData[0];
        newElement.validationMessage = isValidData[1];

        newFormData[element.id] = newElement;
        setFormData(newFormData);
        setFormError(false);
    }

    function  submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let isFormValid = true;

        for(let key in formData){
            dataToSubmit[key] = formData[key].value;
            isFormValid = formData[key].valid && isFormValid
        }

        if(isFormValid) {
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password 
            ).then(()=>{
                props.history.push('/dashboard')
            }).catch(err => {
                setFormError(true)
            })
        } else {
            setFormError(true);
        }
    }



    return (
        <div className="container">
            <div className="signin_wrapper" style={{margin: '100px'}}>
            <form onSubmit={(event)=> submitForm(event)}>
                    <h2>Please Login</h2>
                        <FormFields
                            id={'email'}
                            formData={formData.email}
                            change={(element)=>updateForm(element)}
                        />

                        <FormFields
                            id={'password'}
                            formData={formData.password}
                            change={(element)=>updateForm(element)}
                        />

                        {formError ? 
                            <div className="error_label">Something is wrong, try again</div>
                            : null
                        }

                        <button onClick={(event)=> submitForm(event)}>
                            Log in
                        </button>
                    
                </form>
            </div>
        </div>
    )
}

export default SignIn
