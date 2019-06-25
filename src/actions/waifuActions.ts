import axios, { AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import { Waifu, UserWaifuApiResponse } from '../store/index';
import { ThunkResult } from '../types/index';
import { 
    SET_FIRST_FETCH, 
    GET_ALL_WAIFUS,
    GET_USER_WAIFUS
} from '../constants/index';

export type WaifuAction = GetAllWaifus | SetFirstFetch | GetUserWaifus;

export interface GetUserWaifus {
    type: GET_USER_WAIFUS;
    apiResponse: UserWaifuApiResponse;
    userId: string;
}

export interface GetAllWaifus {
    type: GET_ALL_WAIFUS;
    waifus: Waifu[];
}

export interface SetFirstFetch {
    type: SET_FIRST_FETCH;
    fetch: boolean;
}

export const setAllWaifus = (waifus: Waifu[]): GetAllWaifus => ({
    type: GET_ALL_WAIFUS,
    waifus
});

export const setUserWaifus = (apiResponse: UserWaifuApiResponse, userId: string): GetUserWaifus => ({
    type: GET_USER_WAIFUS,
    apiResponse,
    userId
});

export const setFirstFetch = (fetch: boolean): SetFirstFetch => ({
    type: SET_FIRST_FETCH,
    fetch
});

export interface ApiResponse {
    error?: string;
    data?: any;
}



export const getUserWaifus = (userId: string): ThunkResult<Promise<ApiResponse>> => {
    return async (dispatch): Promise<ApiResponse> => {
        let resp: AxiosResponse<any>;

        try {
            resp = await axios.get('/api/getUserWaifus/'+userId);
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
                error: resp.data != undefined && typeof resp.data == "string" ? resp.data: "Couldn't reach Sora Api"
            }
        }
        const data: UserWaifuApiResponse = resp.data;

        dispatch(setUserWaifus(data, userId));
        return {};
    }
}

export const getAllWaifus = (): ThunkResult<Promise<ApiResponse>> => {
    return async (dispatch): Promise<ApiResponse> => {
        let resp: AxiosResponse<any>;

        try {
            resp = await axios.get('/api/getAllWaifus');
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

        batch(() => {
            dispatch(setFirstFetch(true));
            dispatch(setAllWaifus(resp.data.waifus));
        });

        return {};
    }
}