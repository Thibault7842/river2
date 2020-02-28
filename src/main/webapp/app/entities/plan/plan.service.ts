import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlan } from 'app/shared/model/plan.model';

type EntityResponseType = HttpResponse<IPlan>;
type EntityArrayResponseType = HttpResponse<IPlan[]>;

@Injectable({ providedIn: 'root' })
export class PlanService {
  public resourceUrl = SERVER_API_URL + 'api/plans';

  constructor(protected http: HttpClient) {}

  create(plan: IPlan): Observable<EntityResponseType> {
    return this.http.post<IPlan>(this.resourceUrl, plan, { observe: 'response' });
  }

  update(plan: IPlan): Observable<EntityResponseType> {
    return this.http.put<IPlan>(this.resourceUrl, plan, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
