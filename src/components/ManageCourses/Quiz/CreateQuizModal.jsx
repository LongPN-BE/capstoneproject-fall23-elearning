import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Cookies from 'js-cookie';
import { Calendar, DateRangePicker } from 'react-date-range';
import moment from 'moment';
import { useEffect } from 'react';

function CreateQuizModal({ open, onClose, data, onSave }) {
    const [formData, setFormData] = useState({ ...data });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (!data) {
            setFormData({
                title: "",
                passScore: 0,
                status: 'Deactive',
                duration: 0,
                dateRange: "",
                allowAttempt: 0,
                proportion: 0
            })
        }
    }, [])

    const handleClose = () => {
        setSelectionRange(null)
        onClose();
    };

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleDateRangeChange = (ranges) => {
        setSelectionRange(ranges.selection);
    };

    const handleSave = () => {
        console.log(selectionRange);
        const formattedStartDate = moment(selectionRange.startDate).format('YYYY-MM-DD HH:mm:ss');
        const formattedEndDate = moment(selectionRange.endDate).format('YYYY-MM-DD HH:mm:ss');
        const body = {
            ...formData,
            dateRange: formattedStartDate + "---" + formattedEndDate
        }
        onSave(body)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Modal</DialogTitle>
            <DialogContent>
                <DialogContentText>Please edit the form fields below:</DialogContentText>
                <TextField
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Pass Score"
                    type="number"
                    fullWidth
                    name="passScore"
                    value={formData.passScore}
                    onChange={handleChange}
                />
                <Select
                    label="Status"
                    fullWidth
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Deactive">Deactive</MenuItem>
                </Select>
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleDateRangeChange}
                />
                <TextField
                    margin="dense"
                    label="Duration"
                    type="number"
                    fullWidth
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    label="Allow Attempt"
                    type="number"
                    fullWidth
                    name="allowAttempt"
                    value={formData.allowAttempt}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Proportion"
                    type="number"
                    fullWidth
                    name="proportion"
                    value={formData.proportion}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateQuizModal;
