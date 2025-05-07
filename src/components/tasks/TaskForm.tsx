// components/TaskForm.tsx
import React from 'react';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import { useTitle } from '@/hooks/useTitle';
import { useDescription } from '@/hooks/useDescription';
import { useDueDate } from '@/hooks/useDueDate';
import { useStatus } from '@/hooks/useStatus';

interface TaskFormProps {
    onSubmit: (taskData: { title: string, description: string, dueDate: string, status: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const {
        value: title,
        onChange: setTitle,
        error: titleError,
        setError: setTitleError,
    } = useTitle(true);
    
    const {
        value: description,
        onChange: setDescription,
        error: descriptionError,
        setError: setDescriptionError,
    } = useDescription(true);
    
    const {
        value: dueDate,
        onChange: setDueDate,
        error: dueDateError,
        setError: setDueDateError,
    } = useDueDate(true);
    const { value: status, onChange: setStatus } = useStatus();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        let hasError = false;
    
        if (title.trim() === '') {
            setTitleError('Este campo é obrigatório');
            hasError = true;
        }
    
        if (description.trim() === '') {
            setDescriptionError('Este campo é obrigatório');
            hasError = true;
        }
    
        if (dueDate.trim() === '') {
            setDueDateError('Este campo é obrigatório');
            hasError = true;
        }

        if (hasError) {
            console.log('Todos os campos são obrigatórios');
            return;
        }
    
        onSubmit({ title, description, dueDate, status });
    };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                id="title"
                label="Título"
                value={title}
                onChange={setTitle}
                placeholder="Digite o título da tarefa"
                error={titleError ?? undefined}
            />

            <div>
                <label className="block text-sm font-medium">Descrição</label>
                <textarea
                    value={description}
                    onChange={setDescription}
                    className={`appearance-none block w-full px-3 py-2 border ${
                        descriptionError ? 'border-red-500' : 'border-gray-300'
                    } rounded-md placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none focus:shadow-outline-purple transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                    placeholder="Digite a descrição da tarefa"
                />
                {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
            </div>

            <InputField
                id="dueDate"
                label="Data Limite"
                type="date"
                value={dueDate}
                onChange={setDueDate}
                error={dueDateError ?? undefined}
            />

            <SelectField
                id="status"
                label="Status"
                value={status}
                onChange={setStatus}
                options={[
                    { value: 'Pendente', label: 'Pendente' },
                    { value: 'Em andamento', label: 'Em andamento' },
                    { value: 'Concluída', label: 'Concluída' },
                ]}
            />

            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-150 ease-in-out cursor-pointer"
            >
                Salvar Tarefa
            </button>
        </form>
    );
};

export default TaskForm;
