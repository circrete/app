import { DataModel } from '../../../../convex/_generated/dataModel';

/**
 * Helper method to get the widht height and length of a given geometry
 * @param geometryTypeId - The id of the geometry
 * @returns `{ width: number; height: number; length: number }` | `null`
 */
export const getWidthHeightLenghtForGeometryId = (
  geometryTypeId: string,
  geometries: DataModel['geometries']['document'][],
  crossSections: DataModel['crossSections']['document'][]
): { width: number; height: number; length: number } | null => {
  const geometry = geometries.find((g) => g._id === geometryTypeId);
  if (!geometry) return null;
  const crossSection = crossSections.find((c) => c._id === geometry.crossSectionId);
  if (!crossSection) return null;
  return {
    width: crossSection.width,
    height: geometry.componentCategory === 'Slab' ? crossSection.height : geometry.length,
    length: geometry.componentCategory === 'Slab' ? geometry.length : crossSection.height
  };
};
