import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Select } from '../../uicomponents/form/Select';
import { Input } from '../../uicomponents/form/Input';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';

export const GeometryEditForm: React.FC<{
  geometry: DataModel['geometries']['document'] | null;
  crossSections: DataModel['crossSections']['document'][];
  onClose?: () => void;
}> = ({ geometry, crossSections, onClose }) => {
  const editGeometry = useMutation(api.tasks.editing.geometries.editGeometry);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: geometry?.type || '',
    componentCategory: geometry?.componentCategory || '',
    length: geometry?.length || 0,
    crossSectionId: geometry?.crossSectionId || ''
  });

  useEffect(() => {
    if (geometry) {
      setFormData({
        type: geometry.type || '',
        componentCategory: geometry.componentCategory || '',
        length: geometry.length || 0,
        crossSectionId: geometry.crossSectionId || ''
      });
    }
  }, [geometry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!geometry) return;
      await editGeometry({
        geometryId: geometry._id,
        ...formData
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to update geometry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {geometry ? (
        <div className="flex flex-col justify-start h-full gap-4">
          <div className="flex-none">
            <h2 className="text-xl font-bold mb-4">Edit Geometry</h2>
            <Label>{geometry?._id}</Label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Type"
                  value={formData.type}
                  onChange={(type) => setFormData({ ...formData, type })}
                  required
                />
                <Input
                  label="Component Category"
                  value={formData.componentCategory}
                  onChange={(componentCategory) => setFormData({ ...formData, componentCategory })}
                  required
                />
                <Input
                  label="Length"
                  number
                  step={0.1}
                  value={formData.length}
                  onChange={(length) => setFormData({ ...formData, length })}
                  required
                />
              </div>

              <Select
                label="Cross Section"
                value={formData.crossSectionId}
                onChange={(crossSectionId) => setFormData({ ...formData, crossSectionId })}
                options={crossSections.map((cs) => ({
                  label: `${cs.width}x${cs.height} - ${cs.type}`,
                  value: cs._id
                }))}
              />
            </div>
            <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
          </form>
        </div>
      ) : (
        <div className="w-[400px] text-white">*</div>
      )}
    </div>
  );
};
