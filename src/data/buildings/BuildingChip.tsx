import { DataModel } from '../../../convex/_generated/dataModel';
import { ChipWrapper } from '../../uicomponents/Chip';

export const BuildingChip: React.FC<{ building: DataModel['buildings']['document'] | undefined }> = ({ building }) => (
  <ChipWrapper>{building?.address}</ChipWrapper>
);
