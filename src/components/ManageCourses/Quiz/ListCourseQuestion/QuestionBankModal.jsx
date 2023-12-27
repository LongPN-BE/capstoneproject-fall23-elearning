import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Radio,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
} from '@material-ui/core';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchData } from '../../../../services/AppService';
import { useCallback } from 'react';

const QuestionBankModal = ({ isOpen, onSave, onClose, data }) => {
    // State to store the selected items
    const [selectedItems, setSelectedItems] = useState([]);
    const [questions, setQuestions] = useState();
    const [lessonItem, setLessonItem] = useState()

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            if (data) {
                fetchData(`/question/byLessonId?lesson_id=${data[0]?.id}`, token).then(resp => {
                    if (resp) {
                        setQuestions(resp)
                        setLessonItem(data[0]?.id)
                    }
                })
            }
        }
    }, [data])

    const handleCheckboxChange = (item) => {
        // Check if the item is already selected
        const isItemSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);

        if (!isItemSelected) {
            // Item is not selected, add it to the selectedItems array
            setSelectedItems([...selectedItems, item]);
        } else {
            // Item is already selected, remove it from the selectedItems array
            const updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id);
            setSelectedItems(updatedSelectedItems);
        }
    };

    // Function to handle the "Hoàn thành" (Submit) button click
    const handleSave = () => {

        // Call the onSave function and pass the selectedItems if needed
        onSave(selectedItems);
        // console.log(selectedItems);
        setSelectedItems([])
        // Close the dialog
        onClose();
    };

    const handleClose = () => {
        setSelectedItems([])
        onClose()
    }

    const handleOnChangeLesson = (id) => {
        const token = Cookies.get('token');
        setLessonItem(id)
        if (token) {
            fetchData(`/question/byLessonId?lesson_id=${id}`, token).then(resp => {
                if (resp) {
                    setQuestions(resp);
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        questions &&
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Thông tin</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="lesson">Bài học</InputLabel>
                            <Select
                                id="lesson"
                                value={lessonItem}
                                label="Bài học"
                                onChange={(e) => handleOnChangeLesson(e.target.value)}
                                className='col-6 mx-2'
                            >
                                {data && data.map((s) => (
                                    <MenuItem key={s.id} value={s.id}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Nội dung câu hỏi</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions && questions.length > 0 && questions?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{++index}</TableCell>
                                        <TableCell>
                                            <div dangerouslySetInnerHTML={{ __html: item?.content }}></div>
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                color="primary"
                                                checked={selectedItems?.includes(item)}
                                                onChange={() => handleCheckboxChange(item)}
                                            />

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Hủy
                </Button>
                <Button onClick={handleSave} color="primary">
                    Hoàn thành
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default QuestionBankModal;
