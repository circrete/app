import { DataModel, TableNames } from '../../../convex/_generated/dataModel';

/**
 * Helper method to get an idMap for a Type T
 * @param objects - Type `Array<T>`
 * @returns `Record<T.id, T>`
 */
export const getIdMap = <T extends DataModel[TableNames]['document']>(objects: T[]) =>
  Object.fromEntries(objects.map((t) => [t._id, t]));

/**
 * Helper method to get Components mapped by geometryId
 * @param components - `DataModel['components']['document'][]`
 * @returns `Record<string, DataModel['components']['document'][]>`
 */
export const getGeometryIdTypeComponentMap = (
  components: DataModel['components']['document'][]
): Record<string, DataModel['components']['document'][]> => {
  const geometryIdTypeComponentMap: Record<string, DataModel['components']['document'][]> = {};
  for (const component of components)
    if (component.geometryTypeId)
      geometryIdTypeComponentMap[component.geometryTypeId]
        ? geometryIdTypeComponentMap[component.geometryTypeId].push(component)
        : (geometryIdTypeComponentMap[component.geometryTypeId] = [component]);
  return geometryIdTypeComponentMap;
};
