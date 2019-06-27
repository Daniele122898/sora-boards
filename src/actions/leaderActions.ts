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

~~(("249259087496216576" / 4194304) % totalShards);
const shardId = (BigInt(249259087496216576) >> BigInt(22)) % BigInt(400);
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
        
        let resp: AxiosResponse<any>

        try {
            resp = await axios.get('/api/getLeaderboard/'+guildId);
        } catch (error) {
            return {
                error: "Couldn't reach Sora Api"
            }
        }

        if (resp == undefined || resp.data == undefined) {
            return {
                error: "Couldn't reach backend... You shouldn't see this website online lol."
            };
        }

        if (resp.status !== 200) {
            return {
                error: resp.data != undefined ? resp.data: "Couldn't reach Sora Api"
            }
        }

        const data: GuildLeaderboardApiResponse = resp.data;
        const leaderboard: Leaderboard = {
            users: data.ranks,
            roleRewards: data.roleRewards,
            guildImage: data.avatarUrl,
            guildName: data.guildName
        }

        dispatch(setGuildLeaderboard(leaderboard, guildId));

        return {};
    }
}