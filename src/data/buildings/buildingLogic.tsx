import { DataModel } from '../../../convex/_generated/dataModel';

export const getBuildingString = (building: DataModel['buildings']['document']) =>
  building.type + ' - ' + building.address;

export const getBuildingTableData = (
  building: DataModel['buildings']['document'],
  users: DataModel['users']['document'][]
) => ({
  ...building,
  owner: building.ownerId ? users.find((u) => building.ownerId === u._id) : undefined
});
