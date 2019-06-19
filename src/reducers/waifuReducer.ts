import { Reducer } from "redux";
import { WaifuState } from "../store";

const WaifuDefaultState: WaifuState = {
    allWaifus: [],
    userWaifus: new Map(),
    firstFetch: false
}

const reducer: Reducer<WaifuState> = (state: WaifuState = WaifuDefaultState, action: {}) => {
  switch (action/*.type*/) {
    default:
      return state;
  }
};

export { reducer as waifuReducer };