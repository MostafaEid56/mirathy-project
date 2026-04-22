import { Injectable } from '@angular/core';
import { HeirResult } from './models';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface SavedCase {
  id: number;
  date: string;
  estate: number;
  results: HeirResult[];
  heirs: string;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly baseUrl = environment.apiBaseUrl + '/auth';

  constructor(private http: HttpClient) {}

  getAllProblems(): Observable<HistoryProblem[]> {
    return this.http.get<HistoryProblem[]>(
      `${this.baseUrl}/getAllProblem`
    );
  }

  getFavoriteProblems(): Observable<HistoryProblem[]> {
    return this.http.get<HistoryProblem[]>(
      `${this.baseUrl}/getAllFavoriteProblem`
    );
  }

  toggleFavorite(problemId: number): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/isFavorite/${problemId}`,
      {}
    );
  }

  getProblemDetails(id: number): Observable<ProblemResult[]> {
    return this.http.get<ProblemResult[]>(
      `${this.baseUrl}/problem/${id}`
    );
  }

  deleteProblem(problemId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/problem/${problemId}`
    );
  }
}
export interface HistoryProblem {
  id: number;
  title: string;
  createdAt: string;
  isFavorite: boolean;
}
export interface ProblemResult {
  heirType: string;
  shareType: string;
  fixedShare: string;
  shareValue: number;
  memberCount: number;
  reason: string;
}
export interface HistoryProblemDetails {
  id: number;
  title: string;
  createdAt: string;
  isFavorite: boolean;
  estate?: number;      // optional لو مش راجع
  heirs?: string;       // optional
  results: ProblemResult[];
}


