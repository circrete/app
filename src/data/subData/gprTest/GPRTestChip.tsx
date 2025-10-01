import { ChipWrapper } from '../../../uicomponents/Chip';
import { GPRTestType, UserType } from '../../dataModelTypes';
import { getGPRTestString } from './gprTestLogic';

export const GPRTestChip: React.FC<{ gprTest: GPRTestType; users: UserType[] }> = ({ gprTest, users }) => (
  <ChipWrapper>{gprTest ? getGPRTestString(gprTest, users) : undefined}</ChipWrapper>
);
