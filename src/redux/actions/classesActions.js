import custAxios from "../../configs/axiosConfig";
import { classesConstants } from "../constants/classesConstant";


export const getClasses = () => async (dispatch) => {
  dispatch({
    type: classesConstants.GET_CLASSES_REQUEST,
  });
  try {
    const res = await custAxios.get("classes/");

    if (res?.status === 200) {
      dispatch({
        type: classesConstants.GET_CLASSES_SUCCESS,
        payload: res?.data,
      });

      return "success";
    }
  } catch (error) {
    dispatch({
      type: classesConstants.GET_CLASSES_FAILURE,
    });
  }
};

