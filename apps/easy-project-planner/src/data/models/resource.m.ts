export interface Resource {
    id: number;
    name: string;
    roles: string[];
    availableFrom: Date;
    availableTo: Date;
}