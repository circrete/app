import { ChipWrapper } from '../../../uicomponents/Chip';
import { UserType, VisualInspectionType } from '../../dataModelTypes';
import { getVisualInspectionString } from './visualInspectionLogic';

export const VisualInspectionChip: React.FC<{
  visualInspection: VisualInspectionType | VisualInspectionType[] | undefined;
  users: UserType[];
}> = ({ visualInspection, users }) => <ChipWrapper>{getVisualInspectionString(visualInspection, users)}</ChipWrapper>;
