import { Reducer } from "redux";
import { WaifuState } from "../store";
import { WaifuAction } from '../actions/waifuActions';
import { SET_FIRST_FETCH, GET_ALL_WAIFUS, GET_USER_WAIFUS } from '../constants/index';

const WaifuDefaultState: WaifuState = {
    allWaifus: [],
    userWaifus: new Map(),
    firstFetch: false
}

const reducer: Reducer<WaifuState, WaifuAction> = (state: WaifuState = WaifuDefaultState, action: WaifuAction) => {
  switch (action.type) {
    case SET_FIRST_FETCH:
      return {
        allWaifus: state.allWaifus,
        userWaifus: state.userWaifus,
        firstFetch: action.fetch
      }
    case GET_ALL_WAIFUS:
      return {
        allWaifus: action.waifus,
        userWaifus: state.userWaifus,
        firstFetch: state.firstFetch
      }
    case GET_USER_WAIFUS:
      return {
        allWaifus: state.allWaifus,
        firstFetch: state.firstFetch,
        userWaifus: state.userWaifus.set(action.userId, action.apiResponse)
      }
    default:
      return state;
  }
};

export { reducer as waifuReducer };