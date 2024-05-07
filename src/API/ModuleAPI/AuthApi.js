/** @format */

import AxiosPort from "./../AxiosPort";

class AuthApi {
  authLogin = data => {
    const url = `/auth/login`;
    return AxiosPort.post(url, data);
  };

  authRegister = data => {
    const url = `/auth/register`;
    return AxiosPort.post(url, data);
  };

  checkPassword = data => {
    const url = `/auth/check-password`;
    return AxiosPort.post(url, data);
  };

  changePassword = data => {
    const url = `/auth/change-password`;
    return AxiosPort.post(url, data);
  };
}
export default new AuthApi();
