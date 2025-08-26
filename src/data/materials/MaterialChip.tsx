import { DataModel } from '../../../convex/_generated/dataModel';
import { ChipWrapper } from '../../uicomponents/Chip';
import { getMaterialString } from './materialLogic';

export const MaterialChip: React.FC<{
  material: DataModel['materials']['document'] | undefined;
}> = ({ material }) => <ChipWrapper>{material ? getMaterialString(material) : undefined}</ChipWrapper>;
