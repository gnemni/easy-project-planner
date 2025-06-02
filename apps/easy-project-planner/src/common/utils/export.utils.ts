import * as XLSX from 'xlsx';
import { Task } from '../../data/models/task.m';
import { Config } from '../../data/models/config.m';

export function exportToExcel(tasks: Task[], config: Config) {
    const wb = XLSX.utils.book_new();

    // Feuille 1 : Données brutes
    const ws1 = XLSX.utils.json_to_sheet(
        tasks.map(task => ({
            id: task.id,
            name: task.name,
            durationDays: task.durationDays,
            type: task.type,
            assignee: task.assignee,
            dependencies: task.dependencies.join(',') || '',
            mustStartOn: task.mustStartOn?.toLocaleDateString('fr-FR') || '',
            mustEndOn: task.mustEndOn?.toLocaleDateString('fr-FR') || '',
            requiredRole: task.requiredRole.join(','),
        }))
    );
    XLSX.utils.book_append_sheet(wb, ws1, 'Données');

    // Feuille 2 : Configuration utilisée
    const ws2 = XLSX.utils.aoa_to_sheet([
        ['startDate', config.startDate.toLocaleDateString('fr-FR')],
        ['deadline', config.deadline?.toLocaleDateString('fr-FR') || ''],
        ['maxDevelopers', config.maxDevelopers || ''],
    ]);
    XLSX.utils.book_append_sheet(wb, ws2, 'Configuration');

    // Feuille 3 : Planning visuel dans Excel
    const ws3 = XLSX.utils.aoa_to_sheet([
        ['Tâche', 'Type', 'Assigné à', 'Début', 'Fin'],
        ...tasks.map(t => [
            t.name,
            t.type,
            t.assignee,
            t.startDate?.toLocaleDateString('fr-FR') || '',
            t.endDate?.toLocaleDateString('fr-FR') || '',
        ]),
    ]);
    XLSX.utils.book_append_sheet(wb, ws3, 'Planning');

    XLSX.writeFile(wb, 'projet_gantt_export.xlsx');
}