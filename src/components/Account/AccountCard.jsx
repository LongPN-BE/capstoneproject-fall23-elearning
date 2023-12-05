import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, CardContent, Avatar, Card, CardActions, Input, FormControl, Checkbox, FormLabel, Divider } from '@mui/material';
import { account } from './../../mock/mock-data'
import Cookies from 'js-cookie';
import CardProfile from '../../pages/StudentProfile/components/CardProfile';
import BalanceInfo from '../../pages/StudentProfile/components/BalanceInfo';
import WalletCard from '../../pages/StudentProfile/components/WalletCard';
import TableTransactions from '../../pages/StudentProfile/components/TableTransactions';
import { fetchData, postData } from '../../services/AppService';
import { PaymentHistoryControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
function AccountCard() {
    const [user, setUser] = useState();
    const [wallet, setWallet] = useState();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
            setUser(JSON.parse(user))
            const token = Cookies.get('token')
            if (token) {
                fetchData(`/wallet/by-account?account_id=${JSON.parse(user).id}`, token).then(resp => {
                    console.log(resp);
                    if (resp) {
                        setWallet(resp)
                    }
                })
                paymentHisApi.getPaymentHistoryByTeacher(JSON.parse(user).teacherId, (err, res) => {
                    if (res) {
                        setTransactions(res);
                    }
                });
            }
        }
    }, [])

    const handleAddWallet = async () => {
        const token = Cookies.get('token');
        if (token) {
            const body = {
                amount: 0,
                bankNumber: "",
                bankName: "",
                accountId: user.id,
                walletType: "paypal"
            }
            await postData(`/wallet/save`, body, token).then(resp => {
                if (resp) {
                    window.location.reload()
                }
            })
        }
    }

    return (
        user && <Container className='m-5'>
            <div className='row'>
                <div className='col-4'>
                    <Card className='p-3'
                        sx={{
                            borderRadius: '20px',
                            width: 320,
                            maxWidth: '100%',
                            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;'
                        }}
                    >


                        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                            <div className='p-5'>
                                <div className='d-flex justify-content-center p-2'>
                                    <div style={{ borderStyle: 'dotted' }} className='p-2 border rounded-circle'>
                                        <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 130, height: 130, backgroundColor: '#D7DBFF' }} />
                                    </div>

                                </div>
                                <Typography style={{ fontWeight: 700, textAlign: 'center' }}>@username</Typography>
                            </div>

                            <Typography style={{ fontWeight: 700, color: 'grey', textAlign: 'center' }}>STUDENT</Typography>



                        </CardContent>
                        <CardActions className='d-flex justify-content-center mb-3'>

                            <Button className='rounded-pill' style={{ backgroundColor: '#ffe4de', fontWeight: 700, color: '#c4403d' }} variant="filled">Disable Account</Button>
                        </CardActions>
                    </Card>
                </div>

                <div className='col-7'>
                    <Card className='p-3'
                        sx={{
                            borderRadius: '20px',
                            maxHeight: 'max-content',
                            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;'
                        }}
                    >
                        <div className='d-flex'>
                            <Typography level="title-lg" >
                                User Information
                            </Typography>

                        </div>
                        <Divider inset="none" />
                        <CardContent
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                        >

                            <FormControl>
                                <FormLabel id="first_name">Họ</FormLabel>
                                <TextField
                                    disabled
                                    className='rounded-top'
                                    id="first_name"
                                    variant="filled"
                                    value="Nguyễn"
                                    sx={{ backgroundColor: '#D7DBFF', border: 'none' }} />
                            </FormControl>
                            <FormControl>
                                <FormLabel id="last_name">Tên</FormLabel>
                                <TextField
                                    disabled
                                    className='rounded-top'
                                    id="last_name"
                                    value="Anh"
                                    variant="filled" sx={{ backgroundColor: '#D7DBFF', border: 'none' }} />
                            </FormControl>
                            <FormControl>
                                <FormLabel id="email">Email</FormLabel>
                                <TextField
                                    disabled
                                    className='rounded-top'
                                    id="email"
                                    value="anhncd@gmail.com"
                                    variant="filled" sx={{ backgroundColor: '#D7DBFF', border: 'none' }} />
                            </FormControl>
                            <FormControl>
                                <FormLabel id="phone">Số điện thoại</FormLabel>
                                <TextField
                                    disabled
                                    className='rounded-top'
                                    id="phone"
                                    value="0123456789"
                                    variant="filled" sx={{ backgroundColor: '#D7DBFF', border: 'none' }} />
                            </FormControl>
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel id="address">Địa chỉ</FormLabel>
                                <TextField
                                    disabled
                                    className='rounded-top'
                                    id="address"
                                    value=""
                                    variant="filled" sx={{ backgroundColor: '#D7DBFF', border: 'none' }} />
                            </FormControl>
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel id="descripton">Mô tả</FormLabel>
                                <TextField
                                    disabled
                                    className='rounded-top'
                                    id="descripton"
                                    value=""
                                    variant="filled" sx={{ backgroundColor: '#D7DBFF', border: 'none' }} />
                            </FormControl>
                            <CardActions sx={{ gridColumn: '1/-1' }}>
                                <Button variant="filled" color="primary">
                                    Edit
                                </Button>
                            </CardActions>

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
        </Container >
    );
}

export default AccountCard;
