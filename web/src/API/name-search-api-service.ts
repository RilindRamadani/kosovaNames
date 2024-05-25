export class NameSearchService {
    async searchName(name: string) {
        const response = await fetch(`http://localhost:3000/NameSearch/GetNamesCount/?Name=${name}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}