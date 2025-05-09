import api from './api';
import { Task, TaskStatus } from '@/types/task';

export type TaskCreateData = {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  teamId: number;
  responsibleId: number;
};

export const fetchTeams = async () => {
    const response = await api.get('/teams', { withCredentials: true });
    return response.data;
};

export const fetchUsers = async () => {
    const response = await api.get('/users', { withCredentials: true });
    return response.data;
};

export type TaskUpdateData = Partial<TaskCreateData>;

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get('/tasks', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

export const fetchTasksByFilter = async (status?: TaskStatus, responsibleId?: number): Promise<Task[]> => {
  try {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (responsibleId) params.append('responsibleId', responsibleId.toString());
    
    const response = await api.get(`/tasks/filter?${params.toString()}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered tasks:', error);
    throw new Error('Failed to fetch filtered tasks');
  }
};

export const fetchTaskById = async (id: number): Promise<Task> => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw new Error(`Failed to fetch task ${id}`);
  }
};

export const createTask = async (taskData: TaskCreateData): Promise<Task> => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};

export const updateTask = async (id: number, taskData: TaskUpdateData): Promise<Task> => {
  try {
    const response = await api.patch(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw new Error(`Failed to update task ${id}`);
  }
};

export const updateTaskStatus = async (id: number, status: TaskStatus): Promise<Task> => {
  try {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating task status ${id}:`, error);
    throw new Error(`Failed to update task status ${id}`);
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw new Error(`Failed to delete task ${id}`);
  }
};