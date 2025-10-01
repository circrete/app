import { CoreTestType, UserType } from '../../dataModelTypes';
import { getLongitudeLatitudeString } from '../location/locationLogic';

export const getCoreTestString = (coreTest: CoreTestType, users: UserType[]) => {
  const user = users.find((u) => u._id === coreTest.userId);
  return `${coreTest.coreDiameter} - ${coreTest.coreCompressiveStrength} - ${coreTest.date} - ${user?.name} - ${getLongitudeLatitudeString(coreTest.location)}`;
};
