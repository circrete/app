import { DataModel } from '../../../convex/_generated/dataModel';

export const getCenterForBuildings = (buildings: DataModel['buildings']['document'][]) => {
  if (buildings.length === 0)
    return {
      lat: 56.16906618295538,
      lng: 10.157261935492112
    };

  const center = buildings.reduce(
    (acc, building) => {
      if (building.location) {
        acc.lat += building.location.latitude;
        acc.lng += building.location.longitude;
      }
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  return { lat: center.lat / buildings.length, lng: center.lng / buildings.length };
};
