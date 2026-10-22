import { HttpInterceptorFn } from '@angular/common/http';
import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = localStorage.getItem('jwtToken'); // Достаём токен

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) // Добавляем токен в заголовки
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('401 Unauthorized - сброс токена и редирект на логин');
        localStorage.removeItem('jwtToken');
        router.navigate(['']);
      }
      return throwError(() => error);
    })
  );
};
