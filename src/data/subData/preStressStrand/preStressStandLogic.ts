import { getLongitudeLatitudeString } from '../location/locationLogic';
import { PreStressStrandType } from '../../dataModelTypes';

export const getPreStressStrandString = (preStressStrand: PreStressStrandType) =>
  `${preStressStrand.steelClass} - ${preStressStrand.steelDiameter} - ${preStressStrand.amount} - ${getLongitudeLatitudeString(preStressStrand.location)}`;
