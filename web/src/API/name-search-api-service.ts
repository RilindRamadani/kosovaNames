import { ApiResponse, DataItem, } from '../types';

export class NameSearchService {
    async searchName(name: string): Promise<DataItem> {
        const response = await fetch(`http://localhost:3000/NameSearch/GetNamesCount/?Name=${name}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataArray: ApiResponse = await response.json();
        const data: DataItem = dataArray.data[0];
        return data;
    }
}