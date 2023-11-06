import { Container } from 'reactstrap';
import Footer from '../../components/Landing/Footer/Footer';
import Header from '../../components/Landing/Header/Header';
import { Divider } from '@mui/material';
import CardProfile from './components/CardProfile';
import WalletCard from './components/WalletCard';
import BalanceInfo from './components/BalanceInfo';
import TableTransactions from './components/TableTransactions';

const transactions = [
  { date: '2023-10-08', description: 'Purchase 1', amount: '$50.00' },
  { date: '2023-10-09', description: 'Purchase 2', amount: '$30.00' },
  { date: '2023-10-10', description: 'Purchase 3', amount: '$20.00' },
];
function StudentProfile() {
  const userTmp = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header />
      <Divider className="mb-4" />
      <Container>
        <div className="row gap-4">
          <div className="row">
            <div className="col-7 flex-shrink-1">
              <CardProfile user={userTmp} />
            </div>
            <div className="col-5 ">
              <div className="row gap-3">
                <BalanceInfo />
                <WalletCard />
              </div>
            </div>
          </div>
          <div className="row">
            <TableTransactions />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default StudentProfile;
