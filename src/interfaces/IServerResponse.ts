import { DetailedError } from "../utils/error-response-types";

export interface IServerResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
  url?: string;
  error?: string;
  errors?: DetailedError[];
}
