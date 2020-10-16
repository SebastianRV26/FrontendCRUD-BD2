import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TableService {

    constructor(private _http: HttpClient) { }

    getTables(params: any): Observable<any> {
        return this._http.get(`${environment.baseUrl}/GetTables`, { params, observe: "response" });
    }

}