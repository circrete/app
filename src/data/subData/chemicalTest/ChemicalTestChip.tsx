import { ChipWrapper } from '../../../uicomponents/Chip';
import { ChemicalTestType, UserType } from '../../dataModelTypes';
import { getChemicalTestString } from './chemicalTestLogic';

export const ChemicalTestChip: React.FC<{ chemicalTest: ChemicalTestType; users: UserType[] }> = ({
  chemicalTest,
  users
}) => <ChipWrapper>{chemicalTest ? getChemicalTestString(chemicalTest, users) : undefined}</ChipWrapper>;
