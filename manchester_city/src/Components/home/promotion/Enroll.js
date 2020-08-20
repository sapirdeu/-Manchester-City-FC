import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import FormFields from '../../ui/FormFields';
import { validate } from '../../ui/Misc';
import { firebasePromotions } from '../../../firebase';

function Enroll() {
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSuccess] = useState('');
    const [formData, setFormData] = useState({
        email:{
            element: 'input',
            value: '',
            config: {
                name: 'email_imput',
                type: 'email',
                placeholder: 'Enter your email'
            },
            validation:{
                required: true,
                email: true
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

    const submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let isFormValid = true;

        for(let key in formData){
            dataToSubmit[key] = formData[key].value;
            isFormValid = formData[key].valid && isFormValid
        }

        if(isFormValid) {
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
            .then((snapshot) =>{
                if(snapshot.val() === null){
                    firebasePromotions.push(dataToSubmit);
                    resetFormSuccess(true);
                } else {
                    resetFormSuccess(false);
                }
            })
        } else {
            setFormError(true);
        }
    }

    const resetFormSuccess = (type) => {
        const newFormData = {...formData};

        for(let key in formData){
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        setFormData(newFormData);
        setFormError(false);
        type ? setFormSuccess('Congratulations') : setFormSuccess('Already on the database');

        clearSuccessMessage();
    }

    const clearSuccessMessage = () => {
        setTimeout(()=>{
            setFormSuccess('');
        }, 2000)
    } 

    return (
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={(event)=> submitForm(event)}>
                    <div className="enroll_title">
                        Enter your email
                    </div>
                    <div className="enroll_input">
                        <FormFields
                            id={'email'}
                            formData={formData.email}
                            change={(element)=>updateForm(element)}
                        />

                        {formError ? 
                            <div className="error_label">Something is wrong, try again</div>
                            : null
                        }

                        <div className="success_label">
                            {formSuccess}
                        </div>

                        <button onClick={(event)=> submitForm(event)}>
                            Enroll
                        </button>
                    </div>
                </form>
            </div>
        </Fade>
    )
}

export default Enroll
