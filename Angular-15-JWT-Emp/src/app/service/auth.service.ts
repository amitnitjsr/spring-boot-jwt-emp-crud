import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8080/'];

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json;charset=utf-8',
    'Authorization': 'Bearer '+localStorage.getItem('JWT'),
  },
  ),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 

  }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "sign-up", signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "authenticate", loginRequest)
  }

  // hello(): Observable<any> {
  //   return this.http.get(BASE_URL + 'api/hello', 
  //   {
  //     headers: this.createAuthorizationHeader()
  //   },
  //   );
  // }

  GetAllCustomer(): Observable<any> {
    return this.http.get(BASE_URL + 'api/v1/employees', httpOptions, 
    );
  }

  AddCustomer(inputdata:any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/employees',inputdata, httpOptions
    );
  }

  GetEmployeeById(id:any): Observable<any> {
    return this.http.get(BASE_URL + `api/v1/employees/${id}`, httpOptions
    );
  }

  UpdateEmployee(id:any, inputdata: any): Observable<any> {
    return this.http.put(BASE_URL + `api/v1/employees/${id}`,inputdata, httpOptions
    );
  }

  DeleteEmployee(id:any): Observable<any> {
    return this.http.patch(BASE_URL + `api/v1/employees/${id}/delete`, {}, httpOptions
    );
  }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      )
    } else {
      console.log("JWT token not found in the Local Storage");
    }
    return null;
  }
}
