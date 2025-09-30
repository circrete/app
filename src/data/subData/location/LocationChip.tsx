import { ChipWrapper } from '../../../uicomponents/Chip';
import { getLongitudeLatitudeString } from './locationLogic';
import { LocationDataType } from './locationType';

export const LocationChip: React.FC<{ location: LocationDataType | undefined }> = ({ location }) => (
  <ChipWrapper>{location ? getLongitudeLatitudeString(location) : undefined}</ChipWrapper>
);
