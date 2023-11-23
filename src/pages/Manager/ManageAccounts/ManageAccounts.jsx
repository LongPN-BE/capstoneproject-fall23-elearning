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
  TablePagination,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';
import AccountModal from './AccountModal';
import AccountDetailModal from './AccountDetail';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import Swal from 'sweetalert2';

export default function ListAccount() {
  const [data, setData] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAccountDetailModalOpen, setIsAccountDetailModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/accounts`,
      label: `Danh sách tài khoản`,
    },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/account/accounts', token).then((resp) => {
          if (resp) {
            setData(resp);
            setDataSubmit(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleAddAccount = () => {
    setAccountToEdit(null); // Clear any previous account data (for editing)
    setIsAccountModalOpen(true);
  };

  const handleEditAccount = (accountData) => {
    console.log(accountData);
    setAccountToEdit(accountData); // Set the account data to edit
    setIsAccountModalOpen(true);
  };

  const handleAccountModalClose = () => {
    setIsAccountModalOpen(false);
  };

  const handleViewDetail = (accountData) => {
    console.log(accountData);
    setAccountToEdit(accountData);
    setIsAccountDetailModalOpen(true);
  };

  const handleAccountDetailModalClose = () => {
    setIsAccountDetailModalOpen(false);
  };

  const saveOrUpdateAccount = async (accountData) => {
    // Here you should implement logic to either save a new account or update an existing one.
    // You may need to call an API or update your local data.
    // After saving or updating, you can close the AccountModal.
    // For this example, we'll just log the account data.
    const token = Cookies.get('token');
    console.log('Account data to save or update:', accountData);

    // If setIsAccountModalOpen has an "id", it means you are updating an existing account.
    if (accountData.id) {
      // Implement your update logic here.
      console.log('Account data to update:', accountData);

      const body = {
        ...accountData,
        dateTime: moment(new Date()),
      };
      console.log('Account data to update:', await body);
      // await postData('##', body, token)
      //   .then(resp => {
      //     if (resp) {
      //       window.location.reload();
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    } else {
      // Implement your create logic here for new account.
      console.log('Account data to create:', accountData);
      const body = {
        ...accountData,
        dateTime: moment(new Date()),
      };
      await postData('/account/teacher-account', body, token)
        .then((resp) => {
          if (resp) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsAccountModalOpen(false); // Close the AccountModal
  };

  // Enable/Disable Account
  const handleEnable = (account) => {
    const token = Cookies.get('token');
    if (token) {
      Swal.fire({
        title: "Bạn có chắc muốn kích hoạt tài khoản " + account.username + "?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Không đồng ý`,
        cancelButtonText: `Hủy`,
        footer: '<a href="#">Tại sao tôi gặp vấn đề này?</a>'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let res = fetchData('/account/enable?account_id=' + account.id, token);
          if (res) {
            Swal.fire({
              title: "Kích hoạt thành công!",
              text: res.message,
              icon: "success",
              footer: '<a href="#">Tại sao tôi gặp vấn đề này?</a>'
            });
            window.location.reload();
          }
          // Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Không có gì thay đổi", "", "info");
        }
      });


    }
  };

  const handleDisable = (account) => {
    const token = Cookies.get('token');
    if (token) {

      Swal.fire({
        title: "Bạn có chắc muốn vô hiệu hóa tài khoản " + account.username + "?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Không đồng ý`,
        cancelButtonText: `Hủy`,
        footer: '<a href="#">Tại sao tôi gặp vấn đề này?</a>'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let res = fetchData('/account/disable?account_id=' + account.id, token);
          if (res) {
            Swal.fire({
              title: "Vô hiệu thành công!",
              text: res.message,
              icon: "success",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
            window.location.reload();

          }
          // Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Không có gì thay đổi", "", "info");
        }
      });

    }
  };

  // Search
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filterData = dataSubmit.filter((account) =>
    account.profile.lastName.toLowerCase().includes(searchValue.toLowerCase())
    || account.profile.firstName.toLowerCase().includes(searchValue.toLowerCase())
    || account.username.toLowerCase().includes(searchValue.toLowerCase())
    || account.profile.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  // State to keep track of the current page and the number of rows per page
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSubmit.length) : 0;

  return (
    data && (
      <div className="m-5">
        {/* <div style={{ margin: '20px' }}> */}
        <Paper style={{ padding: '20px' }}>
          <CustomBreadcrumbs items={breadcrumbItems} />

          <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
            <Typography variant="h5">Danh sách tài khoản</Typography>


            {/* <div className="text-end col-9">
              <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleAddAccount}>
                Tạo mới tài khoản giáo viên
              </Button>
            </div> */}
          </div>
          <div className="d-flex" style={{ marginTop: '20px' }}>
            <InputBase
              placeholder="Tìm kiếm"
              style={{ marginLeft: '20px' }}
              startAdornment={<Search />}
              onChange={handleSearchChange}
            />
            <Select
              labelId="account-status-select-label"
              label="Status"
              onChange={(e, value) => {
                if (value.props.value === "none")
                  setDataSubmit(data)
                if (value.props.value === "true")
                  setDataSubmit(data.filter((account) => account.active === true))
                if (value.props.value === "false")
                  setDataSubmit(data.filter((account) => account.active === false))
              }
              }>
              <MenuItem value="none">Tất cả</MenuItem>
              <MenuItem value="true">Đang hoạt động</MenuItem>
              <MenuItem value="false">Chưa hoạt động</MenuItem>
            </Select>
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell width={'120px'}>Tên tài khoản</TableCell>
                <TableCell>Họ và Tên</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell></TableCell>
                {/* <TableCell>Hành động</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((a, index) => {
                return (
                  <TableRow hover={true} key={index}>
                    <TableCell>{index + (page * rowsPerPage, page * rowsPerPage) + 1}</TableCell>
                    <TableCell>{a.username}</TableCell>
                    <TableCell>
                      {a.profile.lastName} {a.profile.firstName}
                    </TableCell>
                    <TableCell>{a.role}</TableCell>
                    <TableCell>{moment(a.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{a.profile.email}</TableCell>
                    <TableCell>{a.active ? 'Đang hoạt động' : 'Chưa kích hoạt'} </TableCell>
                    <TableCell>
                      {!a.active ? <>
                        <button
                          type="submit"
                          title="Kích hoạt"
                          className="btn btn-success m-1"
                          onClick={() => handleEnable(a)}
                        >
                          <CheckCircleOutlineIcon />
                        </button>
                      </> : <>
                        <button
                          type="submit"
                          title="Vô hiệu hóa"
                          className="btn btn-danger m-1"
                          onClick={() => handleDisable(a)}
                        >
                          <DoNotDisturbAltIcon />
                        </button>
                      </>}
                    </TableCell>
                    <TableCell>
                      {/* <Link className="btn btn-outline-secondary" to={`##`}>
                          Xem
                        </Link> */}
                      {/* <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => handleEditAccount(a)} disabled>
                        <Typography variant='body2'>Cập nhật</Typography>
                      </Button> */}
                      <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => handleViewDetail(a)}>
                        <Typography variant='body2'>Xem</Typography>
                      </Button>
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
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Số hàng trên trang :"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper >
        {/* </div> */}
        < AccountModal
          isOpen={isAccountModalOpen}
          onSave={saveOrUpdateAccount}
          onUpdate={saveOrUpdateAccount}
          onClose={handleAccountModalClose}
          account={accountToEdit !== null ? accountToEdit : null
          }
        />
        < AccountDetailModal
          isOpen={isAccountDetailModalOpen}
          onClose={handleAccountDetailModalClose}
          account={accountToEdit !== null ? accountToEdit : null}
        />
      </div >
    )
  );
}
