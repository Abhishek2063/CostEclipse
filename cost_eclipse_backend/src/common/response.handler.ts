import { Response } from "express";

interface ApiResponse {
  success: boolean;
  status_code: number;
  message: string;
  data?: any;
}

export const sendResponse = (
  res: Response,
  status_code: number,
  success: boolean,
  message: string,
  data: any = null
) => {
  const response: ApiResponse = {
    success,
    status_code,
    message,
    data,
  };
  return res.status(status_code).json(response);
};
