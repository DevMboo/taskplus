// components/TaskForm.tsx
import React from 'react';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import { useTitle } from '@/hooks/useTitle';
import { useDescription } from '@/hooks/useDescription';
import { useDueDate } from '@/hooks/useDueDate';
import { useStatus } from '@/hooks/useStatus';
import { Team, User } from '@/types/team';
import { useSelect } from '@/hooks/useSelect';

interface TaskFormProps {
    teams: Team[];

    onSubmit: (taskData: {
        title: string,
        description: string,
        dueDate: string,
        status: string,
        teamId: any,
        responsibleId: any
    }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, teams }) => {
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

    const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(null);
    const [responsibleId, setResponsibleId] = React.useState<number | null>(null);

    const getTeamUsers = (teamId: number | null): User[] => {
        if (!teamId) return [];
        const team = teams.find(t => t.id === teamId);
        return team?.users || [];
    };

    const {
        value: teamValue,
        error: teamError,
        options: teamOptions,
        onChange: onTeamChange,
        validate: validateTeam,
        setTouched: setTeamTouched,
        setError: setTeamError
    } = useSelect<Team>({
        options: teams,
        isRequired: true,
        getValue: (team) => team.id.toString(),
        getLabel: (team) => team.name,
        validationMessage: 'Selecione uma equipe'
    });

    // Configuração para responsável (obrigatório apenas se a equipe tiver membros)
    const selectedTeam = teams.find(t => t.id.toString() === teamValue);
    const teamUsers = selectedTeam?.users || [];

    const {
        value: responsibleValue,
        error: responsibleError,
        options: responsibleOptions,
        onChange: onResponsibleChange,
        validate: validateResponsible,
        setTouched: setResponsibleTouched,
        setError: setResponsibleError
    } = useSelect<User>({
        options: teamUsers,
        isRequired: teamUsers.length > 0, // Dinâmico baseado na equipe selecionada
        getValue: (user) => user.id.toString(),
        getLabel: (user) => user.name,
        validationMessage: 'Selecione um responsável'
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let hasError = false;

        setTeamTouched();
        setResponsibleTouched();

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

        if (!teamValue) {
            setTeamError('Selecione uma equipe');
            hasError = true;
        }

        if (!responsibleValue && teamUsers.length > 0) {
            setResponsibleError('Selecione um responsável');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        onSubmit({
            title,
            description,
            dueDate,
            status,
            teamId: teamValue,
            responsibleId: responsibleValue
        });
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
                    className={`appearance-none block w-full shadow-sm px-3 py-2 border ${descriptionError ? 'border-red-500' : 'border-gray-300'
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
                onChange={(value: any) => setStatus(value)} // Corrigido: função que recebe o valor
                options={[
                    { value: 'Pendente', label: 'Pendente' },
                    { value: 'Em andamento', label: 'Em andamento' },
                    { value: 'Concluída', label: 'Concluída' },
                ]}
            />

            <SelectField
                id="team"
                label="Equipe"
                value={teamValue || ''}
                onChange={(value: any) => onTeamChange(value)} // Corrigido: função que recebe o valor
                options={teamOptions}
                error={teamError || undefined}
            />

            <SelectField
                id="responsible"
                label="Responsável"
                value={responsibleValue || ''}
                onChange={(value:any) => onResponsibleChange(value)} // Corrigido: função que recebe o valor
                options={responsibleOptions}
                error={responsibleError || undefined}
                disabled={!teamValue || teamUsers.length === 0}
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
