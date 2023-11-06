import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box, Divider, Modal, Radio } from "@mui/material";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MomoIcon from "../../../../assets/images/Logo MoMo.svg";
import { BsPlusCircle } from "react-icons/bs";
import PaypalIcon from './../../../../assets/images/PayPal.webp'

function WalletCard({ wallet, onAddWallet, user }) {
  const [isOpenModal, setOpenModal] = useState(false);
  const [radioSelected, setRadioSelected] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <>
      <Card
        variant="outlined"
        style={{
          width: "100%",
          borderRadius: "16px",
          backgroundColor: wallet ? "#cecece" : "",
        }}
      >
        <CardContent
          className={wallet ? "py-5" : ""}
          style={{ position: "relative" }}
        >
          {!wallet?.id ? (
            <div onClick={handleOpenModal}>
              <div className="row px-4 justify-content-center align-items-center">
                <BsPlusCircle style={{ fontSize: 80, cursor: "pointer" }} />
              </div>
              <div style={{ position: "absolute", top: 16 }}>
                Tài khoản liên kết
              </div>
            </div>
          ) : (
            <div className="row px-4">
              <div className="col-8">
                <div className="row">Tài khoản liên kết</div>
                <div className="row">
                  <div className="col-6">Phương thức: </div>
                  <div className="col-6">{wallet.walletType}</div>
                </div>
                <div className="row">
                  <div className="col-6">Số tài khoản: </div>
                  <div className="col-6">{wallet.bankNumber}</div>
                </div>
                <div className="row">
                  <div className="col-6">Họ và tên: </div>
                  <div className="col-6">{user?.name}</div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex flex-column align-items-center gap-1">
                  <img src={PaypalIcon} style={{ height: "100%", width: "100%" }} />
                  <Button
                    variant="contained"
                    style={{
                      width: "80%",
                      backgroundColor: "rgb(244, 67, 54)",
                      borderRadius: "24px",
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <Modal open={isOpenModal} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Select wallet
            </Typography>
            <div className="d-flex">
              <Radio
                checked={radioSelected}
                onChange={() => setRadioSelected(!radioSelected)}
                value={radioSelected}
                name="radio-buttons"
              />
              <img src={PaypalIcon} alt='paypal logo' className="mx-2" style={{ width: '18rem', height: '5rem' }} />
            </div>
            <div className="text-end">
              <button className="btn btn-outline-primary mt-5" onClick={onAddWallet}>Submit</button>
            </div>
          </Box>
        </Modal>
      </Card>
    </>
  );
}

export default WalletCard;
