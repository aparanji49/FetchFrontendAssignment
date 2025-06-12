import api from './axiosInstance';


export const login = (name: string, email: string) =>{
    return api.post(
        '/auth/login', 
        {name, email},
    );
};

export const logout = () => {
    return api.post(
        '/auth/logout'
    );
};