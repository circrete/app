import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { getGeometryString } from '../geometries/geometryLogic';
import { getUserString } from '../users.ts/userLogic';
import { Input } from '../../uicomponents/form/Input';
import { Select } from '../../uicomponents/form/Select';
import { Checkbox } from '../../uicomponents/form/Checkbox';
import { LocationEdit } from '../location/LocationEdit';
import { getBuildingString } from '../buildings/buildingLogic';
import { Label } from '../../uicomponents/form/Label';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';

export const ComponentEditForm: React.FC<{
  component: DataModel['components']['document'] | null;
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
  geometries: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
  onClose?: () => void;
}> = ({ component, buildings, users, geometries, crossSections, materials, onClose }) => {
  const editComponent = useMutation(api.tasks.editing.components.editComponent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: component?.type || '',
    condition: component?.condition || '',
    floor: component?.floor || 0,
    location: component?.location || { height: 0, latitude: 0, longitude: 0 },
    price: component?.price || 0,
    yaw: component?.yaw || 0,
    liveload: component?.liveload || 0,
    loadingCondition: component?.loadingCondition || '',
    availableFrom: component?.availableFrom || '',
    buyer: component?.buyer || '',
    planReference: component?.planReference || '',
    noHarmfulSubstance: component?.noHarmfulSubstance || false,
    buildingId: component?.buildingId || '',
    geometryTypeId: component?.geometryTypeId || '',
    manufacturerId: component?.manufacturerId || '',
    img: component?.img || [],
    reboundTest: component?.reboundTest || [],
    visualInspection: component?.visualInspection || []
  });

  useEffect(() => {
    if (component) {
      setFormData({
        type: component.type || '',
        condition: component.condition || '',
        floor: component.floor || 0,
        location: component.location || { height: 0, latitude: 0, longitude: 0 },
        price: component.price || 0,
        yaw: component.yaw || 0,
        liveload: component.liveload || 0,
        loadingCondition: component.loadingCondition || '',
        availableFrom: component.availableFrom || '',
        buyer: component.buyer || '',
        planReference: component.planReference || '',
        noHarmfulSubstance: component.noHarmfulSubstance || false,
        buildingId: component.buildingId || '',
        geometryTypeId: component.geometryTypeId || '',
        manufacturerId: component.manufacturerId || '',
        img: component.img || [],
        reboundTest: component.reboundTest || [],
        visualInspection: component.visualInspection || []
      });
    }
  }, [component]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!component) return;
      await editComponent({
        componentId: component._id,
        ...formData
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to update component:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {component ? (
        <div className="flex flex-col justify-start h-full gap-4">
          <div className="flex-none">
            <h2 className="text-xl font-bold mb-4">Edit Component</h2>
            <Label>{component?._id}</Label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Type"
                  value={formData.type}
                  onChange={(type: string) => setFormData({ ...formData, type })}
                  required
                />
                <Input
                  label="Condition"
                  value={formData.condition}
                  onChange={(condition: string) => setFormData({ ...formData, condition })}
                  required
                />
                <Input
                  label="Floor"
                  number
                  step={0.5}
                  value={formData.floor}
                  onChange={(floor: number) => setFormData({ ...formData, floor })}
                  required
                />
                <Input
                  label="Price"
                  number
                  step={1.0}
                  value={formData.price}
                  onChange={(price: number) => setFormData({ ...formData, price })}
                  required
                />
                <Input
                  label="Yaw"
                  number
                  step={0.5}
                  value={formData.yaw}
                  onChange={(yaw: number) => setFormData({ ...formData, yaw })}
                  required
                />
                <Input
                  label="Live Load"
                  number
                  step={0.5}
                  value={formData.liveload}
                  onChange={(liveload: number) => setFormData({ ...formData, liveload })}
                  required
                />
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Loading Condition"
                  value={formData.loadingCondition}
                  onChange={(loadingCondition: string) => setFormData({ ...formData, loadingCondition })}
                  required
                />
                <Input
                  label="Available From"
                  value={formData.availableFrom}
                  onChange={(availableFrom: string) => setFormData({ ...formData, availableFrom })}
                  required
                />
                <Input
                  label="Buyer"
                  value={formData.buyer}
                  onChange={(buyer: string) => setFormData({ ...formData, buyer })}
                  required
                />
                <Input
                  label="Plan Reference"
                  value={formData.planReference}
                  onChange={(planReference: string) => setFormData({ ...formData, planReference })}
                  required
                />
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Building"
                  value={formData.buildingId}
                  onChange={(buildingId: string) => setFormData({ ...formData, buildingId })}
                  required
                  options={buildings.map((building) => ({
                    label: getBuildingString(building),
                    value: building._id
                  }))}
                />
                <Select
                  label="Geometry Type"
                  value={formData.geometryTypeId}
                  onChange={(geometryTypeId: string) => setFormData({ ...formData, geometryTypeId })}
                  required
                  options={geometries.map((geometry) => ({
                    label: getGeometryString(geometry, crossSections, materials),
                    value: geometry._id
                  }))}
                />
                <Select
                  label="Manufacturer"
                  value={formData.manufacturerId}
                  onChange={(manufacturerId: string) => setFormData({ ...formData, manufacturerId })}
                  required
                  options={users.map((user) => ({ label: getUserString(user), value: user._id }))}
                />
              </div>

              {/* Checkbox */}
              <div>
                <Checkbox
                  label="No Harmful Substance"
                  value={formData.noHarmfulSubstance}
                  onChange={(noHarmfulSubstance: boolean) => setFormData({ ...formData, noHarmfulSubstance })}
                />
              </div>

              {/* Location Fields */}
              <div className="border-t pt-4">
                <LocationEdit
                  location={formData.location}
                  onChange={(location) => setFormData({ ...formData, location })}
                />
              </div>
            </div>
            {/* Submit Button */}
            <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
          </form>
        </div>
      ) : (
        <div className="min-w-[400px] text-white">*</div>
      )}
    </div>
  );
};
