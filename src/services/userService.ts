import api from './api';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  teamId: number,
  perfil: string
): Promise<boolean> => {
  try {
    const response = await api.post('/users', {
      name,
      email,
      password,
      teamId,
      perfil
    });

    return true;
  } catch (error: any) {
    throw error;
  }
};