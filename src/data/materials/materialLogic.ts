import { DataModel } from '../../../convex/_generated/dataModel';

export const getMaterialString = (material: DataModel['materials']['document']) =>
  material.materialCategory + ' - ' + material.exposureClass;

export const getMaterialTableData = (
  material: DataModel['materials']['document'],
  crossSections: DataModel['crossSections']['document'][]
) => ({
  ...material,
  crossSection: material.crossSectionId ? crossSections.find((cs) => material.crossSectionId === cs._id) : undefined
});
