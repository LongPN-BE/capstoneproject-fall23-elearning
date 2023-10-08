import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper, TableContainer } from '@mui/material';
import { Accounts } from '../../mock/mock-data';
import { useEffect } from 'react';
import { useState } from 'react';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

//Handle on click ticket here ----------------------------------------------------------------------
const handleOnClick = (matchId) => {
  //
}

//Handle update here ----------------------------------------------------------------------
const handleUpdate = (id) => {
  // Function Update
  alert('Update')
};

//Handle delete here ---------------------------------------------------------------------
const handleDelete = (id) => {
  // Function Delete
  alert('Delete')
};
// Form action of data grid----------------------------------------------------------
const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellAction">

          <Button sx={{ display: 'flex', float: 'right' }}
            className="updateButton"
            onClick={() => handleUpdate(params.row._id)}>
            Update
          </Button>
          {/* <div>
            <Button className="onclickButton"
              onClick={() => handleOnClick(params.row._id)}>
              On click
             </Button>
          </div> */}
          <Button sx={{ display: 'flex', float: 'right' }}
            className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

export default function DataTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Filter subjects based on whether they have an id in the accounts array
    const user = JSON.parse(localStorage.getItem("user"))
    const filteredData = Accounts;
    setData(filteredData);
  }, []);
  return (
    <div className='container text-center'>
      <h2 className='my-4'>Danh sách tài khoản</h2>
      <TableContainer component={Paper}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={Accounts}
            columns={columns.concat(actionColumn)}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </div>
      </TableContainer>
    </div>

  );
}