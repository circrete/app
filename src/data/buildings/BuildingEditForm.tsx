import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { getUserString } from '../users.ts/userLogic';
import { Select } from '../../uicomponents/form/Select';
import { Input } from '../../uicomponents/form/Input';
import { LocationEdit } from '../location/LocationEdit';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';

export const BuildingEditForm: React.FC<{
  building: DataModel['buildings']['document'] | null;
  users: DataModel['users']['document'][];
  onClose?: () => void;
}> = ({ building, users, onClose }) => {
  const editBuilding = useMutation(api.tasks.editing.buildings.editBuilding);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: building?.type,
    formerUse: building?.formerUse,
    address: building?.address,
    complexity: building?.complexity,
    gfa: building?.gfa,
    img: building?.img,
    location: building?.location || { height: 0, latitude: 0, longitude: 0 },
    ownerId: building?.ownerId
  });

  useEffect(() => {
    setFormData({
      type: building?.type,
      formerUse: building?.formerUse,
      address: building?.address,
      complexity: building?.complexity,
      gfa: building?.gfa,
      img: building?.img,
      location: building?.location || { height: 0, latitude: 0, longitude: 0 },
      ownerId: building?.ownerId
    });
  }, [building]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!building) return;
      await editBuilding({
        buildingId: building._id,
        type: formData.type,
        formerUse: formData.formerUse,
        address: formData.address,
        complexity: formData.complexity,
        gfa: formData.gfa,
        img: formData.img,
        location: formData.location,
        ownerId: formData.ownerId
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to update building:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {building ? (
        <div className="flex flex-col justify-start h-full gap-4">
          <div className="flex-none">
            <h2 className="text-xl font-bold mb-4">Edit Building</h2>
            <Label>{building?._id}</Label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              <Input
                label="Building Type"
                value={formData.type ?? ''}
                onChange={(type) => setFormData({ ...formData, type })}
                required
              />
              <Input
                label="Former Use"
                value={formData.formerUse ?? ''}
                onChange={(formerUse) => setFormData({ ...formData, formerUse })}
                required
              />
              <Input
                label="Address"
                value={formData.address ?? ''}
                onChange={(address) => setFormData({ ...formData, address })}
                required
              />
              <Select
                label="Owner"
                value={formData.ownerId ?? ''}
                onChange={(ownerId) => setFormData({ ...formData, ownerId })}
                required
                options={users.map((user) => ({ label: getUserString(user), value: user._id }))}
              />
              <Input
                label="Complexity"
                number
                step={0.1}
                value={formData.complexity ?? 0}
                onChange={(complexity) => setFormData({ ...formData, complexity })}
                required
              />
              <Input
                label="GFA"
                number
                step={0.1}
                value={formData.gfa ?? 0}
                onChange={(gfa) => setFormData({ ...formData, gfa })}
                required
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
              />
              <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
      ) : (
        <div className="w-[400px] text-white">*</div>
      )}
    </div>
  );
};
