export enum ResponseStatus {
  Success = 'success',
  Error = 'error',
  Pending = 'pending'
}

interface SuccessfullResponse<T> {
  status: ResponseStatus.Success;
  data: T;
}

interface ErrorResponse {
  status: ResponseStatus.Error;
}

export type ChainResponse<T> = SuccessfullResponse<T> | ErrorResponse;
