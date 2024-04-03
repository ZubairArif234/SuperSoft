
import { sectionConstants } from "../constants/sectionConstants";

export const sectionReducer = (
  state = {
    sections:[],
   loading:false
  },
  action
) => {
  switch (action.type) {
    case sectionConstants.GET_SECTION_REQUEST: 
 
      return {
        ...state,
        loading: true,
      };
      
      case sectionConstants.GET_SECTION_SUCCESS: 
      return {
        ...state,
        loading: false,
        sections:action.payload
      };
 
    case sectionConstants.GET_SECTION_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    

    default: // ? defaaaalt case yk...!
      return state;
  }
};