import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment/moment";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, TextField, Typography } from "@mui/material";

function createData(transactionId, courseName, price, transactionDate) {
  return {
    transactionId,
    courseName,
    price,
    transactionDate,
  };
}

const rows = [
  createData(
    "Transaction 1",
    "Khóa học 1",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 2",
    "Khóa học 2",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 3",
    "Khóa học 3",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 4",
    "Khóa học 4",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 5",
    "Khóa học 5",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 6",
    "Khóa học 6",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 7",
    "Khóa học 7",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 8",
    "Khóa học 8",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 9",
    "Khóa học 9",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 10",
    "Khóa học 10",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 11",
    "Khóa học 11",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 12",
    "Khóa học 12",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
  createData(
    "Transaction 13",
    "Khóa học 13",
    88888,
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  ),
];

const headCells = [
  {
    id: "index",
    numeric: true,
    disablePadding: false,
    label: "STT",
  },
  {
    id: "transactionId",
    numeric: false,
    disablePadding: false,
    label: "Mã giao dịch",
  },
  {
    id: "courseName",
    numeric: false,
    disablePadding: false,
    label: "Tên khóa học",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Giá",
  },
  {
    id: "transactionDate",
    numeric: false,
    disablePadding: false,
    label: "Ngày giao dịch",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"none"}
            height={48}
          >
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TableTransactions() {
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <div className="d-flex  justify-content-between align-items-center mx-4 py-3">
          <Typography variant="h6">History Transaction</Typography>
          <div>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 200,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        <hr className="mt-0" />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            {rows && rows.length > 0 ? (
              <TableBody>
                {rows?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="center">
                        {(page + 1) * (index + 1)}
                      </TableCell>
                      <TableCell align="center">{row.transactionId}</TableCell>
                      <TableCell align="center">{row.courseName}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">
                        {row.transactionDate}
                      </TableCell>
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
                      width: "100%",
                      height: "320px",
                      fontWeight: 600,
                      color: "#384256",
                    }}
                  >
                    TRANSACTIONS TABLE
                  </div>
                </td>
              </tr>
            )}
          </Table>
        </TableContainer>
        {rows && rows.length > 0 ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )}
      </Paper>
    </Box>
  );
}