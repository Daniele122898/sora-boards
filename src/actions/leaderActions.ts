import axios, { AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import { ThunkResult } from '../types/index';
import { User, RoleReward, Leaderboard } from '../store/index';
import { GET_GUILD_LEADERBOARD } from '../constants/index';
import { ApiResponse } from './index';

export type LeaderAction = GetGuildLeaderboard;

/*
func getShardId(guildId string)(int64){
	i,_ := strconv.ParseInt(guildId, 10, 64)
	shard := (i>>22) %shardNum
	return shard
}

func getPort(guildId string)string{
	port := defPort+getShardId(guildId)
	return strconv.FormatInt(port, 10)
}
*/

export interface GuildLeaderboardApiResponse {
    success: boolean;
    avatarUrl: string; 
    guildName: string; 
    ranks: User[];
    roleRewards: RoleReward[];
}

export interface GetGuildLeaderboard {
    type: GET_GUILD_LEADERBOARD;
    guildId: string;
    leaderboard: Leaderboard;

}

export const setGuildLeaderboard = (leaderboard: Leaderboard, guildId: string): GetGuildLeaderboard => ({
    type: GET_GUILD_LEADERBOARD,
    guildId,
    leaderboard
});

export const getGuildLeaderboard = (guildId: string): ThunkResult<Promise<ApiResponse>> => {
    return async (dispatch): Promise<ApiResponse> => {
        
        
        return {};
    }
}