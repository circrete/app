import { DataModel } from '../../../convex/_generated/dataModel';

export const getCrossSectionString = (
  crossSection: DataModel['crossSections']['document'],
  materials: DataModel['materials']['document'][]
) => {
  let baseString = `${crossSection.width}x${crossSection.height}`;
  const material = materials.find((m) => m._id === crossSection.concreteMaterialTypeId);
  if (material) baseString += `-${material.materialCategory}${material.tensileStrength}`;
  return baseString;
};

export const getCrossSectionTableData = (
  crossSection: DataModel['crossSections']['document'],
  materials: DataModel['materials']['document'][],
  rebars: DataModel['rebars']['document'][],
  users: DataModel['users']['document'][]
) => ({
  ...crossSection,
  concreteMaterial: crossSection.concreteMaterialTypeId
    ? materials.find((m) => crossSection.concreteMaterialTypeId === m._id)
    : undefined,
  rebarType: crossSection.rebarTypeId ? rebars.find((r) => crossSection.rebarTypeId === r._id) : undefined,
  manufacturer: crossSection.preStressStrandType.manufacturerId
    ? users.find((u) => crossSection.preStressStrandType.manufacturerId === u._id)
    : undefined
});
