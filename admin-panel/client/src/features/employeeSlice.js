import { createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
const API_URLS = {
  getOne: "/employee",
  update: "/employee/update",
  delete: "/employee/delete",
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    data: null,
  },
  reducers: {
    getEmployee: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const getEmployeeAsync = (response) => async (dispatch) => {
  try {
    dispatch(getEmployee(response.data));
  } catch (error) {
    throw new Error(error);
  }
};

export const { getEmployee } = employeeSlice.actions;
export const employeeData = (state) => state.employee.data;
export default employeeSlice.reducer;
