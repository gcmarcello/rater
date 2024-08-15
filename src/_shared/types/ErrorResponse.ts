interface ErrorDetail {
  path: string | string[];
  message: string;
}

export class ErrorResponse {
  error: ErrorDetail | ErrorDetail[];
  status?: number = 400;
  refreshSession?: boolean = false;

  constructor(error: ErrorDetail, status?: number) {
    this.error = error;
    this.status = status;
  }
}
