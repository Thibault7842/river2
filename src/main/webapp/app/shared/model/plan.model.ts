import { IProjet } from 'app/shared/model/projet.model';

export interface IPlan {
  id?: number;
  name?: string;
  description?: string;
  planimgContentType?: string;
  planimg?: any;
  projet?: IProjet;
}

export class Plan implements IPlan {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public planimgContentType?: string,
    public planimg?: any,
    public projet?: IProjet
  ) {}
}
