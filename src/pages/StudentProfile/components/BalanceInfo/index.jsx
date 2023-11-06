import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { useState } from "react";
import Cookies from "js-cookie";
import { postData } from "../../../../services/AppService";

function BalanceInfo({ wallet, user }) {
  const [isDepositModal, setDepositModal] = useState(false);
  const [price, setPrice] = useState(0)

  const handleOpenDeposit = () => {
    setDepositModal(true);
  }

  const handleCloseDeposit = () => {
    setDepositModal(false);
  }

  const handleDeposit = async () => {
    const token = Cookies.get('token')
    if (token) {
      const body = {
        accountId: user.id,
        value: price.toString()
      }
      await postData(`/paypal/orders`, body, token).then(resp => {
        if (resp) {
          console.log(resp);
        }
      })
    }
  }

  const handleWithdraw = () => {

  }

  return (
    wallet && wallet.id &&
    <Card
      variant="outlined"
      style={{
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <CardContent
        className="p-4 d-flex flex-column gap-2"
        style={{ minHeight: 160 }}
      >
        <div className="row justify-content-between">
          <div className="col-6">Số dư</div>
          <div className="col-6">ID: {wallet.id}</div>
        </div>
        <div className="row flex-grow-1 justify-content-center align-items-center">
          USD {wallet.amount.toLocaleString()}
        </div>
        <div className="row  ">
          <div className="col-6  justify-content-center align-items-center d-flex">
            <Button variant="contained" onClick={handleOpenDeposit}>Nạp tiền</Button>
          </div>
          <div className="col-6 justify-content-center align-items-center d-flex ">
            <Button
              style={{ backgroundColor: "#cecece", color: "#000" }}
              variant="contained"
              onClick={handleWithdraw}
            >
              Rút tiền
            </Button>
          </div>
        </div>
      </CardContent>
      <Modal open={isDepositModal} onClose={handleCloseDeposit}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Nhập số tiền muốn nạp
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
            <button className="btn btn-outline-primary mt-5" onClick={handleDeposit}>Submit</button>
          </div>
        </Box>
      </Modal>
    </Card>

  );
}

export default BalanceInfo;
