import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelfBalance } from "../interfaces";

const initialState: ISelfBalance = {
  balance: 0,
  sent: 0,
  received: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    updateBalance(state, action: PayloadAction<ISelfBalance>) {
      state.balance = action.payload.balance;
      state.sent = action.payload.sent;
      state.received = action.payload.received;
    },
  },
});

export const { updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
