import { BaseServices } from "./BaseService";

class AccountService extends BaseServices {
  getAllAccount = () => {
    return this.get(`users`);
  };
}

export default AccountService = new AccountService();
