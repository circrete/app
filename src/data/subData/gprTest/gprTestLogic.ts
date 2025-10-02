import { GPRTestType, UserType } from '../../dataModelTypes';
import { getLongitudeLatitudeString } from '../location/locationLogic';

export const getGPRTestString = (gprTest: GPRTestType, users: UserType[]) => {
  let s = `${gprTest.rebarDiameter} - ${gprTest.coverDepth} - ${gprTest.rebarAmount} - ${gprTest.date} - ${users.find((u) => u._id === gprTest.userId)?.name}`;
  if (gprTest.location) s += ` - ${getLongitudeLatitudeString(gprTest.location)}`;
  return s;
};
