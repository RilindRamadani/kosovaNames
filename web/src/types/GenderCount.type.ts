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
    total: number;
};

export type DataItem = {
    genderCount: GenderCount;
    genderCountMunicipality: GenderCountMunicipality[];
    citizenNamePerAge: CitizenNamePerAge[];
    top10: CitizenNamePerAge[];
};

export type ApiResponse = {
    status: number;
    data: DataItem[];
    singleData: any | null;
};
