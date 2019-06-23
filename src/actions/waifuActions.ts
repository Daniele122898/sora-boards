import axios, { AxiosResponse } from 'axios';
import { GET_ALL_WAIFUS } from '../constants';
import { Waifu } from '../store/index';
import { ThunkResult } from '../types/index';
import { batch } from 'react-redux';
import { SET_FIRST_FETCH } from '../constants/index';

export type WaifuAction = GetAllWaifus | SetFirstFetch;

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

export const setFirstFetch = (fetch: boolean): SetFirstFetch => ({
    type: SET_FIRST_FETCH,
    fetch
});

export interface ApiResponse {
    error?: string;
    data?: any;
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