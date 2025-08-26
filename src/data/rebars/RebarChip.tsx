import { DataModel } from '../../../convex/_generated/dataModel';
import { ChipWrapper } from '../../uicomponents/Chip';
import { getRebarString } from './rebarLogic';

export const RebarChip: React.FC<{ rebar: DataModel['rebars']['document'] | undefined }> = ({ rebar }) => (
  <ChipWrapper>{rebar ? getRebarString(rebar) : undefined}</ChipWrapper>
);
