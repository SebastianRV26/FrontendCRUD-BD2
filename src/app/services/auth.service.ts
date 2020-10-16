import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    apiRoute: string = "login";

    constructor(private _http: HttpClient) { }

    login(params: any): Observable<any> {
        return this._http.post(`${environment.baseUrl}/${this.apiRoute}`, params, { observe: "response" });
    }

    setSession(authResult) {
        localStorage.setItem('token', authResult.token);
    }

    logout() {
        localStorage.removeItem("id_token");
    }

}
