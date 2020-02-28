import { IProjet } from 'app/shared/model/projet.model';

export interface IFich {
  id?: number;
  name?: string;
  description?: string;
  planimgContentType?: string;
  planimg?: any;
  projet?: IProjet;
}

export class Fich implements IFich {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public planimgContentType?: string,
    public planimg?: any,
    public projet?: IProjet
  ) {}
}
