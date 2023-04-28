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
  beccalyria: {
    issues: Issue[];
    pulls: Pull[];
  };
  rosalianightsong: {
    issues: Issue[];
    pulls: Pull[];
  };
  "naomis-novas": {
    issues: Issue[];
    pulls: Pull[];
  };
  beccalia: {
    issues: Issue[];
    pulls: Pull[];
  };
  updatedAt: number;
}
