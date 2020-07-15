import { Item } from './Item';

export interface Result {
    success: boolean;
    items?: Item[];
    error?: string;
}