import { DataModel } from '../../../convex/_generated/dataModel';

export const componentUIItems: {
  field: keyof DataModel['components']['document'] | 'building' | 'geometryType' | 'manufacturer';
}[] = [
  { field: 'building' },
  { field: 'condition' },
  { field: 'floor' },
  { field: 'geometryType' },
  { field: 'manufacturer' },
  { field: 'noHarmfulSubstance' },
  { field: 'planReference' },
  { field: 'price' },
  { field: 'reboundTest' },
  { field: 'visualInspection' },
  { field: 'location' }
];
