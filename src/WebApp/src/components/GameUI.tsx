import { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useScoreboard } from '../providers/ScoreboardProvider';
import { Scoreboard, useAPI } from '../providers/APIProvider';
import { useIndicator } from '../providers/IndicatorProvider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            paddingTop: theme.spacing(3),
            margin: 0
        },
        textField: {
            margin: theme.spacing(3),
            width: '30rem'
        },
        wrapper: {
            marginBottom: theme.spacing(10)
        }
    })
);

const validationSchema = yup.object({
    playerName: yup
      .string()
      .required('Player Name is required')
      .min(3, 'Player Name should be at least 3 characters long')
  });

const GameUI = () => {
    const classes = useStyles();
    const scoreboardContext = useScoreboard();
    const apiContext = useAPI();
    const indicatorContext = useIndicator(); 

    const [isStarted, setIsStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [topScore, setTopScore] = useState<Scoreboard | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setTopScore((prevScore) => scoreboardContext.topScore);
    }, [scoreboardContext.topScore]);

    const formik = useFormik({
        initialValues: {
          playerName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            var newScore = Math.ceil(Math.random() * 1000) * (Math.round(Math.random()) ? 1 : -1);
            setScore(prevScore => newScore);
            setIsStarted(true);
            if (!topScore || newScore > topScore.score) {
                indicatorContext.setSnackBar({
                    show: true, 
                    text: `Congratulations! You beat the high score! Your score is: ${newScore}! Saving to the Hall of Fame!`, 
                    severity: 'success'
                });
                var score = {
                    scoreId: 0,
                    playerName: values.playerName,
                    score: newScore
                }
                apiContext.addNewScore(score).then(() => {
                    apiContext.getScoreBoard().then((data) => {
                        scoreboardContext.setScoreboard(data);
                    });
                });
            } else {
                indicatorContext.setSnackBar({
                    show: true, 
                    text: `Not good enough! Your score is: ${newScore}! Try again!`, 
                    severity: 'info'
                });
            }
        },
    });

    const onDeleteDialogOk = () => {
        apiContext.deleteAll().then(() => {
            indicatorContext.setSnackBar({
                show: true, 
                text: 'All records have been deleted. You can win now!', 
                severity: 'info'
            });
            setOpenDialog(false);
            setIsStarted(false);
            apiContext.getScoreBoard().then((data) => {
                scoreboardContext.setScoreboard(data);
            });
        });
    }

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>Game Time!!</h1>
            <h2>Current Top Score: {topScore ? topScore.score : 'Nothing to see here! YET!'}</h2>
            <h3>{isStarted ? `Your score is: ${score}` : `Enter your player name and click the 'button of ultimate fun' to start!`}</h3>
            <form className={classes.wrapper} onSubmit={formik.handleSubmit}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <TextField
                            id="playerNameTF"
                            name="playerName"
                            label="Player Name"
                            variant="outlined"
                            autoFocus
                            className={classes.textField}
                            value={formik.values.playerName}
                            onChange={formik.handleChange}
                            error={formik.touched.playerName && Boolean(formik.errors.playerName)}
                            helperText={formik.touched.playerName && formik.errors.playerName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit">
                            Let the fun begin!
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Button color="secondary" variant="contained" onClick={() => { setOpenDialog(true) }}>
                        Erase all!
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                open={openDialog}
                onClose={() => { setOpenDialog(false); }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"No turning back after this!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete all records? It will make the game much more easier. Go ahead if that is what you want!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => { setOpenDialog(false); }} color="primary">
                    Cancel
                </Button>
                <Button onClick={onDeleteDialogOk} color="secondary" autoFocus>
                    Yes! Do it!
                </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}


export default GameUI;