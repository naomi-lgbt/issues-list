import { Issue } from './Issue';
import { Pull } from './Pull';

export interface AggregateData {
  'naomi-lgbt': {
    issues: Issue[];
    pulls: Pull[];
  };
  nhcarrigan: {
    issues: Issue[];
    pulls: Pull[];
  };
  updatedAt: number;
}
