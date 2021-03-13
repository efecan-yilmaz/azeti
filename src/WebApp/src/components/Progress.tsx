import { useIndicator } from '../providers/IndicatorProvider';

import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            position: 'fixed',
            top: '50%',
            left: '50%'
        }
    }),
);

const Progress = () => {
    const indicatorContext = useIndicator();
    const classes = useStyles();

    return (
        <Modal open={indicatorContext.showProgress}>
            <div tabIndex={1}>
                <CircularProgress className={classes.progress} color="primary" tabIndex={-1}/>
            </div>
        </Modal>
    )
}

export default Progress;
