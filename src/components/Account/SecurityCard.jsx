import React, { useState, useEffect } from 'react';
import { TextField, Button, CardContent, Card, CardActions, FormControl, styled } from '@mui/material';
import { account } from './../../mock/mock-data';
import Cookies from 'js-cookie';
import TableTransactions from '../../pages/StudentProfile/components/TableTransactions';
import { fetchData, postData } from '../../services/AppService';
import { PaymentHistoryControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
function SecurityCard() {
  const [user, setUser] = useState();
  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setUser(JSON.parse(user));
      const token = Cookies.get('token');
      if (token) {
        fetchData(`/wallet/by-account?account_id=${JSON.parse(user).id}`, token).then((resp) => {
          console.log(resp);
          if (resp) {
            setWallet(resp);
          }
        });
        paymentHisApi.getPaymentHistoryByTeacher(JSON.parse(user).teacherId, (err, res) => {
          if (res) {
            setTransactions(res);
          }
        });
      }
    }
  }, []);

  const handleAddWallet = async () => {
    const token = Cookies.get('token');
    if (token) {
      const body = {
        amount: 0,
        bankNumber: '',
        bankName: '',
        accountId: user.id,
        walletType: 'paypal',
      };
      await postData(`/wallet/save`, body, token).then((resp) => {
        if (resp) {
          window.location.reload();
        }
      });
    }
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
                  <BlackTextField
                    className="mb-2"
                    inputProps={{ style: { borderRadius: '20px' } }}
                    type="password"
                    label="Mật khẩu"
                    id="old_password"
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <BlackTextField
                    className="mb-2"
                    type="password"
                    label="Mật khẩu mới"
                    id="new_password"
                    helperText="Mật khẩu phải có 6 ký tự trở lên"
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <BlackTextField
                    className="mb-2"
                    type="password"
                    label="Xác nhân mật khẩu mới"
                    id="new_password_confirm"
                  />
                </FormControl>
              </CardContent>
              <div className="d-flex justify-content-end px-2">
                <CardActions>
                  <button
                    className="btn px-3"
                    style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
                  >
                    Lưu
                  </button>
                </CardActions>
              </div>
            </Card>
          </div>
        </div>

        {/* <div className="row gap-4">
                <div className="row">
                    <div className="col-7 flex-shrink-1">
                        <CardProfile user={user} />
                    </div>
                    <div className="col-5 ">
                        <div className="row gap-3">
                            <BalanceInfo wallet={wallet} user={user} />
                            <WalletCard wallet={wallet} onAddWallet={handleAddWallet} user={user} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <TableTransactions transactions={transactions} />
                </div>
            </div> */}
      </>
    )
  );
}

export default SecurityCard;
