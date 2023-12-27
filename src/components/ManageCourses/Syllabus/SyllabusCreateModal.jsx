import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import { validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';

export default function SyllabusCreateModal({ open, onClose, onCreate, isCopied, onCopy }) {
    const [syllabusName, setSyllabusName] = useState('');

    const handleCreate = () => {
        if (validateInputString(syllabusName)) {
            onCreate(syllabusName);
            onClose();
        }
        else {
            Swal.fire({
                title: "Cảnh báo",
                text: 'Vui lòng điền đầy đủ thông tin',
                icon: "warning"
            });
        }

    };

    const handleCopy = () => {
        if (validateInputString(syllabusName)) {
            onCopy(syllabusName)
            onClose();
        }
        else {
            Swal.fire({
                title: "Cảnh báo",
                text: 'Vui lòng điền đầy đủ thông tin',
                icon: "warning"
            });
        }

    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{isCopied ? 'Tên khung chương trình sao chép' : 'Tạo mới khung chương trình'}</DialogTitle>
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
                <button onClick={onClose} className='btn btn-outline-secondary'>
                    Hủy bỏ
                </button>
                <button onClick={isCopied ? handleCopy : handleCreate} className='btn btn-success'>
                    Tạo
                </button>
            </DialogActions>
        </Dialog>
    );
}
