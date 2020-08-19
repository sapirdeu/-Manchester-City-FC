import React from 'react';
import {Link} from 'react-router-dom';
import mcity_logo from '../../Resources/images/logos/manchester_city_logo.png'

function CityLogo(props) {
    const template = 
        <div 
            className="img_cover"
            style={{
                width: props.width,
                height: props.height,
                background: `url(${mcity_logo}) no-repeat`
            }}
        >
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

export default CityLogo;
