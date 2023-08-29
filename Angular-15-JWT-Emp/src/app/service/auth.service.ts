import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../model/employee.service';

const BASE_URL = ['http://localhost:8080/'];

export interface EmployeeData {
  items: Employee[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
}

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

  GetAllEmployee( pageNo: number,  pageSize: number,  sortBy: string,  sortDir: string): Observable<any> {
    return this.http.get(BASE_URL + `api/v1/employees?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`, httpOptions
    )
    .pipe(
      map((data) => data),
      catchError(err => throwError(err))
    );
  }

  AddEmployee(inputdata:any): Observable<any> {
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

}
