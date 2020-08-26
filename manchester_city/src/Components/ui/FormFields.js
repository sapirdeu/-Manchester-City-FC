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
                        { formData.showlabel ? 
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            :
                            null
                        }

                        <input
                            {...formData.config}
                            value={formData.value}
                            onChange={(event)=>change({event,id})}
                        />
                        {showError()}
                    </div>
                )
                break;
            case('select'):
                formTemaplte = (
                    <div>
                        { formData.showlabel ? 
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            :
                            null
                        }

                        <select
                            value={formData.value}
                            onChange={(event)=>change({event,id})}
                        >
                            <option value="">Select one</option>
                           
                            {
                                formData.config.options.map((item)=>(
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>

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
