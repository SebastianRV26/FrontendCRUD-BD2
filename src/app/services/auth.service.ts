import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    apiRoute: string = "login";

    constructor(private _http: HttpClient) { }

    /**
     * Ejecuta la solicitud de inicio de sesion.
     * 
     * @param params datos del inicio de sesion
     */
    login(params: any): Observable<any> {
        return this._http.post(`${environment.baseUrl}/${this.apiRoute}`, params, { observe: "response" });
    }

    /**
     * Guarda el token
     * 
     * @param authResult resultado del inicio de sesion
     */
    setSession(authResult) {
        localStorage.setItem('token', authResult.token);
    }

    /**
     * Elimina el token para hacer el logout
     */
    logout() {
        localStorage.removeItem("token");
    }

}
