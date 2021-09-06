

export interface Student {
    age: number;
    id: string;
    gender: 'male' | 'female';
    name: string;
    mark: number;
    city: string;
    createdAt?: number;
    updatedAt?: number;
}