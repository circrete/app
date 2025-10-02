import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { getUserString } from '../users.ts/userLogic';
import { Select } from '../../uicomponents/form/Select';
import { Input } from '../../uicomponents/form/Input';
import { LocationEdit } from '../subData/location/LocationEdit';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';
import { findCommonString, findCommonNumber, findCommonLocation, getMultiEditTitle } from '../helpers/multiEditHelpers';

export const BuildingEditForm: React.FC<{
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
  onClose?: () => void;
}> = ({ buildings, users, onClose }) => {
  const createBuilding = useMutation(api.tasks.editing.buildings.createBuilding);
  const editBuilding = useMutation(api.tasks.editing.buildings.editBuilding);
  const editMultipleBuildings = useMutation(api.tasks.editing.buildings.editMultipleBuildings);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequired = buildings.length < 2;
  const isAdd = buildings.length === 0;
  const building = buildings[0]; // For single edit, use the first building

  const [formData, setFormData] = useState({
    formerUse: findCommonString(buildings, 'formerUse'),
    address: findCommonString(buildings, 'address'),
    complexity: findCommonNumber(buildings, 'complexity'),
    gfa: findCommonNumber(buildings, 'gfa'),
    img: findCommonString(buildings, 'img'),
    location: findCommonLocation(buildings, 'location'),
    ownerId: findCommonString(buildings, 'ownerId'),
    buildingYaw: findCommonNumber(buildings, 'buildingYaw')
  });

  console.log(isAdd);

  useEffect(() => {
    setFormData({
      formerUse: findCommonString(buildings, 'formerUse'),
      address: findCommonString(buildings, 'address'),
      complexity: findCommonNumber(buildings, 'complexity'),
      gfa: findCommonNumber(buildings, 'gfa'),
      img: findCommonString(buildings, 'img'),
      location: findCommonLocation(buildings, 'location'),
      ownerId: findCommonString(buildings, 'ownerId'),
      buildingYaw: findCommonNumber(buildings, 'buildingYaw')
    });
  }, [buildings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isAdd) {
        await createBuilding(formData as any);
      } else if (!isRequired) {
        await editMultipleBuildings({
          buildingIds: buildings.map((b) => b._id),
          formerUse: formData.formerUse,
          address: formData.address,
          complexity: formData.complexity,
          gfa: formData.gfa,
          img: formData.img,
          location: formData.location,
          ownerId: formData.ownerId
        });
      } else if (building) {
        await editBuilding({
          buildingId: building._id,
          formerUse: formData.formerUse,
          address: formData.address,
          complexity: formData.complexity,
          gfa: formData.gfa,
          img: formData.img,
          location: formData.location,
          ownerId: formData.ownerId
        });
      }
      onClose?.();
    } catch (error) {
      console.error('Failed to update building(s):', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="flex flex-col justify-start h-full gap-4">
        <div className="flex-none">
          <h2 className="text-xl font-bold mb-4">{getMultiEditTitle('Building', buildings.length)}</h2>
          {isAdd ? (
            <Label>Creating new building</Label>
          ) : isRequired ? (
            <Label>{building?._id}</Label>
          ) : (
            <div className="space-y-1">
              <Label>Editing {buildings.length} buildings</Label>
              {buildings.map((b, index) => (
                <div key={b._id} className="text-sm text-gray-600">
                  {index + 1}. {b._id}
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            <Input
              label="Former Use"
              value={formData.formerUse ?? ''}
              onChange={(formerUse) => setFormData({ ...formData, formerUse })}
              required={isRequired}
            />
            <Input
              label="Address"
              value={formData.address ?? ''}
              onChange={(address) => setFormData({ ...formData, address })}
              required={isRequired}
            />
            <Select
              label="Owner"
              value={formData.ownerId ?? ''}
              onChange={(ownerId) => setFormData({ ...formData, ownerId })}
              required={isRequired}
              options={users.map((user) => ({ label: getUserString(user), value: user._id }))}
            />
            <Input
              label="Complexity"
              number
              step={0.1}
              value={formData.complexity ?? 0}
              onChange={(complexity) => setFormData({ ...formData, complexity })}
              required={isRequired}
            />
            <Input
              label="GFA"
              number
              step={0.1}
              value={formData.gfa ?? 0}
              onChange={(gfa) => setFormData({ ...formData, gfa })}
              required={isRequired}
            />
            <Input
              label="Building Yaw"
              number
              step={0.1}
              value={formData.buildingYaw ?? 0}
              onChange={(buildingYaw) => setFormData({ ...formData, buildingYaw })}
              required={isRequired}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={formData.img}
                onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <LocationEdit
              location={formData.location}
              onChange={(location) => setFormData({ ...formData, location })}
              required={false}
            />
          </div>
          <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};
