import React from 'react'
import Featured from './featured/Featured'
import MatchesHome from './matches/MatchesHome'
import MeetPlayers from './meetPlayers/MeetPlayers'
import Promotion from './promotion/Promotion'
import AdminLayout from '../../Hoc/AdminLayout'

function Home(props) {
    if (props.user === null){
        return (
            <div className="bck_blue">
                <Featured/>
                <MatchesHome/>
                <MeetPlayers/>
                <Promotion/>
            </div>
        )
    } else {
        return (
            <AdminLayout>
                <div className="bck_blue_loggedin">
                        <Featured/>
                        <MatchesHome/>
                        <MeetPlayers/>
                        <Promotion/>
                </div>
            </AdminLayout>
        )
    }
    
}

export default Home
