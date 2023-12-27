import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Divider, Button, Modal, Box, TextField } from '@mui/material';
import moment from 'moment/moment';
import './profile.css';
import { AccountControllerApi, ProfileControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import { set } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

const profileApi = new ProfileControllerApi(ApiClientSingleton.getInstance());
const accountApi = new AccountControllerApi(ApiClientSingleton.getInstance());
function CardProfile({ user }) {
  const [isModalChangePass, setIsModalChangePass] = useState(false);
  const [isModalChangeInfo, setIsModalChangeInfo] = useState(false);
  const [isReloadInfo, setIsReloadInfo] = useState(false);
  const [profile, setProfile] = useState();
  const [info, setInfo] = useState();
  const [changePass, setChangePass] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleCloseModalChangePass = () => {
    setIsModalChangePass(false);
    setChangePass({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  const handleCloseModalChangeInfo = () => {
    setIsModalChangeInfo(false);
  };
  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyErorr = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  useEffect(() => {
    if (user?.studentId) {
      profileApi.getStudentProfile(user?.studentId, (err, res) => {
        if (res) {
          setInfo(res);
          setProfile({
            id: res?.account?.profile?.id,
            avatar: res?.account?.profile?.avatar,
            phone: res?.account?.profile?.phone,
            firstName: res?.account?.profile?.firstName,
            lastName: res?.account?.profile?.lastName,
            email: res?.account?.profile?.email,
            description: res?.account?.profile?.description,
            address: res?.account?.profile?.address,
            dateOfBirth: res?.account?.profile?.dateOfBirth,
            status: res?.account?.profile?.status,
          });
        }
      });
    } else {
      profileApi.getTeacherProfile(user?.teacherId, (err, res) => {
        if (res) {
          setInfo(res);
          setProfile({
            id: res?.account?.profile?.id,
            avatar: res?.account?.profile?.avatar,
            phone: res?.account?.profile?.phone,
            firstName: res?.account?.profile?.firstName,
            lastName: res?.account?.profile?.lastName,
            email: res?.account?.profile?.email,
            description: res?.account?.profile?.description,
            address: res?.account?.profile?.address,
            dateOfBirth: res?.account?.profile?.dateOfBirth,
            status: res?.account?.profile?.status,
          });
        }
      });
    }
  }, [isReloadInfo]);
  const validatePassword = () => {
    return changePass.newPassword === changePass.confirmPassword;
  };
  return (
    <Card variant="outlined" style={{ height: '100%', width: '100%', borderRadius: '16px' }}>
      <ToastContainer />
      <CardContent style={{ height: '100%' }} className="d-flex align-items-center justify-content-start gap-1 py-4">
        <div className="col-4">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: '1', width: '100%' }}>
              <Avatar
                sx={{ width: '60%', height: '60%' }}
                alt="Avatar"
                src={info?.account?.profile?.avatar}
                style={{ margin: 'auto', minHeight: '120px' }}
              />
            </div>
            <div>
              <button className='btn btn-primary' onClick={() => setIsModalChangeInfo(true)}>
                Cập nhật thông tin
              </button>
            </div>
            <div>
              <button className='btn btn-info' onClick={() => setIsModalChangePass(true)}>
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
        <div className="col-8 flex-grows-1">
          <div className="row">
            <Typography variant="h4">
              {info?.account?.profile?.firstName} {info?.account?.profile?.lastName}
            </Typography>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-4">Email:</div>
              <div className="col-8">{info?.account?.profile?.email}</div>
            </div>
            <div className="row">
              <div className="col-4">Số điện thoại :</div>
              <div className="col-8">{info?.account?.profile?.phone}</div>
            </div>
            <div className="row">
              <div className="col-4">Địa chỉ:</div>
              <div className="col-8">{info?.account?.profile?.address}</div>
            </div>
            <div className="row">
              <div className="col-4">Ngày tạo:</div>
              <div className="col-8">{moment(info?.account?.createdAt).format('DD/MM/YYYY')}</div>
            </div>
          </div>
        </div>
      </CardContent>
      {/* Modal change Info */}
      <Modal open={isModalChangeInfo} onClose={handleCloseModalChangeInfo}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Cập nhật thông tin
          </Typography>
          <TextField
            fullWidth
            placeholder="Họ"
            variant="outlined"
            margin="normal"
            name="fullName"
            required
            style={{ margin: '4px 0' }}
            value={profile?.firstName}
            onChange={(e) => {
              const newProfile = {
                ...profile,
                firstName: e.target.value,
              };
              setProfile(newProfile);
            }}
          />
          <TextField
            fullWidth
            placeholder="Tên"
            variant="outlined"
            margin="normal"
            name="fullName"
            required
            style={{ margin: '4px 0' }}
            value={profile?.lastName}
            onChange={(e) => {
              const newProfile = {
                ...profile,
                lastName: e.target.value,
              };
              setProfile(newProfile);
            }}
          />
          <TextField
            fullWidth
            placeholder="Số điện thoại"
            variant="outlined"
            margin="normal"
            name="phone"
            required
            style={{ margin: '4px 0' }}
            value={profile?.phone}
            onChange={(e) => {
              const newProfile = {
                ...profile,
                phone: e.target.value,
              };
              setProfile(newProfile);
            }}
          />
          <div className="text-end">
            <button className="btn btn-outline-danger mt-3 mx-1" onClick={handleCloseModalChangeInfo}>
              Hủy
            </button>
            <button
              className="btn btn-outline-primary mt-3 mx-2"
              onClick={() => {
                profileApi.saveProfile(profile, (err, res) => {
                  if (res) {
                    handleCloseModalChangeInfo();
                    setIsReloadInfo(!isReloadInfo);
                    notifySuccess('Cập nhật thông tin thành công');
                  } else {
                    notifyErorr(`Cập nhật thông tin không thành công: ${err?.message}`);
                  }
                });
              }}
            >
              Xác nhận
            </button>
          </div>
        </Box>
      </Modal>
      {/* Modal change Pass */}
      <Modal open={isModalChangePass} onClose={handleCloseModalChangePass}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Đổi mật khẩu
          </Typography>
          <TextField
            fullWidth
            label="Mật khẩu"
            variant="outlined"
            margin="normal"
            name="password"
            type="password"
            required
            style={{ margin: '4px 0' }}
            value={changePass.oldPassword}
            onChange={(e) => {
              const newChange = {
                ...changePass,
                oldPassword: e.target.value,
              };
              setChangePass(newChange);
            }}
          />
          <TextField
            fullWidth
            label="Mật khẩu mới"
            variant="outlined"
            margin="normal"
            name="newPassword"
            type="password"
            required
            style={{ margin: '4px 0' }}
            value={changePass.newPassword}
            onChange={(e) => {
              const newChange = {
                ...changePass,
                newPassword: e.target.value,
              };
              setChangePass(newChange);
            }}
          />
          <TextField
            fullWidth
            label="Mật khẩu xác nhận"
            variant="outlined"
            margin="normal"
            name="confirmPassword"
            type="password"
            required
            style={{ margin: '4px 0' }}
            value={changePass.confirmPassword}
            onChange={(e) => {
              const newChange = {
                ...changePass,
                confirmPassword: e.target.value,
              };
              setChangePass(newChange);
            }}
            error={!validatePassword()}
            helperText={!validatePassword() ? 'Mật khẩu xác nhận không trùng khớp.' : ''}
          />
          <div className="text-end">
            <button className="btn btn-outline-danger mt-3 mx-1" onClick={handleCloseModalChangePass}>
              Hủy
            </button>
            <button
              className="btn btn-outline-primary mt-3 mx-2"
              onClick={() => {
                if (validatePassword()) {
                  accountApi.changePassword(
                    {
                      oldPassword: changePass.oldPassword,
                      newPassword: changePass.newPassword,
                    },
                    (err, res) => {
                      if (res?.code === 200) {
                        handleCloseModalChangePass();
                        notifySuccess('Đổi mật khẩu thành công');
                      } else {
                        notifyErorr(`Đổi mật khẩu không thành công: ${res?.message}`);
                      }
                    },
                  );
                }
              }}
            >
              Xác nhận
            </button>
          </div>
        </Box>
      </Modal>
    </Card>
  );
}

export default CardProfile;
