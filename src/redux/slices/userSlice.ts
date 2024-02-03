import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { User } from "../model/User";
import { v4 as uuidv4 } from "uuid";
//Asynchronous functions
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("https://dummyjson.com/users");
  const simplifiedUsers: Array<User> = response.data.users.map(
    (user: User) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      age: user.age,
      phone: user.phone,
      image: user.image,
      birthDate: user.birthDate,
      blocked: false,
      address: {
        address: user.address.address,
        city: user.address.city,
        postalCode: user.address.postalCode,
      },
    })
  );
  return simplifiedUsers;
});

//Initial State

const initialState = {
  users: [] as Array<User>,
  blockedUsers: [] as Array<User>,
  status: "idle", //idle(inactivo) , loading, succeeded, failed
  error: "" as string | undefined,
};

//SLICE
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Syncrhonous reducers
    addUser: (state, action) => {
      const newUserId = uuidv4();
      state.users.push({ ...action.payload, id: newUserId });
    },
    unblockUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.blocked = false;
        state.blockedUsers = state.blockedUsers.filter((u) => u.id !== userId);
      }
    },
    blockUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.blocked = true;
        state.blockedUsers.push(user);
      }
    },
  },
  extraReducers: (builder) => {
    //Asyncrhonous reducers
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const newUser = action.payload.map((user: User) => ({
          ...user,
          id: uuidv4(),
        }));

        state.status = "succeeded";

        state.users = newUser || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
//Actions del reducer 'addUser'
export const { addUser, blockUser, unblockUser } = userSlice.actions;

//Reducer para el store
export default userSlice.reducer;

//FUNCIONES SELECTORAS DE USERS -> usarse en UseSelector
export const selectAllUsers = (state: RootState) => state.users.user.users;
export const getUsersStatus = (state: RootState) => state.users.user.status;
export const getUsersError = (state: RootState) => state.users.user.error;
export const getBlockedUsers = (state: RootState) =>
  state.users.user.blockedUsers;
