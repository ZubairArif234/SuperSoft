import { classesConstants } from "../constants/classesConstant";

export const classesReducer = (
  state = {
    classes:[],
   loading:false
  },
  action
) => {
  switch (action.type) {
    case classesConstants.GET_CLASSES_REQUEST: 
   console.log(action.payload);
      return {
        ...state,
        loading: true,
      };
      
      case classesConstants.GET_CLASSES_SUCCESS: 
      return {
        ...state,
        loading: false,
        classes:action.payload
      };
 
    case classesConstants.GET_CLASSES_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    

    default: // ? defaaaalt case yk...!
      return state;
  }
};