import { DestructiveTestType, UserType } from '../../dataModelTypes';

export const getDestructiveTestString = (destructiveTest: DestructiveTestType, users: UserType[]) => {
  const user = users.find((u) => u._id === destructiveTest.userId);
  return `${destructiveTest.shearStrength} - ${destructiveTest.compressiveStrength} - ${destructiveTest.tensileStrength} - ${destructiveTest.youngsModulus} - ${destructiveTest.momentCapacity} - ${destructiveTest.shearCapacity} - ${destructiveTest.normalCapacity} - ${destructiveTest.density} - ${destructiveTest.date} - ${user?.name}`;
};
