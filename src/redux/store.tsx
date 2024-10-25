import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import transactionReducer from "./transactionSlice";
export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    transaction: transactionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
