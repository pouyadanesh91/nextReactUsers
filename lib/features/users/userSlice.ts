import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createUser, deleteUser, fetchUsers, updateUser } from "./usersApi";
import UserListItem from "./userListItem";

export interface UserSliceState {
    value: UserListItem[];
    status: "idle" | "loading" | "failed";
}
  
const initialState: UserSliceState = {
    value: [],
    status: "idle",
};

export const userSlice = createAppSlice({
    name: "counter",
  initialState,
  reducers: (create) => ({
    reload: create.asyncThunk(
        async (page: number) => {
          const response = await fetchUsers(page);
          // The value we return becomes the `fulfilled` action payload
          return response.data;
        },
        {
          pending: (state) => {
            state.status = "loading";
          },
          fulfilled: (state, action) => {
            state.status = "idle";
            state.value = action.payload;
          },
          rejected: (state) => {
            state.status = "failed";
          },
        },
      ),
      createNewUser: create.asyncThunk(
        async (user: {name: string, job: string}) => {
          const response = await createUser(user.name, user.job);
          // The value we return becomes the `fulfilled` action payload
          return response;
        },
        {
          pending: (state) => {
            state.status = "loading";
          },
          fulfilled: (state, action) => {
            state.status = "idle";
          },
          rejected: (state) => {
            state.status = "failed";
          },
        },
      ),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    updateOldUser: create.asyncThunk(
        async (user: {name: string, job: string}) => {
          const response = await updateUser(user.name, user.job);
          // The value we return becomes the `fulfilled` action payload
          return response.data;
        },
        {
          pending: (state) => {
            state.status = "loading";
          },
          fulfilled: (state, action) => {
            state.status = "idle";
            const myIndex = state.value.findIndex(f => f.id === action.payload.id);
            state.value.splice(myIndex, 1, action.payload);
          },
          rejected: (state) => {
            state.status = "failed";
          },
        },
      ),
    deleteOldUser: create.asyncThunk(
        async (id: number) => {
          const response = await deleteUser(id);
          // The value we return becomes the `fulfilled` action payload
          return response.data;
        },
        {
          pending: (state) => {
            state.status = "loading";
          },
          fulfilled: (state, action) => {
            state.status = "idle";
            const myIndex = state.value.findIndex(f => f.id === action.payload.id);
            state.value.splice(myIndex, 1, );
          },
          rejected: (state) => {
            state.status = "failed";
          },
        },
      ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUsers: (counter) => counter.value,
    selectStatus: (counter) => counter.status,
  },
});

// Action creators are generated for each case reducer function.
export const { reload, createNewUser, updateOldUser, deleteOldUser } =
  userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUsers, selectStatus } = userSlice.selectors;
