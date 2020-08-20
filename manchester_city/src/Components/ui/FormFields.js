import React from 'react'

function FormFields({id, formData, change}) {

    const showError = () => {
        let errorMessage = 
            <div className="error_label">
                {
                    formData.validation && !formData.valid ? 
                        formData.validationMessage
                    : null
                }
            </div>
        return errorMessage;
    }

    const renderTemaplte = () => {
        let formTemaplte = null;
        
        switch(formData.element){
            case('input'):
                formTemaplte = (
                    <div>
                        <input
                            {...formData.config}
                            value={formData.value}
                            onChange={(event)=>change({event,id})}
                        />
                        {showError()}
                    </div>
                )
                break;
            default:
                formTemaplte = null;
        }
        return formTemaplte;
    }

    return (
        <div>
            {renderTemaplte()}
        </div>
    )
}

export default FormFields
