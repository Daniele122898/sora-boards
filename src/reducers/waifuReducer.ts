import {Reducer} from "redux";
import {WaifuState} from "../store";
import {WaifuAction} from '../actions/waifuActions';
import {GET_ALL_WAIFUS, GET_USER_WAIFUS, GET_WAIFU_RARITIES, SET_FIRST_FETCH} from '../constants/index';

const WaifuDefaultState: WaifuState = {
    allWaifus: [],
    userWaifus: new Map(),
    firstFetch: false,
    rarities: []
}

const reducer: Reducer<WaifuState, WaifuAction> = (state: WaifuState = WaifuDefaultState, action: WaifuAction) => {
  switch (action.type) {
    case SET_FIRST_FETCH:
      return {
        allWaifus: state.allWaifus,
        userWaifus: state.userWaifus,
        firstFetch: action.fetch,
        rarities: state.rarities,
      }
    case GET_ALL_WAIFUS:
      return {
        allWaifus: action.waifus,
        userWaifus: state.userWaifus,
        firstFetch: state.firstFetch,
        rarities: state.rarities,
      }
    case GET_USER_WAIFUS:
      return {
        allWaifus: state.allWaifus,
        firstFetch: state.firstFetch,
        userWaifus: state.userWaifus.set(action.userId, action.apiResponse),
        rarities: state.rarities,
      }
    case GET_WAIFU_RARITIES:
      return {
        allWaifus: state.allWaifus,
        firstFetch: state.firstFetch,
        userWaifus: state.userWaifus,
        rarities: action.rarities,
      }
    default:
      return state;
  }
};

export { reducer as waifuReducer };
