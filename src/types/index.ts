// Validators Related Types 
export interface LoginInput {
    email: string,
    password: string,
}


// Redux Related Types  
export default interface AuthState {
    isAuthenticated: boolean;
    token: string | null
}


export interface ApiResponse {
    data?: any;
    message?: string;
}