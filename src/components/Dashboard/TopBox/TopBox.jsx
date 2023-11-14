import Styles from "./TopBox.module.scss";
import classNames from "classnames";
import { topDealUsers } from "../../../mock/mock-data";

const TopBox = () => {
  return (
    <div className={classNames(Styles.topBox)}>
      <h1>Top Deals</h1>
      <div className={classNames(Styles.list)}>
        {topDealUsers.map((user) => (
          <div className={classNames(Styles.listItem)} key={user.id}>
            <div className={classNames(Styles.user)}>
              <img src={user.img} alt="" />
              <div className={classNames(Styles.userTexts)}>
                <span className={classNames(Styles.username)}>
                  {user.username}
                </span>
                <span className={classNames(Styles.email)}>{user.email}</span>
              </div>
            </div>
            <span className={classNames(Styles.amount)}>${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
