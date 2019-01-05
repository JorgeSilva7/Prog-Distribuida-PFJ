import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://10.10.10.43:3000/";

const header = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

// var headerJWT = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'authorization' : 'Bearer '+localStorage.getItem('token')
//   })
// };

@Injectable()
export class ApiServiceProvider {

  constructor(public http: HttpClient) {
  }

  login(email: String, password: String): Observable<any> {
    let login = this.http.post(apiUrl + 'auth/login',
      {
        "email": email,
        "password": password
      }, header);
    return login;
  }

  register(email: String, name: String, lastName: String, password: String): Observable<any> {
    let register = this.http.post(apiUrl + 'auth/register',
      {
        "name": name,
        "lastName": lastName,
        "email": email,
        "password": password
      }, header);
    return register;
  }

  getDevices(): Observable<any> {
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let devices = this.http.get(apiUrl + 'smarthome/devices', headerJWT);
    return devices;
  }

  addDevice(ip: String, name: String, type: Number): Observable<any> {
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let device = this.http.post(apiUrl + 'smarthome/device', 
    {
      "ip": ip,
      "name": name,
      "type": type
    }, headerJWT);
    return device;
  }

  editDevice(id: String, ip: String, name: String, type: Number): Observable<any> {
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let device = this.http.put(apiUrl + 'smarthome/device/'+id, 
    {
      "ip": ip,
      "name": name,
      "type": type
    }, headerJWT);
    return device;
  }

  removeDevice(id: String){
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let device = this.http.delete(apiUrl + 'smarthome/device/'+id, headerJWT);
    return device;
  }

  getSensorDevices(): Observable<any> {
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let devices = this.http.get(apiUrl + 'smarthome/sensordevices', headerJWT);
    return devices;
  }

  getActuatorDevices(): Observable<any> {
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let devices = this.http.get(apiUrl + 'smarthome/actuatordevices', headerJWT);
    return devices;
  }

  encender(idDevice, pinout): Observable<any> {
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let devices = this.http.get(apiUrl + 'smarthome/encender/'+idDevice+'/1/'+pinout, headerJWT);
    return devices;
  }

  apagar(idDevice, pinout): Observable<any> {
    let headerJWT = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+localStorage.getItem('token')
      })
    };
    let devices = this.http.get(apiUrl + 'smarthome/apagar/'+idDevice+'/1/'+pinout, headerJWT);
    return devices;
  }

  getSensorTemp(ipSensor): Observable<any>{
    let temp = this.http.get('http://'+ipSensor+':5000/temperatura');
    return temp;
  }

  getSensorHumidity(ipSensor): Observable<any>{
    let humidity = this.http.get('http://'+ipSensor+':5000/humedad');
    return humidity;
  }

  getSensorGas(ipSensor): Observable<any>{
    let gas = this.http.get('http://'+ipSensor+':5000/gas');
    return gas;
  }

  getSensorLuminity(ipSensor): Observable<any>{
    let luminity = this.http.get('http://'+ipSensor+':5000/luminosidad');
    return luminity;
  }
}
