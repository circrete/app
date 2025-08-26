import { DataModel } from '../../../convex/_generated/dataModel';
import { getCrossSectionString } from '../crossSections/crossSectionLogic';

export const getGeometryString = (
  geometry: DataModel['geometries']['document'],
  crossSections: DataModel['crossSections']['document'][],
  materials: DataModel['materials']['document'][]
) => {
  let baseString = `${geometry.length}`;
  const crossSection = crossSections.find((c) => c._id === geometry.crossSectionId);
  if (crossSection) baseString += `-${getCrossSectionString(crossSection, materials)}`;
  return baseString;
};

export const getGeometryTableData = (
  geometry: DataModel['geometries']['document'],
  crossSections: DataModel['crossSections']['document'][],
  materials: DataModel['materials']['document'][]
) => ({
  ...geometry,
  crossSection: geometry.crossSectionId ? crossSections.find((cs) => geometry.crossSectionId === cs._id) : undefined,
  material: geometry.crossSectionId ? materials.find((m) => geometry.crossSectionId === m._id) : undefined
});
