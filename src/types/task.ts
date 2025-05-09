export type TaskStatus = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  dueDate: string;
  team: {
    id: number;
    name: string;
  };
  responsibleId: User; // Agora usando a interface User
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  perfil: string;
}
