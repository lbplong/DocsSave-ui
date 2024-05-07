/** @format */

import AxiosPort from "../AxiosPort";

class AccountApi {
  getAccountInfo = () => {
    const url = `accounts/info`;
    return AxiosPort.get(url);
  };

  changeAccountInfo = data => {
    const url = `accounts/change-info`;
    return AxiosPort.post(url, data);
  };
}
export default new AccountApi();
