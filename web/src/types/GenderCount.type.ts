export type GenderCount = {
    female: number;
    male: number;
    total: number;
    idMunicipality: number;
    rowNumber: number | null;
    id: number;
};

export type GenderCountMunicipality = {
    female: number;
    male: number;
    total: number;
    idMunicipality: number;
    rowNumber: number | null;
    id: number;
};

export type CitizenNamePerAge = {
    emri: string;
    viti: number;
    totali: string;
    id: number;
};

export type DataItem = {
    genderCount: GenderCount;
    genderCountMunicipality: GenderCountMunicipality[];
    citizensNamePerAge: CitizenNamePerAge[]; // updated to match the response
    top10: CitizenNamePerAge[];
    top5: any | null; // included this to match the response
    id: number;
};

export type ApiResponse = {
    status: number;
    data: DataItem[];
    singleData: any | null;
};
