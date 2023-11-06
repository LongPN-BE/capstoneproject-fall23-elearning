import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';

export default function SyllabusCreateModal({ open, onClose, onCreate, isCopied, onCopy }) {
    const [syllabusName, setSyllabusName] = useState('');

    const handleCreate = () => {
        onCreate(syllabusName);
        onClose();
    };

    const handleCopy = () => {
        onCopy(syllabusName)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{isCopied ? 'Tên khung chương trình copy' : 'Tạo mới khung chương trình'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tên khung chương trình"
                    value={syllabusName}
                    onChange={(e) => setSyllabusName(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy bỏ
                </Button>
                <Button onClick={isCopied ? handleCopy : handleCreate} color="primary">
                    Tạo mới
                </Button>
            </DialogActions>
        </Dialog>
    );
}
