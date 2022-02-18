export interface Application {
    idApplication: number;
    typeDocumentIdentity: number;
    documentIdentity: string;
    firstName: string;
    middleName: string;
    fatherlastName: string;
    motherlastName: string;
    birthdate: Date;
    birthCountry: number;
    residentDepartment: number;
    residentDistrict: number;
    reference: string;
    email: string;
    address: string;
    addressReference: string;
    allergies: string;
    disease: string;
    otherHealthProblem: string;
}