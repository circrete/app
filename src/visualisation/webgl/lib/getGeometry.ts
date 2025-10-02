import { DataModel } from '../../../../convex/_generated/dataModel';
import { hexToRgb, getColorForCondition } from './colors';
import { getWidthHeightLenghtForGeometryId } from './componentDataMethod';
import { getGeometryIdTypeComponentMap } from './getIdMapForTypes';
import { getLocalCoordinates } from './locationMapping';
import { GeometryDisplayType } from '../types/geometryDisplayTypes';
import { xyzToWebgl } from './coordinateSystem';

export const HORIZONTAL_SPACING = 500;
export const VERTICAL_SPACING = 100;

/**
 * Helper method to get the geometry information to render the components in the three js scene
 * @param components
 * @param building
 * @returns
 */
export const getPreprocessedGeometryDatatForComponents = (
  components: DataModel['components']['document'][],
  building: DataModel['buildings']['document'],
  geometries: DataModel['geometries']['document'][],
  crossSections: DataModel['crossSections']['document'][]
): Record<string, GeometryDisplayType> => {
  const mappedByGeometryTypeId = getGeometryIdTypeComponentMap(components);

  // get the width height length object for each of the geometries

  const returnObject: Record<string, GeometryDisplayType> = {};
  let cumulativeLength = 0;

  Object.entries(mappedByGeometryTypeId).forEach(([geometryTypeId, components]) => {
    const widthHeightLength = getWidthHeightLenghtForGeometryId(geometryTypeId, geometries, crossSections);
    if (!widthHeightLength) return;

    returnObject[geometryTypeId] = {
      widthHeightLength,
      realityPlanes: components
        .filter((c) => c.location)
        .map((c) => ({
          position: xyzToWebgl(getLocalCoordinates(building, c.location!)).map((v) => v * 1e3) as [
            number,
            number,
            number
          ],
          yaw: (c.yaw ?? 0 * Math.PI) / 180,
          componentId: c._id,
          color: hexToRgb(getColorForCondition(c.condition))
        })),
      abstractStackPlanes: components.map((c, i) => ({
        position: [
          cumulativeLength + widthHeightLength.length * 0.5,
          (widthHeightLength.height + VERTICAL_SPACING) * i,
          0
        ],
        componentId: c._id,
        yaw: 0,
        color: hexToRgb(getColorForCondition(c.condition))
      }))
    };
    cumulativeLength += widthHeightLength.length + HORIZONTAL_SPACING;
  });

  return returnObject;
};
