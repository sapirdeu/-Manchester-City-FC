// import React, {useState} from 'react'
import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../Hoc/AdminLayout'
import FormFields from '../../ui/FormFields'
import { validate } from '../../ui/Misc'
import { firebaseDB, firebaseMatches, firebaseTeams } from '../../../firebase'
import {firebaseLooper} from '../../ui/Misc'

function AddEditMatch(props) {
    const [matchID, setMatchID] = useState('');
    const [formType, setFormType] = useState('');
    const [teams, setTeams] = useState([]);
    const [formSuccess, setFormSuccess] = useState('');
    const [formError, setFormError] = useState(false);
    const [formData, setFormData] = useState({
        date:{
            element: 'input',
            value: '',
            config: {
                label: 'Event date',
                name: 'date_input',
                type: 'date'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        local:{
            element: 'select',
            value: '',
            config: {
                label: 'Select a local team',
                name: 'select_team',
                type: 'select',
                options: []
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: false
        },
        resultLocal:{
            element: 'input',
            value: '',
            config: {
                label: 'Result local',
                name: 'result_local_input',
                type: 'text'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: false
        },
        away:{
            element: 'select',
            value: '',
            config: {
                label: 'Select a away team',
                name: 'select_team',
                type: 'select',
                options: []
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: false
        },
        resultAway:{
            element: 'input',
            value: '',
            config: {
                label: 'Result away',
                name: 'result_away_input',
                type: 'text'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: false
        },
        referee:{
            element: 'input',
            value: '',
            config: {
                label: 'Referee',
                name: 'referee_input',
                type: 'text'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        stadium:{
            element: 'input',
            value: '',
            config: {
                label: 'Stadium',
                name: 'stadium_input',
                type: 'text'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        result:{
            element: 'select',
            value: '',
            config: {
                label: 'Team result',
                name: 'select_result',
                type: 'select',
                options: [{key: 'W', value:'W'}, {key: 'L', value:'L'}, {key: 'D', value:'D'}, {key: 'n/a', value:'n/a'}]
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        final:{
            element: 'select',
            value: '',
            config: {
                label: 'Game played?',
                name: 'select_played',
                type: 'select',
                options: [{key: 'Yes', value:'Yes'}, {key: 'No', value:'No'}]
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        }
    });

    const updateFields = (match, teamsOptions, allTeams, type, currMatchId)=>{
        
        const newFormData = {...formData}

        for(let key in newFormData){
            if(match){
                newFormData[key].value = match[key];
                newFormData[key].valid = true;
            }
            if(key === 'local' || key === 'away'){
                newFormData[key].config.options = teamsOptions;
            }
        }

        setMatchID(currMatchId);
        setFormType(type);
        setFormData(newFormData);
        setTeams(allTeams);
    }

    useEffect(()=>{
        const currMatchId = props.match.params.id;
        
        const getTeams = (match, type) => {
            firebaseTeams.once('value')
            .then((snapshot)=>{
                const allTeams = firebaseLooper(snapshot);
                const teamsOptions = []
                snapshot.forEach((childSnapshot)=>{
                    teamsOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                });
    
                updateFields(match, teamsOptions, allTeams, type, currMatchId);

                
            })

            
        }

            if (!currMatchId) {
               
                getTeams(false, 'Add Match');
            } else {
                firebaseDB.ref(`matches/${currMatchId}`).once('value')
                .then((snapshot)=>{
                    const match = snapshot.val();
                    getTeams(match, 'Edit Match');
                })
            }
    }, []);

    const successForm = (message) => {
        setFormSuccess(message);

        setTimeout(()=>{
            setFormSuccess('');
        }, 2000);
    }

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

    function submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let isFormValid = true;

        for(let key in formData){
            dataToSubmit[key] = formData[key].value;
            isFormValid = formData[key].valid && isFormValid
        }

        teams.forEach((team)=>{
            if(team.value === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.value;
            }

            if(team.value === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.value;
            }
        })

        if(isFormValid) {
            if(formType === 'Edit Match'){
                firebaseDB.ref(`matches/${matchID}`)
                .update(dataToSubmit)
                .then(()=>{
                    successForm('Updated correctly');
                }).catch((e)=>{setFormError(true);})
            } else {
                firebaseMatches.push(dataToSubmit)
                .then(()=>{
                    props.history.push('/admin_matches')
                }).catch((e)=>{setFormError(true);})
            }
        } else {
            setFormError(true);
        }
    }
    
    return (
        <AdminLayout>
            <div className="editmatch_dialog_wrapper">
                <h2>
                    {formType} 
                    {/* Edit Match */}

                </h2>
                <div>
                    <form onSubmit={(event)=>submitForm(event)}>
                        <FormFields
                            id={'date'}
                            formData={formData.date}
                            change={(element)=>updateForm(element)}
                        />

                        <div className="select_team_layout">
                            <div className="label_inputs">
                                Local
                            </div>
                            <div className="wrapper">
                                <div className="left">
                                    <FormFields
                                        id={'local'}
                                        formData={formData.local}
                                        change={(element)=>updateForm(element)}
                                    />
                                </div>
                                <div>
                                    <FormFields
                                        id={'resultLocal'}
                                        formData={formData.resultLocal}
                                        change={(element)=>updateForm(element)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="select_team_layout">
                            <div className="label_inputs">
                                Away
                            </div>
                            <div className="wrapper">
                                <div className="left">
                                    <FormFields
                                        id={'away'}
                                        formData={formData.away}
                                        change={(element)=>updateForm(element)}
                                    />
                                </div>
                                <div>
                                    <FormFields
                                        id={'resultAway'}
                                        formData={formData.resultAway}
                                        change={(element)=>updateForm(element)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="split_fields">
                            <FormFields
                                id={'referee'}
                                formData={formData.referee}
                                change={(element)=>updateForm(element)}
                            />

                            <FormFields
                                id={'stadium'}
                                formData={formData.stadium}
                                change={(element)=>updateForm(element)}
                            />
                        </div>

                        <div className="split_fields">
                            <FormFields
                                id={'result'}
                                formData={formData.result}
                                change={(element)=>updateForm(element)}
                            />

                            <FormFields
                                id={'final'}
                                formData={formData.final}
                                change={(element)=>updateForm(element)}
                            />
                        </div>

                        <div className="success_label">
                            {formSuccess}
                        </div>

                        {
                            formError ?
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                :
                                ''
                        }

                        <div className="admin_submit">
                            <button onClick={(event)=>submitForm(event)}>
                                {formType} 
                                {/* Edit Match */}
                            </button>
                        </div>
                                
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditMatch
