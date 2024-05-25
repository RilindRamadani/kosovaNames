export class NameSearchService {
    async searchName(name: string) {
        const response = await fetch(`https://ask.rks-gov.net/NameSearch/GetNamesCount/?Name=${name}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}