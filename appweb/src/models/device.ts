export class Device{

    temp: any;
    humidity: any;
    luminosidad: any;
    gas: any;
    name: String;
    ip: String;
    type: Number;

    constructor(_id: string, userId: string, name: string, ip: string, type: number){
        this.temp = 1;
        this.name = name;
        this.ip = ip;
        this.type = type;

    }
}