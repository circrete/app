import { getLongitudeLatitudeString } from '../location/locationLogic';
import { PreStressStrandType } from '../../dataModelTypes';

export const getPreStressStrandString = (preStressStrand: PreStressStrandType) => {
  let s = `${preStressStrand.steelClass} - ${preStressStrand.steelDiameter} - ${preStressStrand.amount}`;
  if (preStressStrand.location) s += ` - ${getLongitudeLatitudeString(preStressStrand.location)}`;
  return s;
};
