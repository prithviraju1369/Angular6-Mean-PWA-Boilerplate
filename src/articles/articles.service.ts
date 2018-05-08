import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable({
  providedIn: "root"
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<any> {
    let result = this.http.get<Array<Object>>("/api/articles");
    return result;
  }

  addArticle(article: object): Observable<any> {
    return this.http.post<Object>("/api/add", article);
  }
}
