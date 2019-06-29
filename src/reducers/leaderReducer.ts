import { Reducer } from "redux";
import { LeaderState } from "../store";
import { LeaderAction } from '../actions/leaderActions';
import { GET_GUILD_LEADERBOARD, GET_GLOBAL_LEADERBOARD } from '../constants/index';

const LeaderDefaultState: LeaderState = {
    leaderboards: new Map(),
    globalLeader: []
}

const reducer: Reducer<LeaderState, LeaderAction> = (state: LeaderState = LeaderDefaultState, action: LeaderAction) => {
  switch (action.type) {
    case GET_GUILD_LEADERBOARD: 
      return {
        globalLeader: state.globalLeader,
        leaderboards: state.leaderboards.set(action.guildId, action.leaderboard)
      }
    case GET_GLOBAL_LEADERBOARD:
      return {
        leaderboards: state.leaderboards,
        globalLeader: action.users
      }
    default:
      return state;
  }
};

export { reducer as leaderReducer };