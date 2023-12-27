import React, { useState, useEffect, createContext } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { account } from './../../mock/mock-data';
import Cookies from 'js-cookie';
import CardProfile from '../../pages/StudentProfile/components/CardProfile';
import BalanceInfo from '../../pages/StudentProfile/components/BalanceInfo';
import WalletCard from '../../pages/StudentProfile/components/WalletCard';
import { postData } from '../../services/AppService';
import {
  WalletControllerApi
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());


function Profile() {
  const userTmp = JSON.parse(Cookies.get('user'));
  const [wallet, setWallet] = useState();
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    walletApi.getByAccountId(userTmp?.id, (err, res) => {
      if (res && res.id) {
        setWallet(res);
      }
    });
  }, [isReload]);


  const handleAddWallet = async () => {
    const token = Cookies.get('token');
    if (token) {
      const body = {
        amount: 0,
        bankNumber: '',
        bankName: '',
        accountId: userTmp.id,
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

    <Container style={{ padding: '20px 0' }}>
      <div className="row gap-4">
        <div className="row">
          <div className="col-7 flex-shrink-1">
            <CardProfile user={userTmp} />
          </div>
          <div className="col-5 ">
            {wallet ? (
              <BalanceInfo user={userTmp} wallet={wallet} setIsReload={setIsReload} isReload={isReload} />
            ) : (
              <WalletCard onAddWallet={handleAddWallet} isEmpty={true} user={userTmp} />
            )}
          </div>
        </div>
      </div>
    </Container>

  );
}

export default Profile;
