import React, { useState, useEffect } from 'react'
import PlayerCard from '../home/meetPlayers/PlayerCard'
import Fade from 'react-reveal/Fade'
import Stripes from '../../Resources/images/stripes.png'
import {firebase, firebasePlayers} from '../../firebase'
import {firebaseLooper} from '../ui/Misc'
import {Promise} from 'core-js'

function TheTeam() {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);

    useEffect(()=>{
        firebasePlayers.once('value')
        .then((snapshot)=>{
            const players1 = firebaseLooper(snapshot);
            const promises = [];
            for (let key in players1){
                promises.push(
                    new Promise((resolve,reject)=>{
                        firebase.storage().ref('players')
                        .child(players1[key].image).getDownloadURL()
                        .then((url)=>{
                            players1[key].url = url;
                            resolve();
                        })
                    })
                )
            }

            Promise.all(promises).then(()=>{
                setLoading(false);
                setPlayers(players1);
            });
        })
    }, []);

    const showPlayersByCategory = (category) => (
        players ?
            players.map((player,i)=>{
                return player.position === category ?
                    <Fade left delay={i*20} key={i}>
                        <div className="item">
                            <PlayerCard
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                :null
            })
        :null
    )

    return (
        <div
            className="the_team_container"
            style={{background: `url(${Stripes}) repeat`}}
        >
            {
                !loading ?
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keepers</div>
                            <div className="team_cards">{showPlayersByCategory('Keeper')}</div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Defence</div>
                            <div className="team_cards">{showPlayersByCategory('Defence')}</div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Midfield</div>
                            <div className="team_cards">{showPlayersByCategory('Midfield')}</div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Strikers</div>
                            <div className="team_cards">{showPlayersByCategory('Striker')}</div>
                        </div>
                    </div>
                :
                    null
            } 
        </div>  
    )
}

export default TheTeam
