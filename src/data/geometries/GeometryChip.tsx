import { DataModel } from '../../../convex/_generated/dataModel';
import { ChipWrapper } from '../../uicomponents/Chip';
import { getGeometryString } from './geometryLogic';

export const GeometryChip: React.FC<{
  geometry: DataModel['geometries']['document'] | undefined;
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
}> = ({ geometry, crossSections, materials }) => (
  <ChipWrapper>{geometry ? getGeometryString(geometry, crossSections, materials) : undefined}</ChipWrapper>
);
