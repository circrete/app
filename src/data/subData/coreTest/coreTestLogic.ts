import { CoreTestType, UserType } from '../../dataModelTypes';
import { getLongitudeLatitudeString } from '../location/locationLogic';

export const getCoreTestString = (coreTest: CoreTestType, users: UserType[]) => {
  const user = users.find((u) => u._id === coreTest.userId);
  let s = `${coreTest.coreDiameter} - ${coreTest.coreCompressiveStrength} - ${coreTest.date} - ${user?.name}`;
  if (coreTest.location) s += ` - ${getLongitudeLatitudeString(coreTest.location)}`;
  return s;
};
