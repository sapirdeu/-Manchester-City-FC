import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {firebaseMatches} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/Misc';

function AdminMatches() {
    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);

    useEffect(()=>{
        firebaseMatches.once('value').then((snapshot)=>{
            const matches1 = firebaseLooper(snapshot);
            setIsLoading(false);
            setMatches(reverseArray(matches1));
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
                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matches?.map((match, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            {match.date}
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/admin_matches/edit_match/${match.id}`}>
                                                {match.away} <strong>-</strong> {match.local}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {match.resultAway} <strong>-</strong> {match.resultLocal}
                                        </TableCell>
                                        <TableCell>
                                            {match.final === 'Yes' ?
                                                <span className="matches_tag_red">Final</span>
                                                :
                                                <span className="matches_tag_green">Not played yet</span>
                                            }
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

export default AdminMatches
