interface ErrorDetail {
  path: string | string[];
  message: string;
}

export class ErrorResponse {
  error: ErrorDetail | ErrorDetail[];
  status?: number = 400;

  constructor(error: ErrorDetail, status?: number) {
    this.error = error;
    this.status = status;
  }
}
