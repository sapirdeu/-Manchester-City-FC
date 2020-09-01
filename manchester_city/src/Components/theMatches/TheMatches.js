import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {firebaseMatches} from '../../firebase'
import {firebaseLooper, reverseArray} from '../ui/Misc'
import LeagueTable from './LeagueTable';
import MatchesList from './MatchesList';
import AdminLayout from '../../Hoc/AdminLayout';

function TheMatches(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [filterMatches, setFilterMatches] = useState([]);
    const [playedFilter, setPlayedFilter] = useState('All');
    const [resultFilter, setResultFilter] = useState('All');

    useEffect(()=>{
        firebaseMatches.once('value')
        .then((snapshot)=>{
            const matches1 = firebaseLooper(snapshot);
            setIsLoading(false);
            setMatches(reverseArray(matches1));
            setFilterMatches(reverseArray(matches1));
        })
    }, []);

    const showPlayed = (played) => {
        const list = matches.filter((match)=>{
            return match.final === played
        });

        setFilterMatches(played === 'All' ? matches : list);
        setPlayedFilter(played);
        setResultFilter('All');
    }

    const showResult = (result) => {
        const list = matches.filter((match)=>{
            return match.result === result
        });

        setFilterMatches(result === 'All' ? matches : list);
        setPlayedFilter('All');
        setResultFilter(result);
    }

    if (props.user === null){
        return (
        
            <div className="the_matches_container">
                {
                    isLoading ? 
                        <CircularProgress thickness={7} style={{color: '#98c5e9'}}/>
                    :    
                        <div className="the_matches_wrapper">
                            <div className="left">
                                <div className="match_filters">
                                    <div className="match_filters_box">
                                        <div className="tag">Show Match</div>
                                        
                                        <div className="cont">
                                            <div 
                                                className={`option ${playedFilter === 'All' ? 'active' : ''}`}
                                                onClick={()=>showPlayed('All')}
                                            >
                                                All
                                            </div>
                                            <div 
                                                className={`option  ${playedFilter === 'Yes' ? 'active' : ''}`}
                                                onClick={()=>showPlayed('Yes')}
                                            >
                                                Played
                                            </div>
                                            <div 
                                                className={`option  ${playedFilter === 'No' ? 'active' : ''}`}
                                                onClick={()=>showPlayed('No')}
                                            >
                                                Not Played
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="match_filters_box">
                                        <div className="tag">Result Game</div>
                                        
                                        <div className="cont">
                                            <div 
                                                className={`option ${resultFilter === 'All' ? 'active' : ''}`}
                                                onClick={()=>showResult('All')}
                                            >
                                                All
                                            </div>
                                            <div 
                                                className={`option  ${resultFilter === 'W' ? 'active' : ''}`}
                                                onClick={()=>showResult('W')}
                                            >
                                                W
                                            </div>
                                            <div 
                                                className={`option  ${resultFilter === 'L' ? 'active' : ''}`}
                                                onClick={()=>showResult('L')}
                                            >
                                                L
                                            </div>
    
                                            <div 
                                                className={`option  ${resultFilter === 'D' ? 'active' : ''}`}
                                                onClick={()=>showResult('D')}
                                            >
                                                D
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <MatchesList matches={filterMatches}/>
                            </div>
    
                            <div className="right">
                                <LeagueTable/>
                            </div>
                        </div>
                }
            </div>
        )
    } else {
        return (
            <AdminLayout>
            <div className="the_matches_container_loggedin">
                {
                    isLoading ? 
                        <CircularProgress thickness={7} style={{color: '#98c5e9'}}/>
                    :    
                        <div className="the_matches_wrapper">
                            <div className="left">
                                <div className="match_filters">
                                    <div className="match_filters_box">
                                        <div className="tag">Show Match</div>
                                        
                                        <div className="cont">
                                            <div 
                                                className={`option ${playedFilter === 'All' ? 'active' : ''}`}
                                                onClick={()=>showPlayed('All')}
                                            >
                                                All
                                            </div>
                                            <div 
                                                className={`option  ${playedFilter === 'Yes' ? 'active' : ''}`}
                                                onClick={()=>showPlayed('Yes')}
                                            >
                                                Played
                                            </div>
                                            <div 
                                                className={`option  ${playedFilter === 'No' ? 'active' : ''}`}
                                                onClick={()=>showPlayed('No')}
                                            >
                                                Not Played
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="match_filters_box">
                                        <div className="tag">Result Game</div>
                                        
                                        <div className="cont">
                                            <div 
                                                className={`option ${resultFilter === 'All' ? 'active' : ''}`}
                                                onClick={()=>showResult('All')}
                                            >
                                                All
                                            </div>
                                            <div 
                                                className={`option  ${resultFilter === 'W' ? 'active' : ''}`}
                                                onClick={()=>showResult('W')}
                                            >
                                                W
                                            </div>
                                            <div 
                                                className={`option  ${resultFilter === 'L' ? 'active' : ''}`}
                                                onClick={()=>showResult('L')}
                                            >
                                                L
                                            </div>
    
                                            <div 
                                                className={`option  ${resultFilter === 'D' ? 'active' : ''}`}
                                                onClick={()=>showResult('D')}
                                            >
                                                D
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <MatchesList matches={filterMatches}/>
                            </div>
    
                            <div className="right">
                                <LeagueTable/>
                            </div>
                        </div>
                }
            </div>
            </AdminLayout>
        )
    }
    
}

export default TheMatches
