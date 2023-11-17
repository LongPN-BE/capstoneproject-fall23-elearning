import { useEffect, useState } from 'react';
import {
    Button,
    Typography,
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    TablePagination,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';


export default function ListPaymenHistory() {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                fetchData('/payment_history/histories', token).then((resp) => {
                    if (resp) {
                        setData(resp);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }, []);



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Change page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Change the number of rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        data && (
            <div className="m-5">
                <div style={{ margin: '20px' }}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="body1">Trang chủ {'>'} Quản lý lịch sử thanh toán</Typography>

                        <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                            <Typography variant="subtitle1">Danh sách lịch sử thanh toán</Typography>

                            {/* <InputBase
                placeholder="Search name"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              /> */}
                        </div>

                        <Table style={{ marginTop: '20px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Ngày</TableCell>
                                    <TableCell>Phương thức</TableCell>
                                    <TableCell>Số tiền</TableCell>
                                    <TableCell>Mục đích</TableCell>
                                    <TableCell>Tài khoản thực hiện</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                                    return (
                                        <TableRow hover={true} key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{moment(s.transactionDate).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{s.paymentMethod}</TableCell>
                                            <TableCell>{s.amount}</TableCell>
                                            <TableCell>{s.paymentHistoryType}</TableCell>
                                            <TableCell>{s.account.id}</TableCell>
                                            <TableCell>{s.paymentHistoryStatus}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    'aria-label': 'rows per pageaa',
                                },
                                actions: {
                                    showFirstButton: true,
                                    showLastButton: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        )
    );
}
