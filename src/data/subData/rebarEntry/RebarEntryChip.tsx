import { ChipWrapper } from '../../../uicomponents/Chip';
import { RebarEntry } from '../../dataModelTypes';
import { getRebarString } from './rebarEntryLogic';

export const RebarEntryChip: React.FC<{ rebarEntry: RebarEntry }> = ({ rebarEntry }) => (
  <ChipWrapper>{getRebarString(rebarEntry)}</ChipWrapper>
);
