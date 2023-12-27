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
import Loading from '../../../../components/Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';

const paypalApi = new PaypalV2ControllerApi(ApiClientSingleton.getInstance());
function BalanceInfo({ wallet, user, setIsReload, isReload }) {
  const [loading, setLoading] = useState(false);
  const [isDepositModal, setDepositModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [isWithDraw, setIsWithDraw] = useState(false);

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifyError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleOpenDeposit = () => {
    setIsWithDraw(false);
    setDepositModal(true);
  };

  const handleCloseDeposit = () => {
    setDepositModal(false);
    setPrice(0);
  };

  const handleDeposit = async () => {
    setLoading(true);
    const body = {
      accountId: user.id,
      value: price.toString(),
    };
    paypalApi.createOrders(body, (err, res) => {
      if (res) {
        res?.responseObject?.links?.forEach((element) => {
          if (element?.rel === 'approve') {
            if (setIsReload !== undefined) {
              window.open(element?.href, 'blank');
            }
          }
        });
      }
      setLoading(false);
    });
  };

  const handleWithDraw = async () => {
    const token = Cookies.get('token');
    if (parseFloat(price) <= wallet.amount && parseFloat(price) > 0) {
      if (token) {
        setLoading(true);
        const body = {
          accountId: user.id,
          amountValue: price.toString(),
        };
        await postData('/paypal/payout', body, token)
          .then((resp) => {
            if (resp?.code === 200) {
              if (setIsReload !== undefined) {
                setIsReload(!isReload);
              }
              setIsWithDraw(false);
              setDepositModal(false)
              setPrice(0);
            } else {
              notifyError(resp?.message);
            }
          })
          .finally(() => setLoading(false));
      }
    } else {
      setIsWithDraw(false);
      setDepositModal(false);
      Swal.fire({
        title: 'Warning',
        text: 'Số tiền phải lớn hơn 0 và nhỏ hơn số tiền trong ví',
        icon: 'warning',
      });
    }
  };

  const handleWithdrawOpenModal = () => {
    setIsWithDraw(true);
    setDepositModal(true);
  };

  const isValidNumber = (str) => {
    if (!str) {
      return true;
    }
    return /^\d+(\.\d+)?$/.test(str);
  };
  const validateAmount = (amount) => {
    const number = Number(amount);
    return number >= 250_000 && number <= 10_000_000;
  };

  return loading ? (
    <Loading />
  ) : (
    wallet && wallet.id && (
      <Card
        variant="outlined"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '16px',
        }}
      >
        <ToastContainer />
        <CardContent className="p-4 d-flex flex-column gap-2" style={{ minHeight: 160, height: '100%' }}>
          <div className="row justify-content-between">
            <div className="col-6">Số dư</div>
            {/* <div className="col-6">ID: {wallet.id}</div> */}
          </div>
          <div
            className="row flex-grow-1 justify-content-center align-items-center"
            style={{ fontWeight: '500', fontSize: '20px' }}
          >
            {wallet?.amount ? wallet.amount.toLocaleString() : 0} VNĐ
          </div>
          <div className="row  ">
            <div className="col-6  justify-content-center align-items-center d-flex">
              <button className="btn btn-success" onClick={handleOpenDeposit}>
                Nạp tiền
              </button>
            </div>
            <div className="col-6 justify-content-center align-items-center d-flex ">
              <button
                // style={{ backgroundColor: '#cecece', color: '#000' }}
                className="btn btn-success"
                onClick={handleWithdrawOpenModal}
              >
                Rút tiền
              </button>
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
              error={!isValidNumber(price) || !validateAmount(price)}
              helperText={
                !isValidNumber(price)
                  ? 'Số tiền không hợp lệ'
                  : !validateAmount(price)
                    ? 'Số tiền phải từ 250.000VND đến 10.000.000VND'
                    : ''
              }
            />
            <div className="text-end">
              {isWithDraw ? (
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={handleWithDraw}
                  disabled={!isValidNumber(price) || !validateAmount(price)}
                >
                  Rút tiền
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={handleDeposit}
                  disabled={!isValidNumber(price) || !validateAmount(price)}
                >
                  Nạp tiền
                </button>
              )}
            </div>
          </Box>
        </Modal>
      </Card>
    )
  );
}

export default BalanceInfo;
