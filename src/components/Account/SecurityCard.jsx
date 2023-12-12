import React, { useState, useEffect } from 'react';
import { TextField, CardContent, Card, CardActions, FormControl, styled } from '@mui/material';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../services/AppService';
import {
  AccountControllerApi,
  PaymentHistoryControllerApi,
  ProfileControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import Swal from 'sweetalert2';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
const accountApi = new AccountControllerApi(ApiClientSingleton.getInstance());
const profileApi = new ProfileControllerApi(ApiClientSingleton.getInstance());

function SecurityCard({ user }) {
  const [isReloadInfo, setIsReloadInfo] = useState(false);
  const [profile, setProfile] = useState();
  const [changePass, setChangePass] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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

  const showSuccess = (msg) => {
    Swal.fire({
      title: 'Đổi Mật Khẩu',
      text: msg,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    })
  }

  const showError = (msg) => {
    if (msg == "Mật khẩu không trùng") {
      Swal.fire({
        title: 'Oops...',
        text: "Mật khẩu không đúng",
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    Swal.fire({
      title: 'Oops...',
      text: msg,
      icon: 'error',
      confirmButtonText: 'OK',
    });

  }

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/';
  };


  const validatePassword = () => {
    return changePass.newPassword === changePass.confirmPassword;
  };

  const BlackTextField = styled(TextField)`
    & label.Mui-focused {
      color: black;
    }
    & .MuiOutlinedInput-root {
      border-radius: 8px;
      &.Mui-focused fieldset {
        border-color: black;
        border-radius: 8px;
      }
    }
  `;

  return (
    user && (
      <>
        <Container>
          <div className="row">
            <div className="col-12">
              <Card
                className="p-3"
                sx={{
                  borderRadius: '20px',
                  maxHeight: 'max-content',
                  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                }}
              >
                <CardContent
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                    gap: 1.5,
                  }}
                >
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <TextField
                      className="mb-2"
                      inputProps={{ style: { borderRadius: '20px' } }}
                      type="password"
                      label="Mật khẩu"
                      name="password"
                      required
                      value={changePass.oldPassword}
                      onChange={(e) => {
                        const newChange = {
                          ...changePass,
                          oldPassword: e.target.value,
                        };
                        setChangePass(newChange);
                      }}
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <TextField
                      className="mb-2"
                      type="password"
                      label="Mật khẩu mới"
                      name="newPassword"
                      required
                      helperText="Mật khẩu phải có 8 ký tự trở lên"
                      value={changePass.newPassword}
                      onChange={(e) => {
                        const newChange = {
                          ...changePass,
                          newPassword: e.target.value,
                        };
                        setChangePass(newChange);
                      }}
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <TextField
                      className="mb-2"
                      type="password"
                      label="Xác nhân mật khẩu mới"
                      name="confirmPassword"
                      required
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
                  </FormControl>
                </CardContent>
                <div className="d-flex justify-content-end px-2">
                  <CardActions>
                    <button
                      className="btn px-3"
                      style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
                      disabled={!validatePassword()}
                      onClick={() => {
                        if (validatePassword()) {
                          console.log("test")
                          accountApi.changePassword(
                            {
                              oldPassword: changePass.oldPassword,
                              newPassword: changePass.newPassword,
                            },
                            (err, res) => {
                              if (res?.code === 200) {
                                console.log("thắng")
                                showSuccess('Đổi mật khẩu thành công');
                              } else {
                                console.log(`thua ${res?.message}`)
                                showError(res?.message);

                              }
                            },
                          );
                        }
                      }}
                    >
                      Lưu
                    </button>
                  </CardActions>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </>
    )
  );
}

export default SecurityCard;
