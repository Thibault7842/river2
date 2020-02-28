import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: any;
  date?: Moment;
  projet?: IProjet;
  tags?: ITag[];
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public title?: string,
    public content?: any,
    public date?: Moment,
    public projet?: IProjet,
    public tags?: ITag[]
  ) {}
}
