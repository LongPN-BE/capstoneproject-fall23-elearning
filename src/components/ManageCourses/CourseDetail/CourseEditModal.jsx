import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import { validateInputDigits, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';

export default function CourseEditModal({ open, onClose, onSave, course }) {
    const [newPrice, setNewPrice] = useState(course?.price);
    const [newDescription, setNewDescription] = useState(course?.description);

    const handleSave = () => {
        if (validateInputString(newDescription) && validateInputDigits(newPrice)) {
            onSave(newPrice, newDescription);
            onClose();
        }
        else {
            onClose();
            Swal.fire({
                title: "Warning",
                text: invalidInput,
                icon: "warning"
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Chỉnh sửa khóa học</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Giá mới"
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Mô tả mới"
                    multiline
                    rows={4}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy bỏ
                </Button>
                <Button onClick={handleSave} color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}
