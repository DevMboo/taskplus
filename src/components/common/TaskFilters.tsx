import React, { useState } from 'react';
import { TaskStatus } from '@/types/task';
import { User } from '@/types/team';
import { fetchTasksByFilter } from '@/services/taskService';
import { useAlert } from '@/contexts/AlertContext';

interface TaskFiltersProps {
  users: User[];
  onFilter: (tasks: any[]) => void;
  onReset: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ users, onFilter, onReset }) => {
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [responsibleId, setResponsibleId] = useState<number | ''>('');
  const { showAlert } = useAlert();

  const handleFilter = async () => {
    try {
      const filteredTasks = await fetchTasksByFilter(
        status as TaskStatus || undefined,
        responsibleId as number || undefined
      );
      onFilter(filteredTasks);
    } catch (error) {
      showAlert('danger', 'Erro ao filtrar tarefas', 'Erro');
    }
  };

  const handleReset = () => {
    setStatus('');
    setResponsibleId('');
    onReset();
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none focus:shadow-outline-purple transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          >
            <option value="">Todos</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDA">Concluída</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
          <select
            value={responsibleId}
            onChange={(e) => setResponsibleId(Number(e.target.value) || '')}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none focus:shadow-outline-purple transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          >
            <option value="">Todos</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end space-x-2">
          <button
            onClick={handleFilter}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Filtrar
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;