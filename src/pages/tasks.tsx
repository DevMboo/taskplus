import { withAuth } from "@/utils/withAuth";
import { useEffect, useState } from "react";
import { KanbanBoard } from "@/components/tasks/KanbanBoard";
import { TableView } from "@/components/tasks/TableView";
import Modal from "@/components/common/Modal";
import TaskForm from "@/components/tasks/TaskForm";
import { useLoading } from '@/contexts/LoadingContext';
import { createTask, fetchTeams, fetchUsers, fetchTasks } from '@/services/taskService';
import { User } from "@/types/team";
import { Task } from "@/types/task";
import { useAlert } from "@/contexts/AlertContext";

export interface Team {
  id: number;
  name: string;
  users?: User[];
}

function TasksPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [isModalOpen, setModalOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { startLoading, stopLoading } = useLoading();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const toggleViewMode = async (mode: "kanban" | "table") => {
    if (viewMode !== mode) {
      setViewMode(mode);
      await loadData();
    }
  };
  
  const { showAlert } = useAlert();

  const loadData = async () => {
 
    try {
      const [teamsData, tasksData] = await Promise.all([
        fetchTeams(),
        fetchTasks()
      ]);
      setTeams(teamsData);
      setTasks(tasksData);
    } catch (error) {
      showAlert('danger', 'Erro ao carregar tarefas', 'Erro');
    } finally {
    
    }
  };


  const handleCreateTask = async (taskData: any) => {
    startLoading();
    try {
      const response = await createTask({
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        status: taskData.status.toUpperCase().replace(' ', '_') as 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA',
        teamId: taskData.teamId,
        responsibleId: taskData.responsibleId
      });
      
      setModalOpen(false);
      showAlert('success', 'Tarefa criada com sucesso!');
  
      await loadData();
      
      return { success: true, data: response };
    } catch (error: any) {
      console.error("Failed to create task:", error);
      
      if (error.response?.data?.code === 'business_error') {
        showAlert('danger', error.response.data.message, 'Erro de validação');
      } else {
        showAlert('danger', 'Erro interno ao criar tarefa', 'Erro');
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao criar tarefa' 
      };
    } finally {
      stopLoading();
    }
  };



  return (
    <div className="p-4">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer"
      >
        Criar nova tarefa
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-600">Quadro de tarefas</h1>

        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1 rounded-xl cursor-pointer ${
              viewMode === "kanban" ? "bg-purple-600 text-white" : "bg-white text-purple-600"
            }`}
            onClick={() => toggleViewMode("kanban")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-columns3-icon lucide-columns-3"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
            </svg>
          </button>
          
          <button
            className={`px-3 py-1 rounded-xl cursor-pointer ${
              viewMode === "table" ? "bg-purple-600 text-white" : "bg-white text-purple-600"
            }`}
            onClick={() => toggleViewMode("table")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-list-collapse-icon lucide-list-collapse"
            >
              <path d="m3 10 2.5-2.5L3 5" />
              <path d="m3 19 2.5-2.5L3 14" />
              <path d="M10 6h11" />
              <path d="M10 12h11" />
              <path d="M10 18h11" />
            </svg>
          </button>
        </div>
      </div>

      <div>
      {tasks.length > 0 ? (
        viewMode === "kanban" ? 
          <KanbanBoard tasks={tasks}   onRefresh={handleRefresh} /> : 
          <TableView tasks={tasks}   onRefresh={handleRefresh} />
      ) : (
        <p>Nenhuma tarefa criada</p>
      )}
    </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Cadastrar Nova Tarefa"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          teams={teams.map(team => ({
            id: team.id,
            name: team.name,
            users: team.users || []
          }))}
        />
      </Modal>
    </div>
  );
}

export default withAuth(TasksPage);