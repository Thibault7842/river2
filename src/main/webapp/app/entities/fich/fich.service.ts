import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFich } from 'app/shared/model/fich.model';

type EntityResponseType = HttpResponse<IFich>;
type EntityArrayResponseType = HttpResponse<IFich[]>;

@Injectable({ providedIn: 'root' })
export class FichService {
  public resourceUrl = SERVER_API_URL + 'api/fiches';

  constructor(protected http: HttpClient) {}

  create(fich: IFich): Observable<EntityResponseType> {
    return this.http.post<IFich>(this.resourceUrl, fich, { observe: 'response' });
  }

  update(fich: IFich): Observable<EntityResponseType> {
    return this.http.put<IFich>(this.resourceUrl, fich, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFich>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFich[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
