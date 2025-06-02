import dayjs from 'dayjs';
import { Task } from '../../data/models/task.m';
import { Resource } from '../../data/models/resource.m';
import { topologicalSort } from './graph.utils';
import { generateWorkDays, isWeekendOrHoliday } from './date.utils';
import { resourcesList } from '../../data/consts/resource.const';
import { Config } from '../../data/models/config.m';


// Calcul du planning final
export function computeTaskDates(tasks: Task[], config: Config): Task[] {
    const sortedTasks = topologicalSort(tasks);
    const computed: Task[] = [];

    for (const task of sortedTasks) {
        let earliestStart = dayjs(config.startDate).valueOf();

        const deps = task.dependencies.map(id => computed.find(t => t.id === id));
        if (deps.length > 0) {
            const latestDepEndDate = Math.max(...deps.map(d => d?.endDate?.getTime() || 0));
            earliestStart = latestDepEndDate + 1 * 24 * 60 * 60 * 1000;
        }

        if (task.mustStartOn && task.mustStartOn.getTime() > earliestStart) {
            earliestStart = task.mustStartOn.getTime();
        }

        const workDays = generateWorkDays(dayjs(earliestStart).format('YYYY-MM-DD'), task.durationDays);

        const suitableResource = findSuitableResource(task.requiredRole, workDays[0], workDays[workDays.length - 1]);

        computed.push({
            ...task,
            startDate: workDays[0],
            endDate: workDays[workDays.length - 1],
            assignee: suitableResource ? suitableResource.name : '⚠️ Aucun dev disponible'
        });
    }

    return computed;
}

// Trouve une ressource adaptée
function findSuitableResource(requiredRoles: string[], start: Date, end: Date): Resource | null {
    return resourcesList.find(resource =>
        resource.roles.some(role => requiredRoles.includes(role)) &&
        resource.availableFrom <= start &&
        resource.availableTo >= end
    ) || null;
}

// Plan le plus rapide possible
export function computeFastestPossiblePlan(tasks: Task[]): { startDate: Date; endDate: Date } {
    const config = {
        startDate: new Date('2025-04-01'),
        maxDevelopers: getMaxParallelTasks(tasks),
    };
    const updated = computeTaskDates(tasks, config);
    const projectEndDate = Math.max(...updated.map(t => t.endDate?.getTime() || 0));
    return {
        startDate: config.startDate,
        endDate: new Date(projectEndDate)
    };
}

// Nombre max de devs utiles
export function getMaxParallelTasks(tasks: Task[]): number {
    const independentTasks = tasks.filter(t => t.dependencies.length === 0).length;
    return Math.min(independentTasks, 10); // Limite à 10
}

// Vérifie la faisabilité
export function isFeasible(tasks: Task[], config: Config): boolean {
    const updatedTasks = computeTaskDates(tasks, config);
    const projectEnd = Math.max(...updatedTasks.map(t => t.endDate?.getTime() || 0));
    const deadlineTime = config.deadline?.getTime() || Infinity;

    const hasUnmetConstraints = updatedTasks.some(task => {
        if (task.mustStartOn && task.startDate! < task.mustStartOn!) return true;
        if (task.mustEndOn && task.endDate! > task.mustEndOn!) return true;
        if (!task.assignee || task.assignee.startsWith('⚠️')) return true;
        return false;
    });

    return projectEnd <= deadlineTime && !hasUnmetConstraints;
}