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
        setSelectionRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        })
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
            <DialogTitle>Bài kiểm tra</DialogTitle>
            <DialogContent>
                <DialogContentText>Điền đày đủ thông tin phía dưới</DialogContentText>
                <TextField
                    margin="dense"
                    label="Tên bài kiểm tra"
                    type="text"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Điểm qua môn"
                    type="number"
                    fullWidth
                    name="passScore"
                    value={formData.passScore}
                    onChange={handleChange}
                />
                <Select
                    label="Trạng thái"
                    fullWidth
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    {/* <MenuItem value="Active">Active</MenuItem> */}
                    <MenuItem value="Deactive">Deactive</MenuItem>
                </Select>
                <label className='my-2'>Ngày bắt đầu và kết thúc bài học</label><br />
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleDateRangeChange}
                />
                <TextField
                    margin="dense"
                    label="Thời gian học"
                    type="number"
                    fullWidth
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    label="Số lần thi lại cho phép"
                    type="number"
                    fullWidth
                    name="allowAttempt"
                    value={formData.allowAttempt}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Tỉ trọng %"
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
