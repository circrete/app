import { DataModel } from '../../../convex/_generated/dataModel';

export const getComponentTableData = (
  component: DataModel['components']['document'],
  buildings: DataModel['buildings']['document'][],
  users: DataModel['users']['document'][],
  geometries: DataModel['geometries']['document'][]
) => ({
  ...component,
  geometryType: component.geometryTypeId ? geometries.find((g) => component.geometryTypeId === g._id)?.type : undefined,
  building: component.buildingId ? buildings.find((u) => component.buildingId === u._id) : undefined,
  manufacturer: component.manufacturerId ? users.find((u) => component.manufacturerId === u._id) : undefined
});
