import { Issue } from './Issue';

export interface Assignment {
  username: string;
  avatar: string;
  issues: Issue[];
}
