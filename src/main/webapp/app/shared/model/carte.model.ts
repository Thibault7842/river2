import { IProjet } from 'app/shared/model/projet.model';

export interface ICarte {
  id?: number;
  name?: string;
  description?: string;
  landingimgContentType?: string;
  landingimg?: any;
  projet?: IProjet;
}

export class Carte implements ICarte {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public landingimgContentType?: string,
    public landingimg?: any,
    public projet?: IProjet
  ) {}
}
