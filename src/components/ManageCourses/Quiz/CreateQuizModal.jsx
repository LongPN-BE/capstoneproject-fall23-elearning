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
import { isInRange, isInRangePercent, isInteger, validateInputDigits, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';

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
        dateRange: 0,
        allowAttempt: 0,
        proportion: 0
      })
    } else {
      setFormData(data)
    }
  }, [data])

  const handleClose = () => {
    onClose();
  };


  const handleSave = () => {
    const validString = validateInputString(formData.title)
    const validDigit = validateInputDigits(formData.passScore, formData.duration, formData.allowAttempt, formData.proportion, formData.dateRange)
    let message = []
    if (!validString || !validDigit) {
      message.push("Điền tất cả các trường và số phải lớn hơn 0")
    }

    if (!isInRangePercent(formData.proportion)) {
      message.push("Tỷ trọng trong khoảng 1...100")
    }
    if (message.length > 0) {
      // onClose();
      Swal.fire({
        title: "Cảnh báo",
        html: message.join('<br>'),
        icon: "warning"
      });
      return;
    }

    onSave(formData)
  }
  return (
    formData && <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Bài kiểm tra</DialogTitle>
      <DialogContent>
        <DialogContentText>Điền đầy đủ thông tin phía dưới</DialogContentText>
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
          label="Điểm qua bài kiểm tra ( 0 - 10 )"
          type="number"
          fullWidth
          name="passScore"
          value={formData.passScore}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
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
        <TextField
          margin="dense"
          label="Thời hạn hoàn thành bài kiểm tra (tuần)"
          type="number"
          fullWidth
          name="dateRange"
          value={formData.dateRange}
          onChange={handleChange}
        />
        {/* <label className='my-2'>Thời hạn hoàn thành bài kiểm tra (tuần)</label><br />
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleDateRangeChange}
                /> */}
        <TextField
          margin="dense"
          label="Thời gian làm bài ( phút ) "
          type="number"
          fullWidth
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          label="Số lần làm bài"
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
        <button onClick={onClose} className='btn btn-outline-secondary'>
          Hủy
        </button>
        <button onClick={handleSave} className='btn btn-success'>
          Lưu
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateQuizModal;
