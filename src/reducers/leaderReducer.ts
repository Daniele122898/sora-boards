import { Reducer } from "redux";
import { LeaderState } from "../store";
import { LeaderAction } from '../actions/leaderActions';
import { GET_GUILD_LEADERBOARD } from '../constants/index';

const LeaderDefaultState: LeaderState = {
    leaderboards: new Map(),
    globalLeader: [],
    firstFetch: false
}

const reducer: Reducer<LeaderState, LeaderAction> = (state: LeaderState = LeaderDefaultState, action: LeaderAction) => {
  switch (action.type) {
    case GET_GUILD_LEADERBOARD: 
      return {
        globalLeader: state.globalLeader,
        firstFetch: state.firstFetch,
        leaderboards: state.leaderboards.set(action.guildId, action.leaderboard)
      }
    default:
      return state;
  }
};

export { reducer as leaderReducer };