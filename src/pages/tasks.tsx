
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

export interface Team {
  id: number;
  name: string;
  users?: User[];
}

function TasksPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [isModalOpen, setModalOpen] = useState(false);
  const [teams, setTeams] = useState<Array<{id: number, name: string}>>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const loadData = async () => {
      startLoading();
      try {
        const [teamsData, tasksData] = await Promise.all([
          fetchTeams(),
          fetchTasks()
        ]);
        setTeams(teamsData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        stopLoading();
      }
    };

    loadData();
  }, []);

  const handleCreateTask = async (taskData: any) => {
    startLoading();
    try {
      await createTask({
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        status: taskData.status.toUpperCase().replace(' ', '_') as 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA',
        teamId: taskData.teamId,
        responsibleId: taskData.responsibleId
      });
      setModalOpen(false);
      stopLoading();
    } catch (error) {
      console.error("Failed to create task:", error);
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
            className={`px-3 py-1 rounded-xl  cursor-pointer ${viewMode === "kanban" ? "bg-purple-600 text-white" : "bg-white text-purple-600"
              }`}
            onClick={() => setViewMode("kanban")}
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
            className={`px-3 py-1 rounded-xl text-neutral-900 cursor-pointer ${viewMode === "table" ? "bg-purple-600 text-white" : "bg-white text-purple-600"
              }`}
            onClick={() => setViewMode("table")}
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
        {viewMode === "kanban" ? <KanbanBoard /> : <TableView />}
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
              users: (team as Team).users || [] // Type assertion + fallback
            }))}
          />
      </Modal>
    </div>
  );
}

export default withAuth(TasksPage);
