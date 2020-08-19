import React, {useState, useEffect} from 'react';
import {firebaseMatches} from '../../../firebase';
import { FirebaseLooper, reverseArray } from '../../ui/Misc';
import MatchesBlock from '../../ui/MatchesBlock';
import Slide from 'react-reveal/Slide';

function Blocks() {
    const [matches, setMatches] = useState([]);

    useEffect(()=>{
        firebaseMatches.limitToLast(6).once('value').then((snapshot)=>{
            const matches1 = FirebaseLooper(snapshot);
            setMatches(reverseArray(matches1));
        })
    }, []);


    const showMathes = (matches) => (
        matches?
        matches.map((match)=>(
                <Slide bottom key={match.id}>
                    <div className="item">
                        <div className="wrapper">
                            <MatchesBlock match={match}/>
                        </div>
                    </div>
                </Slide>
            ))
        : null
    )

    return (
        <div className="home_matches">
            {showMathes(matches)}
        </div>
    )
}

export default Blocks
