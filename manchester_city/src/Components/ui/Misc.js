import React from 'react';
import {Link} from 'react-router-dom';

function Tag(props) {
    const template = 
        <div 
            style={{
                background: props.bck,
                fontSize: props.size,
                color: props.color,
                padding: '5px 10px',
                display: 'inline-block',
                fontFamily: 'Righteous',
                ...props.add
            }}
        >
            {props.children}
        </div>

    if (props.link){
        return (
            <Link to={props.linkTo} className="link_logo">
                {template}
            </Link>
        )
    } else {
        return template;
    }
}

function FirebaseLooper(snapshot) {
    let data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key  
        })
    });
    return data
}

function reverseArray(arr) {
    let reversedArr = [];
    for(let i = arr.length-1; i>=0; i--){
        reversedArr.push(arr[i])
    }
    return reversedArr
}

function validate(element) {
    let error = [true,''];

    if (element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    return error;
}

export {Tag, FirebaseLooper, reverseArray, validate}