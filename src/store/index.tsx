export interface ApplicationState {
    auth: AuthState
}

export interface AuthState {
    uid?: string;
}