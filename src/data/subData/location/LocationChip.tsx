import { ChipWrapper } from '../../../uicomponents/Chip';
import { LocationType } from '../../dataModelTypes';
import { getLongitudeLatitudeString } from './locationLogic';

export const LocationChip: React.FC<{ location: LocationType | undefined }> = ({ location }) => (
  <ChipWrapper>{location ? getLongitudeLatitudeString(location) : undefined}</ChipWrapper>
);
