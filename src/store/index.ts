export interface ApplicationState {
    waifuState: WaifuState;
    leaderState: LeaderState;
}

export interface WaifuState {
    allWaifus: Waifu[];
    userWaifus: Map<string, UserWaifuApiResponse>;
    firstFetch: boolean;
}

export interface UserWaifuApiResponse {
    success: boolean;
    username: string;
    avatarUrl: string;
    waifus: Waifu[];
}

export interface LeaderState {
    globalLeader: User[];
    leaderboards: Map<string, Leaderboard>;
    firstFetch: boolean;
}

export interface Waifu {
    name: string;
    imageUrl: string;
    rarity: number;
    id: string;
    count?: number;
}

export interface Leaderboard {
    users: User[];
    roleRewards: RoleReward[];
}

export interface RoleReward {
    levelReq: number;
    color: string;
    name: string;
}

export interface User {
    rank: number;
    avatarUrl: string;
    name: string;
    discrim: string;
    exp: number;
}

