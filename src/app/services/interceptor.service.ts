import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
/**
 * Intercepta los request para agregarles el token
 */
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Se intercepta el request y si le agrega el token si existe
        const token = localStorage.getItem("token");
        let request;

        if (token) {
            request = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            });
        }
        else {
            request = req;
        }

        return next.handle(request).pipe(catchError(err => {
            // Si el usario no esta autenticado (token no válido), se cierra la sesión
            if (err.status == 401) {
                this.authService.logout();
                location.reload();
            }

            return throwError(err);
        }));
    }
}