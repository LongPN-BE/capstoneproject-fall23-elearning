import React, { useEffect, useState } from 'react';
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
    Select,
    MenuItem,
    TextField,
    Container,
    TablePagination,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';


const ListFeedback = () => {
    const [data, setData] = useState([]);
    const breadcrumbItems = [
        {
            url: '/dashboard',
            label: 'Trang chủ',
        },
        {
            url: '/report-accounts',
            label: 'Báo cáo tài khoản',
        },

    ];

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchData(`/report/by-teacher?teacher_id=1`, token)
                .then((resp) => {
                    if (resp) {
                        setData(resp.responseObject);
                        console.log(resp.responseObject);
                    }
                })
                .catch((err) => console.log(err));
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
                    <CustomBreadcrumbs items={breadcrumbItems} />
                    <Container>
                        <Paper style={{ padding: '20px' }}>

                            <div style={{ marginTop: '20px' }} className="d-flex align-items-center">
                                <Typography variant="h6">Danh sách báo cáo</Typography>
                                {/* <InputBase
                                    placeholder="Search"
                                    style={{ marginLeft: '20px' }}
                                    startAdornment={<Search />}
                                // onChange={handleSearchChange}
                                /> */}
                            </div>

                            <Table style={{ marginTop: '20px' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Người gửi</TableCell>
                                        <TableCell>Ngày gửi</TableCell>
                                        <TableCell>Nội dung</TableCell>
                                        {/* <TableCell>Ngày Tạo</TableCell> */}
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((a, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>Người gửi</TableCell>
                                                <TableCell>{a.createTime}</TableCell>
                                                <TableCell>{a.content}</TableCell>

                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} >Không có dữ liệu</TableCell>
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
                                labelRowsPerPage="Số hàng trên trang :"
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Container>
                </div>

            </div>
        )
    );
};

export default ListFeedback;
