import { CoreTestType, UserType } from '../../dataModelTypes';
import { getCoreTestString } from './coreTestLogic';
import { ChipWrapper } from '../../../uicomponents/Chip';

export const CoreTestChip: React.FC<{ coreTest: CoreTestType; users: UserType[] }> = ({ coreTest, users }) => (
  <ChipWrapper>{coreTest ? getCoreTestString(coreTest, users) : undefined}</ChipWrapper>
);
