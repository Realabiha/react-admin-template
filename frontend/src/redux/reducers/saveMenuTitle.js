import {SAVE_MENU_TITLE} from '../actionType'
const initState = '';
export default function saveMenuTitle(preState = initState, action){
  const {type, data} = action;
  switch (type) {
    case SAVE_MENU_TITLE:
      return data;
    default:
      return initState;
  }
}