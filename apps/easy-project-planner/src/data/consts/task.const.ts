import { Task } from '../models/task.m';

export const defaultTasks: Task[] = [
    {
        id: 1,
        name: "Mise en place infra Dev/Autonomy",
        durationDays: 5,
        type: "Infra",
        assignee: "Tech Lead",
        dependencies: [],
        requiredRole: ["Tech Lead"],
    },
    {
        id: 2,
        name: "Socle front/back/bdd + Auth SSO",
        durationDays: 10,
        type: "Dev",
        assignee: "Développeur",
        dependencies: [1],
        requiredRole: ["Dev", "Tech Lead"],
    },
    {
        id: 3,
        name: "Bouchonnage API",
        durationDays: 3,
        type: "Bouchonnage",
        assignee: "Développeur",
        dependencies: [2],
        requiredRole: ["Dev"],
    },
    {
        id: 4,
        name: "Recette fonctionnelle",
        durationDays: 5,
        type: "Recette",
        assignee: "QA",
        dependencies: [3],
        requiredRole: ["QA"],
    }
];