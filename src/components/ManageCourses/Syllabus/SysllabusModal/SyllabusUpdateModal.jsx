import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import { useEffect } from 'react';

export default function SyllabusUpdateModal({ open, onClose, onUpdate, syllabus }) {
    const [syllabusStatus, setSyllabusStatus] = useState('');
    const [syllabusId, setSyllabusId] = useState(0);
    // console.log(syllabusStatus);

    useEffect(() => {
        setSyllabusStatus(syllabus.status);
        setSyllabusId(syllabus.id);
    }, [syllabus.id]);

    const handleUpdate = () => {
        onUpdate(syllabusId, syllabusStatus);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Tạo mới khung chương trình</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="syllabus-status-label">Trạng thái</InputLabel>
                    <Select
                        labelId="syllabus-status-label"
                        id="syllabus-status"
                        value={syllabusStatus}
                        onChange={(e) => setSyllabusStatus(e.target.value)}
                    >
                        {/* <MenuItem value="New">Mới</MenuItem> */}
                        <MenuItem value="Active">Hoạt động</MenuItem>
                        <MenuItem value="Deactive">Ngưng hoạt động</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy bỏ
                </Button>
                <Button onClick={handleUpdate} color="primary">
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
}
