import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  CardContent,
  Avatar,
  Card,
  CardActions,
  Input,
  FormControl,
  Checkbox,
  FormLabel,
  Divider,
} from '@mui/material';
import { account } from './../../mock/mock-data';
import Cookies from 'js-cookie';
import TableTransactions from '../../pages/StudentProfile/components/TableTransactions';
import { fetchData, postData } from '../../services/AppService';
import { PaymentHistoryControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
function BillingCard() {
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

  return (
    user && (
      <>
        <div className="row">
          <div className="col-4">
            <Card
              className="p-3"
              sx={{
                borderRadius: '20px',
                maxWidth: '100%',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              }}
            >
              <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <div className="p-5">
                  <div className="d-flex justify-content-center p-2">
                    <div style={{ borderStyle: 'dotted' }} className="p-2 border rounded-circle">
                      <Avatar
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 130, height: 130, backgroundColor: '#D7DBFF' }}
                      />
                    </div>
                  </div>
                  <Typography style={{ fontWeight: 700, textAlign: 'center' }}>@username</Typography>
                </div>

                <Typography style={{ fontWeight: 700, color: 'grey', textAlign: 'center' }}>STUDENT</Typography>
              </CardContent>
              <CardActions className="d-flex justify-content-center mb-3">
                <Button
                  className="rounded-pill"
                  style={{ backgroundColor: '#ffe4de', fontWeight: 700, color: '#c4403d' }}
                  variant="filled"
                >
                  Khoá tài khoản
                </Button>
              </CardActions>
            </Card>
          </div>

          <div className="col-8">
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
                <FormControl sx={{ borderRadius: '20' }}>
                  <TextField disabled className="rounded-top" id="first_name" label="Họ" defaultValue="Nguyễn" />
                </FormControl>
                <FormControl>
                  <TextField disabled className="rounded-top" id="last_name" label="Tên" defaultValue="Anh" />
                </FormControl>
                <FormControl>
                  <TextField
                    disabled
                    className="rounded-top"
                    label="Email"
                    id="email"
                    defaultValue="anhncd@gmail.com"
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    disabled
                    className="rounded-top"
                    label="Số điện thoại"
                    id="phone"
                    defaultValue="0123456789"
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <TextField disabled className="rounded-top" label="Địa chỉ" id="address" defaultValue="" />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <TextField
                    disabled
                    className="rounded-top"
                    label="Mô tả"
                    id="descripton"
                    minRows={4}
                    multiline
                    defaultValue=""
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

export default BillingCard;
