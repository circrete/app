import { DataModel } from '../../../convex/_generated/dataModel';

export const userUIItems: { field: keyof DataModel['users']['document'] }[] = [
  { field: 'address' },
  { field: 'company' },
  { field: 'mail' },
  { field: 'name' },
  { field: 'userCategory' }
];
