import custAxios from "../../configs/axiosConfig";
import { sectionConstants } from "../constants/sectionConstants";


export const getSections = () => async (dispatch) => {
  dispatch({
    type: sectionConstants.GET_SECTION_REQUEST,
  });
  try {
    const res = await custAxios.get("sections/");

    if (res?.status === 200) {
      dispatch({
        type: sectionConstants.GET_SECTION_SUCCESS,
        payload: res?.data,
      });

      return "success";
    }
  } catch (error) {
    dispatch({
      type: sectionConstants.GET_SECTION_FAILURE,
    });
  }
};

