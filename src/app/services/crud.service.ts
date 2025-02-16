import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CrudService {
    apiRoute: string = "GenerateCrud";

    constructor(private _http: HttpClient) { }

    /**
     * Ejecuta la solicitud de generacion de código.
     * 
     * @param params datos de generación de código
     */
    generateCrud(params: any): Observable<any> {
        return this._http.post(`${environment.baseUrl}/${this.apiRoute}`, params, { observe: "response" });
    }

}
