import { Task } from '../../data/models/task.m';

export const topologicalSort = (tasks: Task[]): Task[] => {
    const visited = new Set<number>();
    const result: Task[] = [];

    const dfs = (taskId: number) => {
        if (visited.has(taskId)) return;
        visited.add(taskId);

        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        task.dependencies.forEach(depId => dfs(depId));
        result.push({ ...task });
    };

    tasks.forEach(task => dfs(task.id));
    return result;
};