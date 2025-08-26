import { DataModel } from '../../../convex/_generated/dataModel';

export const getRebarString = (rebar: DataModel['rebars']['document']) =>
  rebar.type + ' - ' + rebar.rebarEntries.length + ' entries';

export const getRebarTableData = (
  rebar: DataModel['rebars']['document'],
  materials: DataModel['materials']['document'][]
) => ({
  ...rebar,
  material: rebar.rebarMaterialId ? materials.find((m) => rebar.rebarMaterialId === m._id) : undefined
});
