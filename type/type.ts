import * as yup from 'yup'
export type FormData = {
    citizenId: string;
    gender: string;
    age: number;
    occupation: string;
    from: string;
    to: string;
    detail: string;
    locationType: string;
    locationName: string;
};

export enum LOCATION {
    INDOOR = 'INDOOR',
    OUTDOOR = 'OUTDOOR',
    HOME = 'HOME',
    TRAVELLING = 'TRAVELLING'
}
export enum GENDER {
    MALE = 'Male',
    FEMALE = 'Female',
}

export const formSchema = yup.object({
    citizenId: yup.string().required('Citizen ID is required.'),
    gender: yup.string().required('Gender is required.'),
    age: yup.number().positive('Age should be more than 0').integer().typeError('Age is required.'),
    occupation: yup.string().required('Occupation is required.'),
    from: yup.string().required('From Date is required.'),
    to: yup.string().required('To Date is required.'),
    detail: yup.string().required('Detail is required.'),
    locationType: yup.string().required('Location Type is required.'),
    locationName: yup.string().ensure().when('locationType', {
        is: (locationType: string) => locationType === LOCATION.INDOOR || locationType === LOCATION.OUTDOOR,
        then: yup.string().required('Location Name is required.')
    }),
})

export interface Timeline {
    _id: string;
    from: string;
    to: string;
    detail: string;
    locationType: string;
    locationName: string;
    
} 

export interface User {
    citizenId: string;
    gender: string;
    age: number;
    occupation: string;
    timelines: Timeline[]
}