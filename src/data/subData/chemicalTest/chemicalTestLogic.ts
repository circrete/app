import { ChemicalTestType, UserType } from '../../dataModelTypes';

export const getChemicalTestString = (chemicalTest: ChemicalTestType, users: UserType[]) => {
  const user = users.find((u) => u._id === chemicalTest.userId);
  return `${chemicalTest.carbonationDepth} - ${chemicalTest.chlorideContent} - ${chemicalTest.alkaliReactivity} - ${chemicalTest.date} - ${user?.name}`;
};
