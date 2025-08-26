import { type DataModel } from '../../../convex/_generated/dataModel';
import { LocationDataType } from '../location/locationType';

export type MultiEditData<T> = {
  items: T[];
  isMultiEdit: boolean;
};

export const findCommonValue = <T>(items: T[], key: keyof T): T[keyof T] | undefined => {
  if (items.length === 0) return undefined;
  if (items.length === 1) return items[0][key];

  const firstValue = items[0][key];
  const allSame = items.every((item) => item[key] === firstValue);

  return allSame ? firstValue : undefined;
};

export const findCommonString = (items: any[], key: string): string | undefined => findCommonValue(items, key);

export const findCommonNumber = (items: any[], key: string): number | undefined => findCommonValue(items, key);

export const findCommonBoolean = (items: any[], key: string): boolean | undefined => findCommonValue(items, key);

export const findDataForArrayField = <T>(items: any[], key: string): T[] => {
  if (items.length === 1) return items[0][key];
  return [];
};

const getLocationHash = (location: LocationDataType) =>
  `${location.latitude.toFixed(14)},${location.longitude.toFixed(14)},${location.height.toFixed(14)}`;

export const findCommonLocation = (items: any[], key: string): LocationDataType | undefined => {
  if (items.length === 0) return undefined;
  else if (items.length === 1) return items[0][key];

  const locationHashes = new Set<string>();
  for (const item of items) if (item[key]) locationHashes.add(getLocationHash(item[key]));

  if (locationHashes.size === 0) return undefined;
  else if (locationHashes.size === 1) return items[0][key];
  else return undefined;
};

export const shouldRequireField = (isMultiEdit: boolean): boolean => !isMultiEdit;

export const getMultiEditTitle = (singleTitle: string, count: number): string =>
  count === 0 ? 'Add new ' + singleTitle : count > 1 ? `Edit ${count} ${singleTitle}s` : singleTitle;
