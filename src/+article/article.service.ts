import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable({
  providedIn: "root"
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(id: string): Observable<any> {
    let result = this.http.get<Object>(`/api/article/?id=${id}`);
    return result;
  }
}
