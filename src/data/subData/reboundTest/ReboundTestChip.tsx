import { ChipWrapper } from '../../../uicomponents/Chip';
import { UserType, ReboundTestType } from '../../dataModelTypes';
import { getReboundTestString } from './reboundTestLogic';

export const ReboundTestChip: React.FC<{
  reboundTest: ReboundTestType | ReboundTestType[] | undefined;
  users: UserType[];
}> = ({ reboundTest, users }) => <ChipWrapper>{getReboundTestString(reboundTest, users)}</ChipWrapper>;
