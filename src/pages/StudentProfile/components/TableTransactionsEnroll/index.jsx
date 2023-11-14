import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, TextField, Typography } from '@mui/material';
import { TransactionControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';

const headCells = [
  {
    id: 'index',
    numeric: true,
    disablePadding: false,
    label: 'STT',
  },
  {
    id: 'accountName',
    numeric: false,
    disablePadding: false,
    label: 'Tài khoản',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Số tiền',
  },
  {
    id: 'transactionType',
    numeric: false,
    disablePadding: false,
    label: 'Loại giao dịch',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Nội dung giao dịch',
  },
  {
    id: 'transactionStatus',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'dateProcess',
    numeric: false,
    disablePadding: false,
    label: 'Ngày giao dịch',
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={'center'} padding={'none'} height={48}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TableTransactionsEnroll({ transactions }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <div className="d-flex  justify-content-between align-items-center mx-4 py-3">
          <Typography variant="h6">Lịch sử giao dịch</Typography>
          <div>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 200,
              }}
            >
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        <hr className="mt-0" />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            {transactions && transactions.length > 0 ? (
              <TableBody>
                {transactions?.map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.name} sx={{ cursor: 'pointer' }}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row?.accountName}</TableCell>
                      <TableCell align="center">{row?.amount.toLocaleString()} VNĐ</TableCell>
                      <TableCell align="center">{row?.transactionType}</TableCell>
                      <TableCell align="center">{row?.description}</TableCell>
                      <TableCell align="center">{row?.transactionStatus}</TableCell>
                      <TableCell align="center">{moment(row?.dateProcess).format('HH:MM:SS DD/MM/YYYY')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <tr>
                <td colspan="4">
                  <div
                    className="d-flex  justify-content-center align-items-center"
                    style={{
                      width: '100%',
                      height: '320px',
                      fontWeight: 600,
                      color: '#384256',
                    }}
                  >
                    TRANSACTIONS TABLE
                  </div>
                </td>
              </tr>
            )}
          </Table>
        </TableContainer>
        {/* {rows && rows.length > 0 ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )} */}
      </Paper>
    </Box>
  );
}
