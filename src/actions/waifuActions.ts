import axios, {AxiosResponse} from 'axios';
import {batch} from 'react-redux';
import {UserWaifuApiResponse, Waifu, WaifuRarity} from '../store/index';
import {ThunkResult} from '../types/index';
import {ApiResponse} from './index';
import {GET_ALL_WAIFUS, GET_USER_WAIFUS, GET_WAIFU_RARITIES, SET_FIRST_FETCH} from '../constants/index';

export type WaifuAction = GetAllWaifus | SetFirstFetch | GetUserWaifus | GetRarities;

export interface GetRarities {
    type: GET_WAIFU_RARITIES;
    rarities: WaifuRarity[];
}

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

export const setWaifuRarities = (rarities: WaifuRarity[]): GetRarities => ({
    type: GET_WAIFU_RARITIES,
    rarities
});

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

export const getWaifuRarities = (): ThunkResult<Promise<ApiResponse>> => {
    return async (dispatch): Promise<ApiResponse> => {
        let resp: AxiosResponse<any>;

        try {
            resp = await axios.get('/api/getRarities');
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

        dispatch(setWaifuRarities(resp.data));

        return {};
    }
}

export const getAllWaifus = (): ThunkResult<Promise<ApiResponse>> => {
    return async (dispatch): Promise<ApiResponse> => {
        let resp: AxiosResponse<any>;
        console.log("HELLO :D");
        try {
            resp = await axios.get('/api/getAllWaifus');
        } catch (error) {
            console.error(error);
            return {
                error: "Couldn't reach Sora Api"
            }
        }

        if (resp == undefined || resp.data == undefined) {
            console.error("Error fetching all waifus. Data undefined")
            return {
                error: "Couldn't reach backend... You shouldn't see this website online lol."
            };
        }

        if (resp.status !== 200) {
            console.error("Error fetching all waifus. Status came back as not ok!")
            return {
                error: resp.data != undefined ? resp.data: "Couldn't reach Sora Api"
            }
        }

        batch(() => {
            dispatch(setFirstFetch(true));
            dispatch(setAllWaifus(resp.data));
        });

        return {};
    }
}
