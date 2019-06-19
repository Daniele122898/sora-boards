import { Reducer } from "redux";
import { LeaderState } from "../store";

const LeaderDefaultState: LeaderState = {
    leaderboards: new Map(),
    globalLeader: [],
    firstFetch: false
}

const reducer: Reducer<LeaderState> = (state: LeaderState = LeaderDefaultState, action: {}) => {
  switch (action/*.type*/) {
    default:
      return state;
  }
};

export { reducer as leaderReducer };