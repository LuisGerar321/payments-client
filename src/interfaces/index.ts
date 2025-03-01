import { ReactNode } from "react";

export interface IProps {
  children?: ReactNode;
  // sx?: Object;
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

export enum ETransactionSection {
  SENT = "sent",
  RECEIVED = "received",
}

export interface IClientBasicInfo {
  id: number;
  name: string;
  email: string;
}
export interface ITransaction {
  id: number;
  senderId: number;
  recipientId: number;
  externalPaymentRef: string | null;
  amount: number;
  type: ETransactionType;
  status: ETransactionStatus;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  recipient: IClientBasicInfo;
  sender: IClientBasicInfo;
}
export interface IAlert {
  severity: EAlertState | null;
  message: string;
}
export interface ITransactionState {
  section: ETransactionSection;
  createATransaction: {
    step: number;
    state: boolean;
    type: ETransactionType;
    alert: IAlert;
    pendingTransactionId: number | null;
  };
  transactions: {
    sent: ITransaction[];
    received: ITransaction[];
  };
  changes: boolean;
}

export enum EAlertState {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export interface ITransactionFormData {
  amount: number;
  externalPaymentRef: string;
  recipientId: number | null;
}
