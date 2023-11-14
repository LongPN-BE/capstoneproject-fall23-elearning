import { Container } from 'reactstrap';
import Footer from '../../components/Landing/Footer/Footer';
import Header from '../../components/Landing/Header/Header';
import CardProfile from './components/CardProfile';
import WalletCard from './components/WalletCard';
import BalanceInfo from './components/BalanceInfo';
import TableTransactions from './components/TableTransactions';
import Cookies from 'js-cookie';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  PaymentHistoryControllerApi,
  TransactionControllerApi,
  WalletControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { toast, ToastContainer } from 'react-toastify';
import TableTransactionsEnroll from './components/TableTransactionsEnroll';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());
const transactionApi = new TransactionControllerApi(ApiClientSingleton.getInstance());
function StudentProfile() {
  const userTmp = JSON.parse(Cookies.get('user'));
  const [transactions, setTransactions] = useState([]);
  const [transactionsEnroll, setTransactionsEnroll] = useState([]);
  const [wallet, setWallet] = useState();
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    paymentHisApi.getPaymentHistoryByStudent(userTmp?.studentId, (err, res) => {
      if (res) {
        setTransactions(res);
      }
    });
    walletApi.getByAccountId(userTmp?.id, (err, res) => {
      if (res && res.id) {
        setWallet(res);
      }
    });
    transactionApi.getByStudentId(userTmp?.studentId, (err, res) => {
      if (res) {
        setTransactionsEnroll(res);
      }
    });
  }, [isReload]);

  const notifySuccess = () => {
    toast.success('Liên kết thành công !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyErorr = () => {
    toast.error('Liên kết không thành công !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const addWallet = () => {
    walletApi.saveWallet(
      {
        amount: 0,
        bankName: 'PayPal',
        accountId: userTmp?.id,
        walletType: 'Student',
      },
      (err, res) => {
        if (res) {
          setIsReload(!isReload);
          notifySuccess();
        }
        if (err) {
          notifyErorr();
        }
      },
    );
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <Divider className="mb-4" />
      <Container>
        <div className="row gap-4">
          <div className="row">
            <div className="col-7 flex-shrink-1">
              <CardProfile user={userTmp} />
            </div>
            <div className="col-5 ">
              {wallet ? (
                <BalanceInfo user={userTmp} wallet={wallet} />
              ) : (
                <WalletCard onAddWallet={addWallet} isEmpty={true} user={userTmp} />
              )}
            </div>
          </div>
          <div className="row">
            <TableTransactions transactions={transactions} />
          </div>
          <div className="row">
            <TableTransactionsEnroll transactions={transactionsEnroll} />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default StudentProfile;
