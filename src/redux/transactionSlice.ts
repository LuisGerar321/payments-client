import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETransactionSection, ITransaction, ITransactionState } from "../interfaces";

const initialState: ITransactionState = {
  section: ETransactionSection.RECEIVED,
  transactions: {
    sent: [],
    received: [],
  },
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
  },
});

export const { updateTransactionList, updateTransactionSection } = transactionsSlice.actions;
export default transactionsSlice.reducer;
