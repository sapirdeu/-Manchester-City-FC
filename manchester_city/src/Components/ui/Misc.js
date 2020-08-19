import React from 'react';
import {Link} from 'react-router-dom';

function Tag(props) {
    const template = 
        <div 
            style={{
                background: props.bck,
                fontSize: props.size,
                color: props.color,
                padding: '5px',
                display: 'inline-block',
                fontFamily: 'Righteous'
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

export {Tag, FirebaseLooper, reverseArray}