import { DataModel } from '../../../convex/_generated/dataModel';
import { ChipWrapper } from '../../uicomponents/Chip';
import { getCrossSectionString } from './crossSectionLogic';

export const CrossSectionChip: React.FC<{
  crossSection: DataModel['crossSections']['document'] | undefined;
  materials: DataModel['materials']['document'][];
}> = ({ crossSection, materials }) =>
  crossSection ? <ChipWrapper>{getCrossSectionString(crossSection, materials)}</ChipWrapper> : undefined;
