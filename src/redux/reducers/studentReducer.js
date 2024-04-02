import { studentsConstants } from "../constants/studentConstants";




export const studentReducer = (
  state = {
    students:[],
   loading:false
  },
  action
) => {
  switch (action.type) {
    case studentsConstants.GET_ALL_STUDENTS_REQUEST: 
   console.log(action.payload);
      return {
        ...state,
        loading: true,
      };
      
      case studentsConstants.GET_ALL_STUDENTS_SUCCESS: 
      return {
        ...state,
        loading: false,
        students:action.payload
      };
 
    case studentsConstants.GET_ALL_STUDENTS_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    

    default: // ? defaaaalt case yk...!
      return state;
  }
};