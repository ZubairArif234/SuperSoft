import custAxios from "../../configs/axiosConfig";
import {
  successMessage,
  errorMessage,
  warningMessage,
} from "../../services/helpers";
import { studentsConstants } from "../constants/studentConstants";

export const getAll = () => async (dispatch) => {
  dispatch({
    type: studentsConstants.GET_ALL_STUDENTS_REQUEST,
  });
  try {
    const res = await custAxios.get();

    if (res?.status === 200) {
      dispatch({
        type: studentsConstants.GET_ALL_STUDENTS_SUCCESS,
        payload: res?.data,
      });

      return "success";
    }
  } catch (error) {
    dispatch({
      type: studentsConstants.GET_ALL_STUDENTS_FAILURE,
    });
  }
};

export const addStudent = (values) => async (dispatch) => {
  dispatch({
    type: studentsConstants.ADD_STUDENT_REQUEST,
  });
  try {
    const res = await custAxios.post("/",values);

    if (res?.status === 200) {
      dispatch({
        type: studentsConstants.ADD_STUDENT_SUCCESS,
        payload: res?.data,
      });

    }
    return "success";
  } catch (error) {
    dispatch({
      type: studentsConstants.ADD_STUDENT_FAILURE,
    });
  }
};

export const updateStudent = (values,id) => async (dispatch) => {
  dispatch({
    type: studentsConstants.UPDATE_STUDENT_REQUEST,
  });
  try {
    const res = await custAxios.put(`/${id}`,values);

    if (res?.status === 200) {
      dispatch({
        type: studentsConstants.UPDATE_STUDENT_SUCCESS,
        payload: res?.data,
      });

      return "success";
    }
  } catch (error) {
    dispatch({
      type: studentsConstants.UPDATE_STUDENT_FAILURE,
    });
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  dispatch({
    type: studentsConstants.DELETE_STUDENT_REQUEST,
  });
  try {
    const res = await custAxios.delete(`/${id}`);

    if (res?.status === 200) {
      dispatch({
        type: studentsConstants.DELETE_STUDENT_SUCCESS,
        payload: res?.data,
      });

      return "success";
    }
  } catch (error) {
    dispatch({
      type: studentsConstants.DELETE_STUDENT_FAILURE,
    });
  }
};
