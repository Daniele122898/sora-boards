import { Reducer } from "redux";
import { SoraStats } from "../store";
import { GET_SORA_STATS } from '../constants/index';
import { StatsAction } from '../actions/statsActions';

const StatsDefaultState: SoraStats = {
  uptime: "0",
  messagesReceived: "0",
  commandsExecuted: 0,
  ping: 0,
  guildCount: 0,
  userCount: 0,
  shardNum: 0,
  version: "0"
}

const reducer: Reducer<SoraStats, StatsAction> = (state: SoraStats = StatsDefaultState, action: StatsAction) => {
  switch (action.type) {
    case GET_SORA_STATS: 
      return {
        ...action.stats
      }
    default:
      return state;
  }
};

export { reducer as statsReducer };