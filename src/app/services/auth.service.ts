import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  public loggedInUser$: Observable<any | null> = this.loggedInUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateLoggedInUser();
  }

  updateLoggedInUser(): void {
    const userString = localStorage.getItem('loggedInUser');
    const user = userString ? JSON.parse(userString) : null;
    this.loggedInUserSubject.next(user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>("http://localhost:3000/signupUsers").pipe(
      tap((res: any[]) => {
        const user = res.find((a: any) => {
          return a.email === email && a.password === password;
        });
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.updateLoggedInUser();
        }
      })
    );
  }
// login(obj:any){
//   return this.http.get<any>("https://localhost:7005/api/auth/login",obj)
// }
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.updateLoggedInUser();
  }
}
