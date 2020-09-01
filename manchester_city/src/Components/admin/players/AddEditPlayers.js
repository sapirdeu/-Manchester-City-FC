import React, {useState, useEffect} from 'react'
import AdminLayout from '../../../Hoc/AdminLayout'
import FormFields from '../../ui/FormFields'
import { validate } from '../../ui/Misc'
import { firebase, firebaseDB, firebasePlayers } from '../../../firebase'
import Fileuploader from '../../ui/Fileuploader'


function AddEditPlayers(props) {
    const [playerID, setPlayerID] = useState('');
    const [defaultImg, setDefaultImg] = useState('');
    const [formType, setFormType] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [formError, setFormError] = useState(false);
    const [formData, setFormData] = useState({
        name:{
            element: 'input',
            value: '',
            config: {
                label: 'Player Name',
                name: 'name_input',
                type: 'text'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        lastname:{
            element: 'input',
            value: '',
            config: {
                label: 'Player Last Name',
                name: 'lastname_input',
                type: 'text'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        number:{
            element: 'input',
            value: '',
            config: {
                label: 'Player Number',
                name: 'number_input',
                type: 'text'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        position:{
            element: 'select',
            value: '',
            config: {
                label: 'Select a position',
                name: 'select_position',
                type: 'select',
                options: [
                    {key: "Keeper", value:"Keeper"},
                    {key: "Defence", value:"Defence"},
                    {key: "Midfield", value:"Midfield"},
                    {key: "Striker", value:"Striker"}
                ]
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage: '',
            showlabel: true
        },
        image:{
            element: 'image',
            value: '',
            validation:{
                required: true
            },
            valid: false
        }
    });

    const updateFields = (player, playerId, type, defaultImg) => {
        const newFormData = { ...formData}

        for(let key in newFormData){
            newFormData[key].value = player[key];
            newFormData[key].valid = true
        }

        setPlayerID(playerId);
        setDefaultImg(defaultImg);
        setFormType(type);
        setFormData(newFormData);
    }


    useEffect(()=>{
        const currPlayerId = props.match.params.id;

        if(!currPlayerId){
            setFormType('Add Player')
        } else {
            firebaseDB.ref(`players/${currPlayerId}`).once('value')
            .then((snapshot) => {
                const playerData = snapshot.val();
                
                firebase.storage().ref('players')
                .child(playerData.image)
                .getDownloadURL()
                .then((url) => {
                    updateFields(playerData, currPlayerId, 'Edit Player', url);
                    
                    // const newFormData = { ...formData}

                    // for(let key in newFormData){
                    //     newFormData[key].value = playerData[key];
                    //     newFormData[key].valid = true
                    // }

                    // setPlayerID(currPlayerId);
                    // setDefaultImg(url);
                    // setFormType('Edit Player');
                    // setFormData(newFormData);
                   
                }).catch((e)=>{
                    updateFields({
                        ...playerData,
                        image: ''
                    }, currPlayerId, 'Edit Player', '');
                })
            })
        }

    }, [props.match.params.id]);


    const successForm = (message) => {
        setFormSuccess(message);

        setTimeout(()=>{
            setFormSuccess('');
        }, 2000);
    }

    const updateForm = (element, content='') => {
        
        const newFormData = {...formData}
        const newElement = { ...newFormData[element.id]}

        if(content === ''){
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }
        
        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement;

        setFormError(false);
        setFormData(newFormData);
    }

    function submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let isFormValid = true;

        for(let key in formData){
            dataToSubmit[key] = formData[key].value;
            isFormValid = formData[key].valid && isFormValid
        }

        if(isFormValid) {
            if(formType === 'Edit Player'){
                firebaseDB.ref(`players/${playerID}`)
                .update(dataToSubmit)
                .then(()=>{
                    successForm('Updated correctly');
                }).catch((e)=>{setFormError(true);})
            } else {
                firebasePlayers.push(dataToSubmit)
                .then(()=>{
                    props.history.push('/admin_players')
                }).catch((err)=>{
                    setFormError(true);
                })
            }
        } else {
            setFormError(true);
        }
    }

    const resetImage = () => {
        const newFormData = {...formData};
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        setDefaultImg('');
        setFormData(newFormData);
    }

    const storeFilename = (filename) => {
        updateForm({id:'image'}, filename)
    }
    
    return (
        <AdminLayout>
            <div className="editplayers_dialog_wrapper">
                <h2>
                    {formType} 
                </h2>
                <div>
                    <form onSubmit={(event)=>submitForm(event)}>
                        <Fileuploader
                            dir="players"
                            tag={"Player Image"}
                            defaultImg={defaultImg}
                            defaultImgName={formData.image.value}
                            resetImage={()=>resetImage()}
                            filename={(filename)=>storeFilename(filename)}
                        />

                        <FormFields
                            id={'name'}
                            formData={formData.name}
                            change={(element)=>updateForm(element)}
                        />

                        <FormFields
                            id={'lastname'}
                            formData={formData.lastname}
                            change={(element)=>updateForm(element)}
                        />

                        <FormFields
                            id={'number'}
                            formData={formData.number}
                            change={(element)=>updateForm(element)}
                        />

                        <FormFields
                            id={'position'}
                            formData={formData.position}
                            change={(element)=>updateForm(element)}
                        />

                        
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
                            </button>
                        </div>
                                
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditPlayers
