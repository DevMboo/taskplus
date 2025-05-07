type Task = {
    id: number;
    title: string;
    assignee: string;
    dueDate: string;
  };
  
  const tasksByStatus: Record<string, Task[]> = {
    Pendente: [
      { id: 1, title: "Tarefa 1", assignee: "João", dueDate: "2025-05-07" },
      { id: 2, title: "Tarefa 2", assignee: "Maria", dueDate: "2025-05-09" },
    ],
    "Em andamento": [
      { id: 3, title: "Tarefa 3", assignee: "Lucas", dueDate: "2025-05-10" },
    ],
    Concluída: [
      { id: 4, title: "Tarefa 4", assignee: "Ana", dueDate: "2025-05-05" },
    ],
  };
  
  const statusColors: Record<string, string> = {
    Pendente: "bg-yellow-100 text-yellow-800",
    "Em andamento": "bg-blue-100 text-blue-800",
    Concluída: "bg-green-100 text-green-800",
  };
  
  export function TableView() {
    return (
      <div className="space-y-6">
        {Object.keys(tasksByStatus).map((status) => (
          <div key={status} className="rounded-xl shadow border border-neutral-100 overflow-hidden">
            <div
              className={`px-4 py-2 font-bold text-lg ${statusColors[status]}`}
            >
              {status}
            </div>
  
            <div>
              {tasksByStatus[status].map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between px-4 py-3 border-t border-t-neutral-100 hover:bg-neutral-50 bg-white"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{task.title}</div>
                    <div className="text-sm text-neutral-500">Responsável: {task.assignee}</div>
                  </div>
                  <div className="text-sm text-neutral-600">{task.dueDate}</div>
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
  