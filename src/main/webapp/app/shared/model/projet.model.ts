import { IUser } from 'app/core/user/user.model';

export interface IProjet {
  id?: number;
  name?: string;
  description?: string;
  landingimgContentType?: string;
  landingimg?: any;
  user?: IUser;
}

export class Projet implements IProjet {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public landingimgContentType?: string,
    public landingimg?: any,
    public user?: IUser
  ) {}
}
