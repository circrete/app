import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { getGeometryString } from '../geometries/geometryLogic';
import { getUserString } from '../users.ts/userLogic';
import { Input } from '../../uicomponents/form/Input';
import { Select } from '../../uicomponents/form/Select';
import { Checkbox } from '../../uicomponents/form/Checkbox';
import { LocationEdit } from '../subData/location/LocationEdit';
import { getBuildingString } from '../buildings/buildingLogic';
import { Label } from '../../uicomponents/form/Label';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import {
  findCommonString,
  findCommonNumber,
  findCommonBoolean,
  findCommonLocation,
  getMultiEditTitle,
  findDataForArrayField
} from '../helpers/multiEditHelpers';
import { VisualInspectionMultiEdit } from '../subData/visualInspection/VisualInspectionMultiEdit';
import { ReboundTestType, UserType, VisualInspectionType, ComponentType } from '../dataModelTypes';
import { ReboundTestMultiEdit } from '../subData/reboundTest/ReboundTestMultiEdit';

export const ComponentEditForm: React.FC<{
  components: DataModel['components']['document'][];
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
  geometries: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
  onClose: () => void;
}> = ({ components, buildings, users, geometries, crossSections, materials, onClose }) => {
  const createComponent = useMutation(api.tasks.editing.components.createComponent);
  const editComponent = useMutation(api.tasks.editing.components.editComponent);
  const editMultipleComponents = useMutation(api.tasks.editing.components.editMultipleComponents);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequired = components.length < 2;
  const isAdd = components.length === 0;
  const component = components[0]; // For single edit, use the first component

  const [formData, setFormData] = useState({
    condition: findCommonString(components, 'condition'),
    floor: findCommonNumber(components, 'floor'),
    location: findCommonLocation(components, 'location'),
    price: findCommonNumber(components, 'price'),
    yaw: findCommonNumber(components, 'yaw'),
    liveload: findCommonNumber(components, 'liveload'),
    loadingCondition: findCommonString(components, 'loadingCondition'),
    availableFrom: findCommonString(components, 'availableFrom'),
    buyer: findCommonString(components, 'buyer'),
    planReference: findCommonString(components, 'planReference'),
    noHarmfulSubstance: findCommonBoolean(components, 'noHarmfulSubstance'),
    buildingId: findCommonString(components, 'buildingId'),
    geometryTypeId: findCommonString(components, 'geometryTypeId'),
    manufacturerId: findCommonString(components, 'manufacturerId'),
    img: [],
    reboundTest: [] as ReboundTestType[],
    visualInspection: [] as VisualInspectionType[]
  });

  useEffect(() => {
    setFormData({
      condition: findCommonString(components, 'condition'),
      floor: findCommonNumber(components, 'floor'),
      location: findCommonLocation(components, 'location'),
      price: findCommonNumber(components, 'price'),
      yaw: findCommonNumber(components, 'yaw'),
      liveload: findCommonNumber(components, 'liveload'),
      loadingCondition: findCommonString(components, 'loadingCondition'),
      availableFrom: findCommonString(components, 'availableFrom'),
      buyer: findCommonString(components, 'buyer'),
      planReference: findCommonString(components, 'planReference'),
      noHarmfulSubstance: findCommonBoolean(components, 'noHarmfulSubstance'),
      buildingId: findCommonString(components, 'buildingId'),
      geometryTypeId: findCommonString(components, 'geometryTypeId'),
      manufacturerId: findCommonString(components, 'manufacturerId'),
      img: findDataForArrayField(components, 'img'),
      reboundTest: findDataForArrayField(components, 'reboundTest'),
      visualInspection: findDataForArrayField(components, 'visualInspection')
    });
  }, [components]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isAdd) {
        await createComponent(formData as any);
      } else if (!isRequired) {
        await editMultipleComponents({
          componentIds: components.map((c) => c._id),
          ...formData
        });
      } else if (component) {
        await editComponent({
          componentId: component._id,
          ...formData
        });
      }
    } catch (error) {
      console.error('Failed to update component(s):', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="flex flex-col justify-start h-full gap-4">
        <div className="flex-none">
          <h2 className="text-xl font-bold mb-4">{getMultiEditTitle('Component', components.length)}</h2>
          {isAdd ? <Label>Creating new component</Label> : isRequired ? <Label>{component?._id}</Label> : null}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Condition"
                value={formData.condition}
                onChange={(condition: string) => setFormData({ ...formData, condition })}
                required={isRequired}
              />
              <Input
                label="Floor"
                number
                step={0.5}
                value={formData.floor}
                onChange={(floor: number) => setFormData({ ...formData, floor })}
                required={isRequired}
              />
              <Input
                label="Price"
                number
                step={1.0}
                value={formData.price}
                onChange={(price: number) => setFormData({ ...formData, price })}
                required={isRequired}
              />
              <Input
                label="Yaw"
                number
                step={0.5}
                value={formData.yaw}
                onChange={(yaw: number) => setFormData({ ...formData, yaw })}
                required={isRequired}
              />
              <Input
                label="Live Load"
                number
                step={0.5}
                value={formData.liveload}
                onChange={(liveload: number) => setFormData({ ...formData, liveload })}
                required={isRequired}
              />
            </div>

            {/* Text Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Loading Condition"
                value={formData.loadingCondition}
                onChange={(loadingCondition: string) => setFormData({ ...formData, loadingCondition })}
                required={isRequired}
              />
              <Input
                label="Available From"
                value={formData.availableFrom}
                onChange={(availableFrom: string) => setFormData({ ...formData, availableFrom })}
                required={isRequired}
              />
              <Input
                label="Buyer"
                value={formData.buyer}
                onChange={(buyer: string) => setFormData({ ...formData, buyer })}
                required={isRequired}
              />
              <Input
                label="Plan Reference"
                value={formData.planReference}
                onChange={(planReference: string) => setFormData({ ...formData, planReference })}
                required={isRequired}
              />
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Select
                label="Building"
                value={formData.buildingId}
                onChange={(buildingId: string) => setFormData({ ...formData, buildingId })}
                required={isRequired}
                options={buildings.map((building) => ({
                  label: getBuildingString(building),
                  value: building._id
                }))}
              />
              <Select
                label="Geometry Type"
                value={formData.geometryTypeId}
                onChange={(geometryTypeId: string) => setFormData({ ...formData, geometryTypeId })}
                required={isRequired}
                options={geometries.map((geometry) => ({
                  label: getGeometryString(geometry, crossSections, materials),
                  value: geometry._id
                }))}
              />
              <Select
                label="Manufacturer"
                value={formData.manufacturerId}
                onChange={(manufacturerId: string) => setFormData({ ...formData, manufacturerId })}
                required={isRequired}
                options={users.map((user) => ({ label: getUserString(user), value: user._id }))}
              />
            </div>

            {/* Checkbox */}
            <div>
              <Checkbox
                label="No Harmful Substance"
                required={false}
                value={formData.noHarmfulSubstance}
                onChange={(noHarmfulSubstance: boolean) => setFormData({ ...formData, noHarmfulSubstance })}
              />
            </div>

            {/* Location Fields */}
            <div className="border-t pt-4">
              <LocationEdit
                required={isRequired}
                location={formData.location}
                onChange={(location) => setFormData({ ...formData, location })}
              />
            </div>

            <h3 className="text-lg font-bold border-t pt-4">Visual Inspections</h3>
            <VisualInspectionMultiEdit
              component={component as ComponentType}
              visualInspections={formData.visualInspection}
              users={users as UserType[]}
              onChange={(visualInspection) => setFormData({ ...formData, visualInspection })}
            />

            <h3 className="text-lg font-bold border-t pt-4">Rebound Tests</h3>
            <ReboundTestMultiEdit
              component={component as ComponentType}
              reboundTests={formData.reboundTest}
              users={users as UserType[]}
              onChange={(reboundTest) => setFormData({ ...formData, reboundTest })}
            />
          </div>
          {/* Submit Button */}
          <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};
