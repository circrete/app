import { LocationType } from '../../dataModelTypes';

/**
 * String formatted as degrees, minutes, seconds
 * @param location
 * @returns string representation of the location
 */
export const getLongitudeLatitudeString = (
  location: LocationType,
  detailLevel: 'minutes' | 'seconds' | 'centiseconds' = 'minutes'
) => {
  const longitude = location.longitude;
  const latitude = location.latitude;

  const longitudeDegrees = Math.floor(longitude).toFixed(0);
  const longitudeMinutes = Math.floor((longitude * 60) % 60).toFixed(0);
  const longitudeSeconds =
    detailLevel === 'seconds'
      ? Math.floor((longitude * 3600) % 60).toFixed(0)
      : (Math.floor((longitude * 360000) % 6000) / 100).toFixed(2);
  const longitudeDirection = longitude < 0 ? 'W' : 'E';

  const latitudeDegrees = Math.floor(latitude).toFixed(0);
  const latitudeMinutes = Math.floor((latitude * 60) % 60).toFixed(0);
  const latitudeSeconds =
    detailLevel === 'seconds'
      ? Math.floor((latitude * 3600) % 60).toFixed(0)
      : (Math.floor((latitude * 360000) % 6000) / 100).toFixed(2);
  const latitudeDirection = latitude < 0 ? 'S' : 'N';

  return detailLevel === 'minutes'
    ? `${longitudeDegrees}°${longitudeMinutes}'${longitudeDirection} ${latitudeDegrees}°${latitudeMinutes}'${latitudeDirection} ${location.height.toFixed(1)}m`
    : `${longitudeDegrees}°${longitudeMinutes}'${longitudeSeconds}"${longitudeDirection} ${latitudeDegrees}°${latitudeMinutes}'${latitudeSeconds}"${latitudeDirection} ${location.height.toFixed(1)}m`;
};
