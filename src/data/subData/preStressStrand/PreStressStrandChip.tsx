import { ChipWrapper } from '../../../uicomponents/Chip';
import { PreStressStrandType } from '../../dataModelTypes';
import { getPreStressStrandString } from './preStressStandLogic';

export const PreStressStrandChip: React.FC<{ preStressStrand: PreStressStrandType | undefined }> = ({
  preStressStrand
}) => <ChipWrapper>{preStressStrand ? getPreStressStrandString(preStressStrand) : undefined}</ChipWrapper>;
