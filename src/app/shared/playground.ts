import {ICoordinate} from './coordinate';

export interface IPlayground {
  readonly id: string;
  name: string;
  description?: string;
  addressDescription?: string;
  position: ICoordinate;
}
