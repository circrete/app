import { DataModel } from '../../../convex/_generated/dataModel';

export const getUserString = (user: DataModel['users']['document']) => user.name;
