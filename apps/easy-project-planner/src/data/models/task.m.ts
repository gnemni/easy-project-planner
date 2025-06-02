export interface Task {
    id: number;
    name: string;
    durationDays: number;
    type: string;
    assignee: string;
    dependencies: number[];
    mustStartOn?: Date;
    mustEndOn?: Date;
    requiredRole: string[]; // ex: ["Dev", "Tech Lead"]
    startDate?: Date;
    endDate?: Date;
}