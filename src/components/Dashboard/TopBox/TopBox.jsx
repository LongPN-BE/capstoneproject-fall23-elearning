import { formatVND } from "../../../util/Utilities";
import Styles from "./TopBox.module.scss";
import classNames from "classnames";

const TopBox = ({ title, transactions, users }) => {
  const renderStatus = (status) => {
    if (status === 'COMPLETED') {
      return <p style={{ color: 'green' }}>Nạp tiền thành công</p>
    }
    if (status === "CREATED") {
      return <p style={{ color: 'red' }}>Nạp tiền thất bại</p>
    }
    if (status === "COMPLETED_PAYOUT") {
      return <p style={{ color: 'red' }}>Rút tiền thành công</p>
    }
  }

  const renderAmount = (d) => {
    if (d.paymentHistoryStatus === 'COMPLETED') {
      return <p style={{ color: 'green' }}>+{formatVND(d.amount)}</p>
    }
    if (d.paymentHistoryStatus === "CREATED") {
      return <p style={{ color: 'red' }}>{formatVND(d.amount)}</p>
    }
    if (d.paymentHistoryStatus === "COMPLETED_PAYOUT") {
      return <p style={{ color: 'red' }}>-{formatVND(d.amount)}</p>
    }
  }

  return (
    <div className={classNames(Styles.topBox)}>
      <h3>{title}</h3>
      <div className={classNames(Styles.list)}>
        {transactions && transactions?.map((d) => (
          <div className={classNames(Styles.listItem)} key={d.id}>
            <div className={classNames(Styles.user)}>
              <img src={d.img ? d.img : 'https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'} alt="" />
              <div className={classNames(Styles.userTexts)}>
                <span className={classNames(Styles.username)}>
                  {d?.account.username}
                </span>
                <span className={classNames(Styles.email)}>{renderStatus(d.paymentHistoryStatus)}</span>
              </div>
            </div>
            <span className={classNames(Styles.amount)}>{renderAmount(d)}</span>
          </div>
        ))}
        {users && users?.map((d) => (
          <div className={classNames(Styles.listItem)} key={d.id}>
            <div className={classNames(Styles.user)}>
              <img src={d.img} alt="" />
              <div className={classNames(Styles.userTexts)}>
                <span className={classNames(Styles.username)}>
                  {d.username}
                </span>
                <span className={classNames(Styles.email)}>{d.email}</span>
              </div>
            </div>
            <span className={classNames(Styles.amount)}>${d.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
