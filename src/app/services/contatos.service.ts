import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContatoRequest } from '../models/contato.request';
import { Observable } from 'rxjs';
import { ContatoResponse } from '../models/contato.response';
import { environment } from '../../environments/environment';
import { AuthHelper } from '../helpers/auth.helper';
import { DashoboardResponse } from '../models/dashboard.response';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {

  endpoint: string = `${environment.apiContatos}/contatos`
  //método construtor
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
    ) {}

  get headers(): HttpHeaders{
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authHelper.getData()?.accessToken}`
    });
  }

  post(request: ContatoRequest): Observable<ContatoResponse> {
    return this.httpClient.post<ContatoResponse>(
      this.endpoint,
      request, { headers: this.headers }
    );
  }

  get(): Observable<ContatoResponse[]>{
    return this.httpClient.get<ContatoResponse[]>(
      this.endpoint, 
      { headers: this.headers }
    );
  }

  getById(idContato: string): Observable<ContatoResponse>{
    return this.httpClient.get<ContatoResponse>(
      `${this.endpoint}/${idContato}`, 
      { headers: this.headers }
    );
  }

  getDashboard(): Observable<DashoboardResponse[]>{
    return this.httpClient.get<DashoboardResponse[]>(
      `${environment.apiContatos}/dashboard`,
      { headers: this.headers }
    )
  }

  put(request: ContatoRequest): Observable<ContatoResponse>{
    return this.httpClient.put<ContatoResponse>(
      this.endpoint,
      request, {headers: this.headers}
    )
  }

  delete(idContato:string): Observable<ContatoResponse>{
    return this.httpClient.delete<ContatoResponse>(
      `${this.endpoint}/${idContato}`,
      {headers: this.headers}
    )
  }

}
