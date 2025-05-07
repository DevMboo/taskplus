const statusColors: Record<string, string> = {
    Pendente: "bg-yellow-100 text-yellow-800",
    "Em andamento": "bg-blue-100 text-blue-800",
    Concluída: "bg-green-100 text-green-800",
  };
  
  export function KanbanBoard() {
    return (
      <div className="grid grid-cols-3 gap-4">
        {["Pendente", "Em andamento", "Concluída"].map((status) => (
          <div key={status} className="rounded-lg shadow border border-neutral-200 overflow-hidden">
            {/* Cabeçalho colorido */}
            <div className={`px-4 py-2 font-bold text-center ${statusColors[status]}`}>
              {status}
            </div>
  
            {/* Área de tarefas */}
            <div className="bg-white min-h-[200px] p-2">
              {/* Aqui depois vem o drag-and-drop */}
              <p className="text-sm text-neutral-500 italic">Sem tarefas</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  