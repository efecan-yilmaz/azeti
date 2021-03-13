import { useIndicator } from '../providers/IndicatorProvider';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBar = () => {
    const indicatorContext = useIndicator();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        indicatorContext.setSnackBar(prevState => ({...prevState, show: false}));
      };

    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }} open={indicatorContext.snackBar.show} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" severity={indicatorContext.snackBar.severity} onClose={handleClose}>
                    {indicatorContext.snackBar.text}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default SnackBar
