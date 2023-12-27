import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { AggregateData } from "../interfaces/AggregateData";

/**
 *
 */
@Injectable({
  providedIn: "root"
})
export class GithubService {
  public responseCache = new Map();
  /**
   *
   * @param {HttpClient} http The HTTP Client instance.
   */
  constructor(private http: HttpClient) {}

  /**
   * @returns {Observable<AggregateData>} The issue/PR data from the API.
   */
  public getIssues(): Observable<AggregateData> {
    const dataFromCache = this.responseCache.get("github");
    if (dataFromCache) {
      return of(dataFromCache);
    }
    const data = this.http.get<AggregateData>(
      "https://contribute-api.naomi.lgbt/data"
    );
    data.subscribe((d) => this.responseCache.set("github", d));
    return data;
  }
}
