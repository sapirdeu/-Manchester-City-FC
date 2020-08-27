import React, { useState, useEffect } from 'react'
import {firebase}  from '../../firebase'
import FileUploader from 'react-firebase-file-uploader'
import CircularProgress from '@material-ui/core/CircularProgress'

function Fileuploader(props) {
    const [imgName, setImgName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [fileURL, setFileURL] = useState('');

    useEffect(()=>{
        if(props.defaultImgName){
            setImgName(props.defaultImgName);
            setFileURL(props.defaultImg);
        }
    }, [props.defaultImgName, props.defaultImg]);

    const handleUploadStart = () => {
        setIsUploading(true);
    }

    const handleUploadError = () => {
        setIsUploading(false);
    }

    const handleUploadSuccess = (filename) => {
        setImgName(filename);
        setIsUploading(false);

        firebase.storage().ref(props.dir)
        .child(filename)
        .getDownloadURL()
        .then((url) => {            
            setFileURL(url);
        })

        props.filename(filename);
    }

    const uploadAgain = () => {
        setImgName('');
        setIsUploading(false);
        setFileURL('');

        props.resetImage();
    }

    return (
        <div>
            {!fileURL ?
                <div>
                    <div className="label_inputs">{props.tag}</div>
                    <FileUploader
                        accept="image/*"
                        name="image"
                        randomizeFilename
                        storageRef={firebase.storage().ref(props.dir)}
                        onUploadStart={()=>handleUploadStart()}
                        onUploadError={()=>handleUploadError()}
                        onUploadSuccess={(filename)=>handleUploadSuccess(filename)}
                    />
                </div>
                :
                null
            }

            {
                isUploading ? 
                    <div
                        className="progress"
                        style={{textAlign:'center', margin:'30px 0px'}}
                    >
                        <CircularProgress
                            style={{color:'#98c6e9'}}
                            thickness={7}
                        />
                    </div>
                    :
                    null
            }

            {
                fileURL ?
                    <div className="image_upload_container">
                        <img
                            style={{width:'100%'}}
                            src={fileURL}
                            alt={imgName}
                        />
                        <div className="remove" onClick={()=>uploadAgain()}>
                            Remove
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Fileuploader
