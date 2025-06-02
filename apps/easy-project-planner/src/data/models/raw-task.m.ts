export interface RawTask {
    id: number;
    name: string;
    durationDays: number;
    type: string;
    assignee: string;
    dependencies?: string | number[];
    mustStartOn?: string;
    mustEndOn?: string;
    requiredRole?: string; // ex: "Tech Lead", "Dev, QA"
}