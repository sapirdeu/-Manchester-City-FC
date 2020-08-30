import React, { useState, useEffect } from 'react'
import { easePolyInOut } from 'd3-ease'
import NodeGroup from 'react-move/NodeGroup'

function MatchesList(props) {
    const [matcheslist, setMatchesList] = useState([])

    useEffect(()=>{
        setMatchesList(props.matches)
    }, [props.matches]);

    const showMatches = () => (
        matcheslist ?
            <NodeGroup
                data={matcheslist}
                keyAccessor={(d) => d.id}

                start={() => ({
                    opacity: 0,
                    x: -200,
                })}

                enter={(d,i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: i*50, ease: easePolyInOut },
                })}

                update={(d, i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: i*50, ease: easePolyInOut },
                })}

                leave={(d, i) => ({
                    opacity: [0],
                    x: [-200],
                    timing: { duration: 500, delay: i*50, ease: easePolyInOut },
                })}
            >
                {(nodes) => (
                    <div>
                        {nodes.map(({ key, data, state: { x, opacity } }) => (
                            <div key={key} className="match_box_big" style={{opacity, transform:`translate(${x}px)`}}>
                                <div className="block_wraper">
                                    <div className="block">
                                        <div className="icon" style={{background: `url(/images/team_icons/${data.localThmb}.png)`}}></div>
                                        <div className="team">{data.local}</div>
                                        <div className="result">{data.resultLocal}</div>
                                        
                                    </div>

                                    <div className="block">
                                        <div className="icon" style={{background: `url(/images/team_icons/${data.awayThmb}.png)`}}></div>
                                        <div className="team">{data.away}</div>
                                        <div className="result">{data.resultAway}</div>
                                        
                                    </div>
                                </div>

                                <div className="block_wraper nfo">
                                    <div><strong>Data:</strong> {data.date}</div>
                                    <div><strong>Stadium:</strong> {data.stadium}</div>
                                    <div><strong>Referee:</strong> {data.referee}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </NodeGroup>
            
        :
            null
    )

    return (
        <div>
            {showMatches()}
        </div>
    )
}

export default MatchesList
