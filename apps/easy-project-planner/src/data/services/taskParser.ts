import { Task } from '../models/task.m';
import { RawTask } from '../models/raw-task.m';

export function parseExcelTask(rawTask: RawTask): Task {
    let dependencies: number[] = [];

    if (typeof rawTask.dependencies === 'string') {
        dependencies = rawTask.dependencies
            .split(',')
            .filter(Boolean)
            .map(d => parseInt(d.trim(), 10));
    } else if (Array.isArray(rawTask.dependencies)) {
        dependencies = [...rawTask.dependencies];
    }

    return {
        ...rawTask,
        dependencies,
        mustStartOn: rawTask.mustStartOn ? new Date(rawTask.mustStartOn) : undefined,
        mustEndOn: rawTask.mustEndOn ? new Date(rawTask.mustEndOn) : undefined,
        requiredRole: rawTask.requiredRole
            ? rawTask.requiredRole.split(',').map(r => r.trim())
            : [],
    };
}