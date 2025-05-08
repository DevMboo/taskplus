export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    perfil: string;
}

export interface Team {
    id: number;
    name: string;
    users?: User[];
}