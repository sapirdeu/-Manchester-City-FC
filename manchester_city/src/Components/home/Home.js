import React from 'react'
import Featured from './featured/Featured'
import MatchesHome from './matches/MatchesHome'

function Home() {
    return (
        <div className="bck_blue">
            <Featured/>
            <MatchesHome/>
        </div>
    )
}

export default Home
