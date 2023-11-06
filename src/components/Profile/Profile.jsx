import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { account } from './../../mock/mock-data'
import Cookies from 'js-cookie';
import CardProfile from '../../pages/StudentProfile/components/CardProfile';
import BalanceInfo from '../../pages/StudentProfile/components/BalanceInfo';
import WalletCard from '../../pages/StudentProfile/components/WalletCard';
import TableTransactions from '../../pages/StudentProfile/components/TableTransactions';
import { fetchData, postData } from '../../services/AppService';

function Profile() {
    const [user, setUser] = useState();
    const [wallet, setWallet] = useState();

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
        user && <Container className='my-5'>
            <div className="row gap-4">
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
                    <TableTransactions />
                </div>
            </div>
        </Container>
    );
}

export default Profile;
