import { useEffect, useState } from 'react';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    InputBase,
    Button,
    Select,
    MenuItem
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import moment from 'moment/moment';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';

export default function ListPaymenHistory() {
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const breadcrumbItems = [
        {
            url: '/',
            label: 'Trang chủ',
        },
        {
            url: `/payments`,
            label: `Danh sách lịch sử thanh toán`,
        },
    ];
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                fetchData('/payment_history/histories', token).then((resp) => {
                    if (resp) {
                        setData(resp)
                        setDataFilter(resp)
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

    // date function
    const [monthS, setMonthS] = useState([]);
    const [dayS, setDayS] = useState();
    let [monthA, setMonthA] = useState(new Date());
    let fullYearCalendar = {};

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    const handleChangeMonth = (event) => {
        setMonthA(new Date(event.target.value));
        let date = new Date(monthA.getFullYear(), 0, 1);
        let dayLength = 1000 * 60 * 60 * 24;
        let year = date.getFullYear();
        let yearLength = ((year % 4) || (!(year % 100) && (year % 400))) ? 365 : 366;
        for (let i = 0; i < yearLength; i++) {
            let month = date.toLocaleDateString('en-US', { month: 'long' });
            let weekday = date.toLocaleDateString('vi-VN', { weekday: 'short' });
            if (!fullYearCalendar[month])
                fullYearCalendar[month] = [];
            fullYearCalendar[month].push({
                date: date.getDate(),
                day: weekday
            });
            date = new Date(date.getTime() + dayLength);
        }
        setMonthS(fullYearCalendar[getMonthName(new Date(event.target.value).getMonth())]);
    };

    const handleFilterPayment = () => {
        if (!monthS) {
            setDataFilter(data);
        } else {
            if (!dayS) {
                const filteredDates = data.filter(d =>
                    new Date(moment(d.transactionDate).format("YYYY"), moment(d.transactionDate).format("MM"), 0) -
                    new Date(monthA.getFullYear(), monthA.getMonth() + 1, 0)
                    === 0);
                setDataFilter(filteredDates);
            } else {
                const filteredDates = data.filter(d =>
                    new Date(moment(d.transactionDate).format("YYYY"), moment(d.transactionDate).format("MM"), moment(d.transactionDate).format("DD")) -
                    new Date(monthA.getFullYear(), monthA.getMonth() + 1, dayS)
                    === 0);
                setDataFilter(filteredDates);
            }
        }
    }

    return (
        data && (
            <div className="m-5">
                <Paper style={{ padding: '20px' }}>
                    <CustomBreadcrumbs items={breadcrumbItems} />

                    <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                        <Typography variant="h5">Danh sách lịch sử thanh toán</Typography>
                    </div>
                    <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                        Ngày :
                        <Select style={{ marginLeft: '10px', marginRight: '20px', width: '10%' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dayS}
                            onChange={(e) => setDayS(e.target.value)}
                        >
                            <MenuItem value={""}>--</MenuItem>
                            {monthS && monthS.map((s, index) => {
                                return (
                                    <MenuItem key={index} value={s.date}>{s.date + ", " + s.day}</MenuItem>
                                )
                            })}
                        </Select>
                        Tháng :
                        <InputBase
                            type="month"
                            min="2023-01"
                            max={new Date()}
                            onChange={(e) => handleChangeMonth(e)}
                            style={{
                                borderRadius: '15px',
                                marginLeft: '10px'
                            }} />

                        <Button style={{
                            marginLeft: '10px',
                            borderRadius: '10px',
                            backgroundColor: '#DDDDDD'
                        }}
                            onClick={() => handleFilterPayment()}>
                            Tìm kiếm
                        </Button>
                    </div>

                    <Table style={{ marginTop: '20px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Thời gian <br />(Ngày/Tháng/Năm)</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Phương thức</TableCell>
                                <TableCell>Số tiền <br />(vnd)</TableCell>
                                <TableCell>Loại</TableCell>
                                <TableCell>Tài khoản thực hiện</TableCell>
                                <TableCell>Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataFilter.sort((a, b) => {
                                return new Date(b.transactionDate) - new Date(a.transactionDate)
                            }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                                return (
                                    <TableRow hover={true} key={index}>
                                        <TableCell>{index + (page * rowsPerPage, page * rowsPerPage) + 1}</TableCell>
                                        <TableCell>
                                            <Typography variant='body1' color='primary'>
                                                {moment(s.transactionDate).format('DD/MM/YYYY')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='body1' color='primary'>
                                                {moment(s.transactionDate).format('hh:mm:ss')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{s.paymentMethod}</TableCell>
                                        <TableCell> {s.paymentHistoryType === "WITHDRAW" ? (<>
                                            <Typography variant="subtitle1" color='secondary'>- {s.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography> </>) :
                                            (<> <Typography variant="subtitle1" color='primary'>+ {s.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography> </>)}</TableCell>
                                        <TableCell>
                                            {s.paymentHistoryType === "WITHDRAW" ? (<>
                                                <Typography variant="subtitle1" color='secondary'>RÚT TIỀN</Typography> </>) :
                                                (<> <Typography variant="subtitle1" color='primary'>NẠP TIỀN</Typography> </>)}
                                        </TableCell>
                                        <TableCell>{s.student === null ?
                                            (<Typography variant="body2" color='primary'>(Giáo Viên)</Typography>) :
                                            (<Typography variant="body2" color='primary'>(Học Sinh)</Typography>)}
                                            <Typography variant="body1" color='initial' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{s.account.username}</Typography> </TableCell>
                                        <TableCell>
                                            {s.paymentHistoryStatus === "CREATED" ? (<Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'green' }}>Đã Tạo</Typography>)
                                                : s.paymentHistoryStatus === "COMPLETED" ? (<Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'green' }}>Đã hoàn thành</Typography>)
                                                    : s.paymentHistoryStatus === "REFUNDED" ? (<Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'blue' }}>Hoàn trả</Typography>)
                                                        : s.paymentHistoryStatus === "PENDING" ? (<Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'red' }}>Đang xử lý</Typography>)
                                                            : s.paymentHistoryStatus === "PENDING_PAYOUT" ? (<Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'red' }}>Đang xử lý rút tiền</Typography>)
                                                                : s.paymentHistoryStatus === "COMPLETED_PAYOUT" ? (<Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'green' }}>Rút tiền thành công</Typography>)
                                                                    : s.paymentHistoryStatus === "CANCEL" ? (<Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'red' }}>Đã hủy</Typography>) : (<></>)}
                                        </TableCell>
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
                        count={dataFilter.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        labelRowsPerPage="Số hàng trên trang :"
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div >
        )
    );
}
