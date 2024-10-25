import { ReactNode } from "react";

export interface IProps {
  children?: ReactNode;
  sx?: Object;
}

export interface IMailerSendEmail {
  to: string;
  subject: string;
  text?: string;
  html?: any;
}

export enum EStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export enum ETransactionType {
  ADD = "add",
  PAY = "pay",
  EXTERNAL_PAYMENT = "external_payment",
}

export enum ETransactionStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
}

export interface IAuthClient {
  email: string;
  citizenIdentityDocumentNumber: string;
}

export interface IRequest extends Request {
  session?: any;
}

export interface ISelfTransactions {
  sent: any[];
  received: any[];
}
export interface ISelfBalance {
  balance: number;
  sent: number;
  received: number;
}
