import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { User } from 'src/app/model/user';
import { ThrowStmt } from '@angular/compiler';


const baseUrl:string = "http://localhost:8080/api";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient) { }

  getUser():Observable<User[]> 
  {
    return this.http.get<User[]>(baseUrl + "/user", httpOptions);
    
  }
  
  addUser(user: User):Observable<User>
  {
    return this.http.post<User>(baseUrl + "/user",JSON.stringify(user), httpOptions);
  }

  deleteUser(id: Number) {
      return this.http.delete<User>(baseUrl + "/user/" + id,httpOptions);
  }

  updateUser(id, user:User): Observable<User> {
    return this.http.put<User>(baseUrl + "/user/" + id, JSON.stringify(user), httpOptions);
  }
}
