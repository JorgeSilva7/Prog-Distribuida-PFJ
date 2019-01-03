import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:3000/";

const header = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const headerJWT = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization' : 'Bearer '+localStorage.getItem('token')
  })
};

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
    let devices = this.http.get(apiUrl + 'smarthome/devices', headerJWT);
    return devices;
  }

  getSensorDevices(): Observable<any> {
    let devices = this.http.get(apiUrl + 'smarthome/sensordevices', headerJWT);
    return devices;
  }

  getActuatorDevices(): Observable<any> {
    let devices = this.http.get(apiUrl + 'smarthome/actuatordevices', headerJWT);
    return devices;
  }

  encender(idDevice, pinout): Observable<any> {
    let devices = this.http.get(apiUrl + 'smarthome/encender/'+idDevice+'/1/'+pinout, headerJWT);
    return devices;
  }

  apagar(idDevice, pinout): Observable<any> {
    let devices = this.http.get(apiUrl + 'smarthome/apagar/'+idDevice+'/1/'+pinout, headerJWT);
    return devices;
  }
}
