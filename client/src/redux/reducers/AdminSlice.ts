import { createSlice} from "@reduxjs/toolkit";
import { RootState as DefaultRootState } from "../store";

interface AdminState {
  isModalOpen: boolean;
}

interface RootState extends DefaultRootState {
  admin: AdminState;
}

const initialState: AdminState = {
  isModalOpen: false,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = AdminSlice.actions;

export const selectAdmin = (state: RootState) => state.admin.isModalOpen;

export const AdminReducer = AdminSlice.reducer;

export default AdminSlice;
