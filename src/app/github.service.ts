import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AggregateData } from 'src/interfaces/AggregateData';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  public responseCache = new Map();
  private orgList: (keyof AggregateData)[] = [
    'nhcarrigan',
    'beccalyria',
    'rosalianightsong',
    'nhcommunity',
    'beccalia',
  ];
  constructor(private http: HttpClient) {}

  public getIssues(): Observable<AggregateData> {
    const dataFromCache = this.responseCache.get('github');
    if (dataFromCache) {
      return of(dataFromCache);
    }
    const data = this.http.get<AggregateData>(
      'https://contribute-api.naomi.lgbt/data'
    );
    data.subscribe((d) => this.responseCache.set('github', data));
    return data;
  }
}
