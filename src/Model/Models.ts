export interface PlantModel{
    id : number;
    name : string;
    lastUpdate : Date;
    lastWaterSession : Date;
    status : number;
}

export enum PlantStatus{
    OPEN = 0, WATERING = 1, WAITING = 2, ALERT = 3
}