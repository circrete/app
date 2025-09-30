import { DataModel } from '../../../convex/_generated/dataModel';

export const getMaterialString = (material: DataModel['materials']['document']) =>
  material.materialCategory + ' - ' + material.exposureClass;

export const getMaterialTableData = (material: DataModel['materials']['document']) => ({
  ...material
});
