import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { postData } from '../../../../services/AppService';
import { PaypalV2ControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import Swal from 'sweetalert2';

const paypalApi = new PaypalV2ControllerApi(ApiClientSingleton.getInstance());
function BalanceInfo({ wallet, user }) {
  const [isDepositModal, setDepositModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [isWithDraw, setIsWithDraw] = useState(false)

  const handleOpenDeposit = () => {
    setDepositModal(true);
  };

  const handleCloseDeposit = () => {
    setDepositModal(false);
  };

  const handleDeposit = async () => {
    const body = {
      accountId: user.id,
      value: price.toString(),
    };
    paypalApi.createOrders(body, (err, res) => {
      if (res) {
        res?.links?.forEach((element) => {
          if (element?.rel === 'approve') {
            window.open(element.href, 'blank');
          }
        });
      }
    });
  };


  const handleWithDraw = async () => {
    const token = Cookies.get('token')
    if (price <= wallet.amount) {
      if (token) {
        const body = {
          accountId: user.id,
          amountValue: price.toString(),
        };
        await postData('/paypal/payout', body, token).then(resp => {
          if (resp) {
            window.location.reload()
          }
        })
      }
    } else {
      setIsWithDraw(false)
      setDepositModal(false);
      Swal.fire({
        title: "Warning",
        text: 'amount should be small than amount in your wallet',
        icon: "warning"
      });
    }
  };

  const handleWithdrawOpenModal = () => {
    setIsWithDraw(true)
    setDepositModal(true);

  };

  return (
    wallet &&
    wallet.id && (
      <Card
        variant="outlined"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '16px',
        }}
      >
        <CardContent className="p-4 d-flex flex-column gap-2" style={{ minHeight: 160 }}>
          <div className="row justify-content-between">
            <div className="col-6">Số dư</div>
            <div className="col-6">ID: {wallet.id}</div>
          </div>
          <div className="row flex-grow-1 justify-content-center align-items-center">
            {wallet?.amount ? wallet.amount.toLocaleString() : 0} VNĐ
          </div>
          <div className="row  ">
            <div className="col-6  justify-content-center align-items-center d-flex">
              <Button variant="contained" onClick={handleOpenDeposit}>
                Nạp tiền
              </Button>
            </div>
            <div className="col-6 justify-content-center align-items-center d-flex ">
              <Button
                style={{ backgroundColor: '#cecece', color: '#000' }}
                variant="contained"
                onClick={handleWithdrawOpenModal}
              >
                Rút tiền
              </Button>
            </div>
          </div>
        </CardContent>
        <Modal open={isDepositModal} onClose={handleCloseDeposit}>
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
              {isWithDraw ? 'Nhập số tiền muốn rút' : 'Nhập số tiền muốn nạp'}
            </Typography>
            <TextField
              fullWidth
              label="Số tiền"
              variant="outlined"
              margin="normal"
              name="name"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <div className="text-end">
              {isWithDraw ? <button className="btn btn-outline-primary mt-3" onClick={handleWithDraw}>
                Rút tiền
              </button> : <button className="btn btn-outline-primary mt-3" onClick={handleDeposit}>
                Nạp tiền
              </button>}
            </div>
          </Box>
        </Modal>
      </Card>
    )
  );
}

export default BalanceInfo;
