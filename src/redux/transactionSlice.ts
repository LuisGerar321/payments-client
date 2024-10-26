import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EAlertState, ETransactionSection, ETransactionType, IAlert, ITransaction, ITransactionState } from "../interfaces";

const initialState: ITransactionState = {
  section: ETransactionSection.RECEIVED,
  createATransaction: {
    step: 1,
    state: false,
    type: ETransactionType.ADD,
    pendingTransactionId: null,
    alert: {
      severity: null,
      message: "",
    },
  },
  transactions: {
    sent: [],
    received: [],
  },
  changes: false,
};

const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    updateTransactionList(state, action: PayloadAction<{ sent: ITransaction[]; received: ITransaction[] }>) {
      state.transactions.sent = action.payload.sent;
      state.transactions.received = action.payload.received;
    },
    updateTransactionSection(state, action: PayloadAction<ETransactionSection>) {
      state.section = action.payload;
    },

    updateTransactionCreate(state, action: PayloadAction<{ state: boolean; type: ETransactionType }>) {
      state.createATransaction.state = action.payload.state;
      state.createATransaction.type = action.payload.type;
    },

    updateTransactionCreateAlert(state, action: PayloadAction<IAlert>) {
      state.createATransaction.alert.severity = action.payload.severity;
      state.createATransaction.alert.message = action.payload.message;
    },

    updateTransactionCreatePendingId(state, action: PayloadAction<number>) {
      state.createATransaction.pendingTransactionId = action.payload;
    },
    updateTransactionCreateStep(state, action: PayloadAction<number>) {
      state.createATransaction.step = action.payload;
    },

    changes(state) {
      state.changes = !state.changes;
    },

    resetTransactionState(state) {
      const currentSection = state.section;
      Object.assign(state, initialState, { section: currentSection });
    },
  },
});

export const {
  updateTransactionList,
  updateTransactionSection,
  updateTransactionCreate,
  updateTransactionCreateAlert,
  updateTransactionCreatePendingId,
  updateTransactionCreateStep,
  resetTransactionState,
  changes,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
