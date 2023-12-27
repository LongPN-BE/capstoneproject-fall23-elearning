import { Container } from 'reactstrap';
import Footer from '../../components/Landing/Footer/Footer';
import Header from '../../components/Landing/Header/Header';
import CardProfile from './components/CardProfile';
import WalletCard from './components/WalletCard';
import BalanceInfo from './components/BalanceInfo';
import TableTransactions from './components/TableTransactions';
import Cookies from 'js-cookie';
import { Divider } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import {
  PaymentHistoryControllerApi,
  ProfileControllerApi,
  TransactionControllerApi,
  WalletControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { toast, ToastContainer } from 'react-toastify';
import TableTransactionsEnroll from './components/TableTransactionsEnroll';
import PaginatePaymentTransaction from './components/PaginatePaymentTransaction';
import PaginateTransaction from './components/PaginateTransaction';
import CustomBreadcrumbs from '../../components/Breadcrumbs';
import moment from 'moment/moment';

const FilterContext = createContext(null);

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());
const transactionApi = new TransactionControllerApi(ApiClientSingleton.getInstance());
function StudentProfile() {
  const userTmp = JSON.parse(Cookies.get('user'));
  const [transactions, setTransactions] = useState([]);
  const [transactionsEnroll, setTransactionsEnroll] = useState([]);
  const [wallet, setWallet] = useState();
  const [isReload, setIsReload] = useState(false);
  const [filterPaymentHis, setFilterPaymentHis] = useState({
    startDate: '',
    endDate: '',
  });
  const [filterHis, setFilterHis] = useState({
    startDate: '',
    endDate: '',
  });
  const breadcrumbItems = [
    {
      url: '/student-home',
      label: 'Trang chủ',
    },
    {
      url: '',
      label: 'Thông tin cá nhân',
    },
  ];
  useEffect(() => {
    walletApi.getByAccountId(userTmp?.id, (err, res) => {
      if (res && res.id) {
        setWallet(res);
      }
    });
  }, [isReload]);

  useEffect(() => {
    paymentHisApi.getPaymentHistoryByStudent(
      {
        studentId: userTmp?.studentId,
        startDate: filterPaymentHis.startDate ? moment(filterPaymentHis.startDate).format('YYYY-MM-DD') : null,
        endDate: filterPaymentHis.endDate ? moment(filterPaymentHis.endDate).format('YYYY-MM-DD') : null,
      },
      (err, res) => {
        if (res) {
          setTransactions(res);
        }
      },
    );
  }, [isReload, filterPaymentHis]);
  useEffect(() => {
    transactionApi.getByStudentId(
      {
        studentId: userTmp?.studentId,
        startDate: filterHis.startDate ? moment(filterHis.startDate).format('YYYY-MM-DD') : null,
        endDate: filterHis.endDate ? moment(filterHis.endDate).format('YYYY-MM-DD') : null,
      },
      (err, res) => {
        if (res) {
          setTransactionsEnroll(res);
        }
      },
    );
  }, [isReload, filterHis]);

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyErorr = (msg) => {
    toast.error(msg, {
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
          notifySuccess('Liên kết thành công !');
        }
        if (err) {
          notifyErorr('Liên kết không thành công !');
        }
      },
    );
  };

  return (
    <>
      <FilterContext.Provider value={{ filterPaymentHis, setFilterPaymentHis, filterHis, setFilterHis }}>
        <ToastContainer />
        <Header />
        <CustomBreadcrumbs items={breadcrumbItems} />
        <Divider className="mb-4 mt-4" />
        <Container>
          <div className="row gap-4">
            <div className="row">
              <div className="col-7 flex-shrink-1">
                <CardProfile user={userTmp} />
              </div>
              <div className="col-5 ">
                {wallet ? (
                  <BalanceInfo user={userTmp} wallet={wallet} setIsReload={setIsReload} isReload={isReload} />
                ) : (
                  <WalletCard onAddWallet={addWallet} isEmpty={true} user={userTmp} />
                )}
              </div>
            </div>
            <div className="row">
              <PaginatePaymentTransaction items={transactions} itemsPerPage={10} />
            </div>
            <div className="row">
              <PaginateTransaction items={transactionsEnroll} itemsPerPage={10} />
            </div>
          </div>
        </Container>
        <Footer />
      </FilterContext.Provider>
    </>
  );
}
export { FilterContext };

export default StudentProfile;
