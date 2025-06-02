import { Resource } from '../models/resource.m';

export const resourcesList: Resource[] = [
    {
        id: 1,
        name: 'Alice',
        roles: ['Développeur', 'Tech Lead'],
        availableFrom: new Date('2025-04-01'),
        availableTo: new Date('2025-12-31'),
    },
    {
        id: 2,
        name: 'Bob',
        roles: ['Développeur'],
        availableFrom: new Date('2025-04-01'),
        availableTo: new Date('2025-12-31'),
    },
    {
        id: 3,
        name: 'Charlie',
        roles: ['QA'],
        availableFrom: new Date('2025-04-01'),
        availableTo: new Date('2025-12-31'),
    }
];