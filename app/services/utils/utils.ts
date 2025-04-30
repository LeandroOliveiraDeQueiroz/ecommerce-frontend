import axios from 'axios';
import type { IServiceError } from '~/types';

export const handleServiceError = (error: unknown): IServiceError => {
  const serviceError: Partial<IServiceError> = {
    error: true,
    message: 'Erro inesperado. Tente novamente',
  };

  if (error instanceof axios.AxiosError && error.response?.data) {
    serviceError.message = error.response.data;
  }

  return serviceError as IServiceError;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIServiceError = (error: any): error is IServiceError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    'error' in error &&
    typeof error.error === 'boolean'
  );
};
