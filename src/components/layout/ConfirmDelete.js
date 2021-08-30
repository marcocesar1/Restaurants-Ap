import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

export default function ConfirmDelete({ open, setConfirmDelete, handleDelete }) {

    const handleAgree = () => {
        handleDelete();
    }

    const handleDisagree = () => {
        setConfirmDelete(prevState => ({
                ...prevState,
                openModal: false
            })
        );
    }

  return (
        <Dialog
            open={open}
            onClose={handleDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Delete item?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDisagree} variant="contained">
                        Disagree
                </Button>
                <Button onClick={handleAgree} variant="contained" color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
  );
}