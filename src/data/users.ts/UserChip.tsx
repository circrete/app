import { DataModel } from '../../../convex/_generated/dataModel';
import { ChipWrapper } from '../../uicomponents/Chip';
import { getUserString } from './userLogic';

export const UserChip: React.FC<{ user: DataModel['users']['document'] | undefined }> = ({ user }) => (
  <ChipWrapper>{user ? getUserString(user) : undefined}</ChipWrapper>
);
