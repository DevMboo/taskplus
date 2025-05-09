import { useEffect, useState } from 'react';
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

interface TableViewProps {
  tasks: Task[];
  onRefresh?: () => void; // Adicionado para permitir atualização externa
}

export function TableView({ tasks: initialTasks, onRefresh }: TableViewProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragStatus, setCurrentDragStatus] = useState<TaskStatusDisplay | null>(null);

  // Sincroniza o estado local quando as props mudam
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
    
    // Salva o estado anterior para rollback em caso de erro
    const originalTasks = tasks;
    
    try {
      // Atualização otimista
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, status: newApiStatus } : task
        )
      );

      await api.patch(`/tasks/${taskId}/status?novoStatus=${newApiStatus}`);
      
      // Chama refresh se necessário
      if (onRefresh) onRefresh();
    } catch (error) {
      // Rollback em caso de erro
      setTasks(originalTasks);
      console.error("Erro ao atualizar status:", error);
      // Aqui você poderia adicionar um toast de erro
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const tasksByStatus = ALL_STATUSES.reduce((acc, displayStatus) => {
    const apiStatus = displayToApiStatus[displayStatus];
    acc[displayStatus] = tasks.filter(task => task.status === apiStatus);
    return acc;
  }, {} as Record<TaskStatusDisplay, Task[]>);

  return (
    <div className="space-y-6">
      {ALL_STATUSES.map((status) => (
        <div 
          key={status}
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
          onDragEnter={() => handleDragEnter(status)}
          onDragLeave={handleDragLeave}
          className={`rounded-xl shadow border border-neutral-100 overflow-hidden transition-all ${
            currentDragStatus === status ? 'ring-2 ring-purple-500' : ''
          }`}
        >
          <div className={`px-4 py-2 font-bold text-lg ${statusColors[status]}`}>
            {status} ({tasksByStatus[status].length})
          </div>

          <div>
            {tasksByStatus[status].map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center justify-between px-4 py-3 border-t border-t-neutral-100 hover:bg-neutral-50 bg-white ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              >
                <div className="flex-1">
                  <div className="font-semibold">{task.title}</div>
                  <div className="text-sm text-neutral-500">
                    Responsável: {task.responsibleId?.name || 'Não atribuído'}
                  </div>
                </div>
                <div className="text-sm text-neutral-600">
                  {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}

            {tasksByStatus[status].length === 0 && (
              <div className="px-4 py-3 text-neutral-400 italic">Sem tarefas</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}