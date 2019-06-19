export interface ApplicationState {
    waifuState: WaifuState;
    leaderState: LeaderState;
}

export interface WaifuState {
    allWaifus: Waifu[];
    userWaifus: Map<string, Waifu[]>;
}

export interface LeaderState {
    globalLeader: User[];
    leaderboards: Map<string, Leaderboard>;
}

export interface Waifu {
    name: string;
    imageUrl: string;
    rarity: number;
    id: string;
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

