// all location in the project are stored in WGS84 coordinates
// hower, when drawing on a map we will be interating with its local coordinate system

import { DataModel } from '../../../../convex/_generated/dataModel';
import { LocationDataType } from '../../../data/subData/location/locationType';

const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
const toDegrees = (radians: number): number => radians * (180 / Math.PI);

const wgs84ToLocalXY = (latRef: number, lonRef: number, lat: number, lon: number): { x: number; y: number } => {
  const earthRadius = 6378137; // Earth radius in meters (WGS 84)

  // Convert degrees to radians

  const latRefRad = toRadians(latRef);
  const lonRefRad = toRadians(lonRef);
  const latRad = toRadians(lat);
  const lonRad = toRadians(lon);

  // Calculate differences
  const dLat = latRad - latRefRad;
  const dLon = lonRad - lonRefRad;

  // Project to a flat plane (simple equirectangular approximation)
  const x = earthRadius * dLon * Math.cos(latRefRad); // Adjust for latitude scale
  const y = earthRadius * dLat;

  return { x, y };
};

/**
 * Method that takes a WGS coordinate and returns in local coordinates based on the building location
 * @param building - BuildingType
 * @param location - LocationType
 */
export const getLocalCoordinates = (
  building: DataModel['buildings']['document'],
  location: LocationDataType
): { x: number; y: number; z: number } =>
  building.location
    ? {
        ...wgs84ToLocalXY(
          building.location.latitude,
          building.location.longitude,
          location.latitude,
          location.longitude
        ),
        z: location.height
      }
    : { x: 0, y: 0, z: 0 };

const localXYToWGS84 = (
  latRef: number,
  lonRef: number,
  x: number,
  y: number
): { latitude: number; longitude: number } => {
  const earthRadius = 6378137; // Earth radius in meters (WGS 84)

  // Convert degrees to radians and vice versa

  const latRefRad = toRadians(latRef);
  const lonRefRad = toRadians(lonRef);

  // Convert X, Y back to latitude and longitude
  const dLat = y / earthRadius; // Change in latitude
  const dLon = x / (earthRadius * Math.cos(latRefRad)); // Change in longitude

  const latitude = toDegrees(latRefRad + dLat); // Final latitude
  const longitude = toDegrees(lonRefRad + dLon); // Final longitude

  return { longitude, latitude };
};

/**
 * Method that takes a WGS coordinate and returns in local coordinates based on the building location
 * @param building - BuildingType
 * @param location - LocationType
 */
export const getWGSCoordinates = (
  building: DataModel['buildings']['document'],
  localPosition: { x: number; y: number; z: number }
): LocationDataType =>
  building.location
    ? {
        ...localXYToWGS84(building.location.latitude, building.location.longitude, localPosition.x, localPosition.y),
        height: localPosition.z
      }
    : { latitude: 0, longitude: 0, height: 0 };
