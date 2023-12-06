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
import { fetchData, postData } from '../../services/AppService';
import { PaymentHistoryControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import backgroundImg from '../../assets/images/overlay_2.jpg';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaypalIcon from '../../assets/images/paypal-icon.png';
import TransactionTable from './TransactionTable';

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
        // ${JSON.parse(user).id}
        fetchData(`/wallet/by-account?account_id=11`, token).then((resp) => {
          console.log(resp);
          if (resp) {
            setWallet(resp);
          }
        });
        fetchData(`/transaction/by-student?studentId=11`, token).then((resp) => {
          console.log(resp);
          if (resp) {
            setTransactions(resp);
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
    wallet && (
      <>
        <div className="row">
          <div className="col-4">
            <Card
              className="p-2"
              sx={{
                borderRadius: '20px',
                maxWidth: '100%',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                background: ' linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <CardContent>
                <Typography className="text-end" style={{ fontWeight: 700, color: 'white', opacity: '80%' }}>
                  {' '}
                  # {wallet.id}
                </Typography>
                <div className=" d-flex">
                  <div className="rounded-circle p-2">
                    <AccountBalanceWalletIcon />
                  </div>
                  <div className=" p-2">
                    <Typography style={{ fontSize: 18, fontWeight: 700, textAlign: 'left', color: '#212b36' }}>
                      Ví tài khoản
                    </Typography>
                  </div>
                </div>
                <div className="d-flex justify-content-center p-2">
                  <Typography style={{ fontSize: 25, fontWeight: 700, textAlign: 'center', color: 'white' }}>
                    {wallet?.amount.toLocaleString()} VND
                  </Typography>
                </div>
                <div className="d-flex my-2">
                  <img src={PaypalIcon} className="p-1 mx-1" style={{ width: 30, height: 30 }} alt="" />
                  <Typography className="pt-1" style={{ fontWeight: 700, color: '#212b36' }}>
                    PAYPAL ID:
                  </Typography>
                </div>
                <Typography style={{ fontWeight: 700, color: 'white', width: 500, overflow: 'hidden' }}>
                  {wallet?.bankNumber}
                </Typography>
              </CardContent>
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
              <CardContent>
                <TransactionTable data={transactions} />
              </CardContent>
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
