import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {firebasePlayers} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/Misc';


function AdminPlayers() {
    const [isLoading, setIsLoading] = useState(true);
    const [players, setMatches] = useState([]);

    useEffect(()=>{
        firebasePlayers.once('value').then((snapshot)=>{
            const players1 = firebaseLooper(snapshot);
            setIsLoading(false);
            setMatches(reverseArray(players1));
        })
    }, []);


    return (
        <div>
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First name</TableCell>
                                    <TableCell>Last name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players?.map((player, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Link to={`/admin_players/add_players/${player.id}`}>
                                                {player.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/admin_players/add_players/${player.id}`}>
                                                {player.lastname}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {player.number}
                                        </TableCell>
                                        <TableCell>
                                            {player.position}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                    <div className="admin_progress">
                        {
                            isLoading ? 
                                <CircularProgress thickness={7} style={{color: '#98c5e9'}}/>
                            : 
                                ''
                        }
                    </div>
                </div>
            </AdminLayout>
        </div>
        
    )
}

export default AdminPlayers
