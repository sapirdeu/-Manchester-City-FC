import React, { useState } from 'react';
import Strips from '../../../Resources/images/stripes.png';
import {Tag} from '../../ui/Misc'
import Reveal from 'react-reveal/Reveal'
import HomeCards from './HomeCards';

function MeetPlayers() {
    const [show, setShow]=useState(false);

    return (
        <Reveal
            fraction={0.7}
            onReveal={()=>{
                setShow(true);
            }}
        >
            <div
                className="home_meetplayers"
                style={{background: `#ffffff url(${Strips})`}}
            >
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            <HomeCards show={show}></HomeCards>
                        </div>
                        <div className="home_text_wrapper">
                            <Tag
                                bck="#0e1731"
                                size="100px"
                                color="#ffffff"
                                add= {{
                                    display: 'inline-block',
                                    marginBottom: '20px'
                                }}
                            >
                                Meet
                            </Tag>
        
                            <Tag
                                bck="#0e1731"
                                size="100px"
                                color="#ffffff"
                                add= {{
                                    display: 'inline-block',
                                    marginBottom: '20px'
                                }}
                            >
                                The
                            </Tag>

                            <Tag
                                bck="#0e1731"
                                size="100px"
                                color="#ffffff"
                                add= {{
                                    display: 'inline-block',
                                    marginBottom: '20px'
                                }}
                            >
                                Players
                            </Tag>

                            <Tag
                                bck="#ffffff"
                                size="27px"
                                color="#0e1731"
                                link={true}
                                linkTo="/the_team"
                                add= {{
                                    display: 'inline-block',
                                    marginBottom: '27px',
                                    border: '1px solid #0e1731'
                                }}
                            >
                                Meet them here
                            </Tag>                   
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    )
}

export default MeetPlayers
