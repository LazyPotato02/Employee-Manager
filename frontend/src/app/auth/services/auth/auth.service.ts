import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {LoginData} from './auth.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {

    this.checkSession().subscribe();
  }


  login(credentials: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials, {withCredentials: true}).pipe(
      tap(() => {
        this.loggedInSubject.next(true);
      }),
      catchError((error) => {
        this.loggedInSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {withCredentials: true}).subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']);
        this.loggedInSubject.next(false)
      },
      error: (error) => console.error('Logout failed:', error),
    });
  }

  checkSession(): Observable<boolean> {
    return this.http.get<{ loggedIn: boolean }>(`${this.apiUrl}/auth/verify`, {withCredentials: true}).pipe(
      map(response => response.loggedIn),
      tap(loggedIn => this.loggedInSubject.next(loggedIn)),
      catchError(() => {
        this.loggedInSubject.next(false);
        return of(false);
      })
    );
  }

}
