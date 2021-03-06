export interface ApplicationState {
    waifuState: WaifuState;
    leaderState: LeaderState;
    soraStats: SoraStats;
}

export interface SoraStats {
     uptime: string; 
     messagesReceived: string; 
     commandsExecuted: number; 
     ping: number; 
     guildCount: number; 
     userCount: number; 
     shardNum: number; 
     version: string; 
}

export interface WaifuState {
    allWaifus: Waifu[];
    userWaifus: Map<string, UserWaifuApiResponse>;
    firstFetch: boolean;
    rarities: WaifuRarity[];
}

export interface WaifuRarity {
    name: string;
    value: number;
}

export interface UserWaifuApiResponse {
    username: string;
    avatarUrl: string;
    waifus: Waifu[];
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
    count?: number;
}

export interface Leaderboard {
    users: User[];
    roleRewards: RoleReward[];
    guildName: string;
    guildImage: string;
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
