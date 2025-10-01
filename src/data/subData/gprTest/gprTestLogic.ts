import { GPRTestType, UserType } from '../../dataModelTypes';
import { getLongitudeLatitudeString } from '../location/locationLogic';

export const getGPRTestString = (gprTest: GPRTestType, users: UserType[]) =>
  `${gprTest.rebarDiameter} - ${gprTest.coverDepth} - ${gprTest.rebarAmount} - ${gprTest.date} - ${users.find((u) => u._id === gprTest.userId)?.name} - ${getLongitudeLatitudeString(gprTest.location)}`;
