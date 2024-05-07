/** @format */
class RestServiceHelper {
  constructor() {
    this._errorMessage = {
      400: "You’ve sent a bad request.",
      401: "Your session were expired!",
      403: "We’re sorry, You don’t have access to the page you requested. Please go back.",
      404: "Sorry, The page you’re looking for doesn’t exist.",
      500: "Our operators have been notified and are working to fix this. Please try again in a few minutes",
    };
  }

  handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data };
    }

    return { error: response.data };
  }

  handleError(error, title) {
    let { message } = error;

    if (!error.response) {
      window.alert(message);
      return;
    }

    const { status } = error.response;
    const errorMessage = this._errorMessage[status];
    if (status === 401) {
      window.confirm({
        title: this._errorMessage[401],
        subText: "Please reload the page.",
        yesAction: () => window.location.reload(),
      });
      return;
    }
    if (status === 500) {
      window.location.href = "/internal-error";
      return;
    }

    if (error.response && error.response.data) {
      message = error.response.data.message;
    }

    if (title) {
      window.alert(message, { title });
      return;
    }

    if (errorMessage) {
      window.alert(errorMessage);
    }
  }
}

export default new RestServiceHelper();
