import React, { useEffect } from 'react';

import { useAPI } from '../providers/APIProvider';
import { useScoreboard } from '../providers/ScoreboardProvider';

import Score from './Score';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            maxWidth: 650,
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)',
            marginRight: '-50%',
            marginTop: '2rem'
        },
        tableWrapper: {
            position: 'relative',
            height: '100vh',
            width: '100%'
        }
    }),
);

const Scoreboard = () => {
    const classes = useStyles();
    const scoreboardContext = useScoreboard();
    const apiContext = useAPI();
    useEffect(() => {
        apiContext.getScoreBoard().then((data) => {
            if (data) scoreboardContext.setScoreboard(data);
        });
    }, []);


    return (
        <div>
            <h1>Hall of Fame</h1>
            {scoreboardContext.scoreboard.length ? (
                <div className={classes.tableWrapper}>
                    <TableContainer component={Paper} className={classes.table}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Player Name</TableCell>
                                    <TableCell>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    scoreboardContext.scoreboard.map((score) => (<Score key={score.scoreId} playerName={score.playerName} score={score.score}/>))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) 
            : 'No high score yet :/ You should play! It is really fun. It is not boring at all! I promise :)'}
        </div>
    )
}

export default Scoreboard
