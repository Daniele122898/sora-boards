import axios, { AxiosResponse } from 'axios';
import { ThunkResult } from '../types/index';
import { ApiResponse } from './index';
import { GET_SORA_STATS } from '../constants/index';
import { SoraStats } from '../store/index';

export type StatsAction = GetStats;

export interface GetStats {
    type: GET_SORA_STATS;
    stats: SoraStats;
}

export const setSoraStats = (stats: SoraStats): GetStats => ({
    type: GET_SORA_STATS,
    stats
});

export const getSoraStats = (): ThunkResult<Promise<ApiResponse>> => {
    return async (dispatch): Promise<ApiResponse> => {
        
        let resp: AxiosResponse<any>

        try {
            resp = await axios.get('/api/getSoraStats');
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

        // got stats
        const data: SoraStats = resp.data;
        console.log(resp.data);
        dispatch(setSoraStats(data));
        return {};
    }
}