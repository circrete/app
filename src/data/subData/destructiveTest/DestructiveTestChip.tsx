import { ChipWrapper } from '../../../uicomponents/Chip';
import { DestructiveTestType, UserType } from '../../dataModelTypes';
import { getDestructiveTestString } from './destructiveTestLogic';

export const DestructiveTestChip: React.FC<{ destructiveTest: DestructiveTestType; users: UserType[] }> = ({
  destructiveTest,
  users
}) => <ChipWrapper>{destructiveTest ? getDestructiveTestString(destructiveTest, users) : undefined}</ChipWrapper>;
