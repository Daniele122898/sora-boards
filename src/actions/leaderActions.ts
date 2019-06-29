import axios, { AxiosResponse } from 'axios';
import { ThunkResult } from '../types/index';
import { User, RoleReward, Leaderboard } from '../store/index';
import { GET_GUILD_LEADERBOARD, GET_GLOBAL_LEADERBOARD } from '../constants/index';
import { ApiResponse } from './index';

export type LeaderAction = GetGuildLeaderboard | GetGlobalLeaderboard;

/*
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

export interface GetGlobalLeaderboard {
    type: GET_GLOBAL_LEADERBOARD;
    users: User[];
}

export interface GetGuildLeaderboard {
    type: GET_GUILD_LEADERBOARD;
    guildId: string;
    leaderboard: Leaderboard;

}

export const setGlobalLeaderboard = (users: User[]): GetGlobalLeaderboard => ({
    type: GET_GLOBAL_LEADERBOARD,
    users
});

export const setGuildLeaderboard = (leaderboard: Leaderboard, guildId: string): GetGuildLeaderboard => ({
    type: GET_GUILD_LEADERBOARD,
    guildId,
    leaderboard
});

export const getGlobalLeaderboard = (): ThunkResult<Promise<ApiResponse>> => {
    return async (dispatch): Promise<ApiResponse> => {
        let resp: AxiosResponse<any>

        try {
            resp = await axios.get('/api/getGlobalLeaderboard');
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

        const data: User[] = resp.data;
        dispatch(setGlobalLeaderboard(data));
        return {};
    }
}

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