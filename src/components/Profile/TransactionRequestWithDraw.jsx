import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useState } from 'react'
import { postData } from '../../services/AppService';

const TransactionRequestWithDraw = ({ items }) => {
    const userTmp = JSON.parse(Cookies.get('user'));
    // State to keep track of the current page and the number of rows per page
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

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


    // Change page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Change the number of rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderStatus = (status) => {
        if (status === 'COMPLETED') {
            return 'Thành công'
        }
        if (status === 'PENDING') {
            return 'Đang chờ'
        }
        if (status === 'CANCEL') {
            return 'Hủy'
        }
    }

    const handleRequestWithDraw = () => {
        setIsOpen(true)
    }

    const handleSave = async () => {
        //todo call api
        const token = Cookies.get('token');
        const transactions = selectedItems.map(s => { return s.id })
        if (token && transactions.length > 0) {
            const body = {
                teacherId: userTmp.teacherId,
                transactions: transactions
            }
            await postData(`/withdraw-request/withdraw-trasaction`, body, token).then(resp => {
                if (resp) {
                    window.location.reload()
                }
            })
        }
        setIsOpen(false)
    }

    return (
        items && (
            <div style={{ margin: '5px' }}>

                <Paper style={{ padding: '20px' }}>
                    {/* <Typography variant="body1" style={{ color: 'darkblue' }}>
                            <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link>
                            {'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}>Khung chương trình {syllabusId} </Link>{'>'} Bài học {lessonId} {'>'} Danh sách bài kiểm tra
                        </Typography> */}
                    <Typography variant="h6">Danh sách được rút tiền</Typography>
                    <button className='btn btn-outline-primary' onClick={handleRequestWithDraw}>Yêu cầu rút tiền</button>
                    <Table style={{ marginTop: '20px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tài khoản</TableCell>
                                <TableCell>Ngày thực hiện</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                {/* <TableCell></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items && items.length > 0 && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                                return (
                                    <>
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{s.accountName}</TableCell>
                                            <TableCell>{moment(s.dateProcess).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell>{s.description}</TableCell>
                                            <TableCell>{renderStatus(s.transactionStatus)}</TableCell>
                                        </TableRow>
                                        {/* {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )} */}
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="md">
                        <DialogTitle>Chọn giao dịch để rút tiền</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>

                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>STT</TableCell>
                                                <TableCell>Tài khoản</TableCell>
                                                <TableCell>Mô tả</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items && items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{++index}</TableCell>
                                                    <TableCell>
                                                        {item.accountName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.description}
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
                            <Button onClick={() => setIsOpen(false)} color="secondary">
                                Hủy
                            </Button>
                            <Button onClick={handleSave} color="primary">
                                Hoàn thành
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <TablePagination
                        labelRowsPerPage="Số hàng trên trang :"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={items?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

        )
    )
}

export default TransactionRequestWithDraw
