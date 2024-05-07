/** @format */

import AxiosPort from "../AxiosPort";

class CheckInApi {
  checkIn = () => {
    const url = `check-in`;
    return AxiosPort.get(url);
  };
}
export default new CheckInApi();
