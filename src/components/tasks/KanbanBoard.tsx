import { useState, useEffect } from 'react';
import { Task } from "@/types/task";
import api from '@/services/api';

type TaskStatusDisplay = 'Pendente' | 'Em andamento' | 'Concluída';
type TaskStatusAPI = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';

const statusColors: Record<TaskStatusDisplay, string> = {
  'Pendente': "bg-yellow-100 text-yellow-800",
  'Em andamento': "bg-blue-100 text-blue-800",
  'Concluída': "bg-green-100 text-green-800",
};

const ALL_STATUSES: TaskStatusDisplay[] = ['Pendente', 'Em andamento', 'Concluída'];

interface KanbanBoardProps {
  tasks: Task[];
  onRefresh?: () => void;
  onTaskClick?: (taskId: number) => void;
}

export function KanbanBoard({ tasks: initialTasks, onRefresh, onTaskClick }: KanbanBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragStatus, setCurrentDragStatus] = useState<TaskStatusDisplay | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const displayToApiStatus: Record<TaskStatusDisplay, TaskStatusAPI> = {
    'Pendente': 'PENDENTE',
    'Em andamento': 'EM_ANDAMENTO',
    'Concluída': 'CONCLUIDA'
  };

  const toApiStatus = (displayStatus: TaskStatusDisplay): TaskStatusAPI => {
    return displayToApiStatus[displayStatus];
  };

  const getTasksByStatus = (displayStatus: TaskStatusDisplay) => {
    const apiStatus = displayToApiStatus[displayStatus];
    return tasks.filter(task => task.status === apiStatus);
  };

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setCurrentDragStatus(null);
  };

  const handleDragEnter = (status: TaskStatusDisplay) => {
    setCurrentDragStatus(status);
  };

  const handleDragLeave = () => {
    setCurrentDragStatus(null);
  };

  const handleDrop = async (e: React.DragEvent, newDisplayStatus: TaskStatusDisplay) => {
    e.preventDefault();
    setIsDragging(false);
    setCurrentDragStatus(null);
    
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const newApiStatus = toApiStatus(newDisplayStatus);

    if (!taskId) return;
    
    const originalTasks = tasks;
    
    try {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, status: newApiStatus } : task
        )
      );

      await api.patch(`/tasks/${taskId}/status?novoStatus=${newApiStatus}`);
      
      if (onRefresh) onRefresh();
    } catch (error) {
      setTasks(originalTasks);
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {ALL_STATUSES.map((status) => {
        const statusTasks = getTasksByStatus(status);
  
        return (
          <div 
            key={status}
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(status)}
            onDragLeave={handleDragLeave}
            className={`rounded-lg shadow border border-neutral-200 overflow-hidden transition-all ${
              currentDragStatus === status ? 'ring-2 ring-purple-500 scale-[1.02]' : ''
            }`}
          >
            <div className={`px-4 py-2 font-bold text-center ${statusColors[status]}`}>
              {status} ({statusTasks.length})
            </div>

            <div className="bg-white min-h-[200px] h-full p-2 space-y-2">
              {statusTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onClick={() => onTaskClick?.(task.id)}
                  onDragEnd={handleDragEnd}
                  className={`p-3 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow bg-white ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                >
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-neutral-500">
                    Responsável: {task.responsibleId?.name || 'Não atribuído'}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {formatDate(task.dueDate)}
                  </div>
                </div>
              ))}

              {statusTasks.length === 0 && (
                <p className="text-sm text-neutral-500 italic">Sem tarefas</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}