import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle } from '@mui/material';
export default function ConsecutiveSnackbars(props) {
    const {snackPack, setSnackPack, messageInfo, setMessageInfo, handleClick} = props;
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (snackPack.length && !messageInfo) {
        // Set a new snack when we don't have an active one
        setMessageInfo({ ...snackPack[0] });
        setSnackPack((prev) => prev.slice(1));
        setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
        // Close an active snack when a new one is added
        setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    return (
        <div>
        {/* <Button onClick={handleClick('Message A', "success")}>Show message A</Button>
        <Button onClick={handleClick('Message B', "success")}>Show message B</Button> */}
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionProps={{ onExited: handleExited }}
            sx={{mb:"40px", ml: "40px"}}>
                <Alert onClose={handleClose} severity={messageInfo && messageInfo.severity} sx={{ width: '100%' }}>
                    <AlertTitle sx={{fontWeight: "bold", fontSize: "1.4em"}}>Success</AlertTitle>
                    <p style={{fontSize: "1.2em"}}>{messageInfo ? messageInfo.message : ""}</p>
                </Alert>
            </Snackbar>
        {/* //     message={messageInfo ? messageInfo.message : undefined}
        //     action={
        //     <React.Fragment>
                  
        //         <Button color="secondary" size="small" onClick={handleClose}>
        //         UNDO
        //         </Button>
        //         <IconButton
        //         aria-label="close"
        //         color="inherit"
        //         sx={{ p: 0.5 }}
        //         onClick={handleClose}
        //         >
        //         <CloseIcon />
        //         </IconButton>
        //     </React.Fragment>
        //     }
        // /> */}
        </div>
    );
}