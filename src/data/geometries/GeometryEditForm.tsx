import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Input } from '../../uicomponents/form/Input';
import { Select } from '../../uicomponents/form/Select';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';
import { findCommonString, findCommonNumber, getMultiEditTitle } from '../helpers/multiEditHelpers';

export const GeometryEditForm: React.FC<{
  geometries: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  onClose?: () => void;
}> = ({ geometries, crossSections, onClose }) => {
  const createGeometry = useMutation(api.tasks.editing.geometries.createGeometry);
  const editGeometry = useMutation(api.tasks.editing.geometries.editGeometry);
  const editMultipleGeometries = useMutation(api.tasks.editing.geometries.editMultipleGeometries);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequired = geometries.length < 2;
  const isAdd = geometries.length === 0;
  const geometry = geometries[0]; // For single edit, use the first geometry

  const [formData, setFormData] = useState({
    type: findCommonString(geometries, 'type'),
    componentCategory: findCommonString(geometries, 'componentCategory'),
    length: findCommonNumber(geometries, 'length'),
    crossSectionId: findCommonString(geometries, 'crossSectionId')
  });

  useEffect(() => {
    setFormData({
      type: findCommonString(geometries, 'type'),
      componentCategory: findCommonString(geometries, 'componentCategory'),
      length: findCommonNumber(geometries, 'length'),
      crossSectionId: findCommonString(geometries, 'crossSectionId')
    });
  }, [geometries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isAdd) {
        await createGeometry(formData as any);
      } else if (!isRequired) {
        await editMultipleGeometries({
          geometryIds: geometries.map((g) => g._id),
          ...formData
        });
      } else if (geometry) {
        await editGeometry({
          geometryId: geometry._id,
          ...formData
        });
      }
      onClose?.();
    } catch (error) {
      console.error('Failed to update geometry(ies):', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="flex flex-col justify-start h-full gap-4">
        <div className="flex-none">
          <h2 className="text-xl font-bold mb-4">{getMultiEditTitle('Geometry', geometries.length)}</h2>
          {isAdd ? (
            <Label>Creating new geometry</Label>
          ) : isRequired ? (
            <Label>{geometry?._id}</Label>
          ) : (
            <div className="space-y-1">
              <Label>Editing {geometries.length} geometries</Label>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Type"
                value={formData.type}
                onChange={(type) => setFormData({ ...formData, type })}
                required={isRequired}
              />
              <Input
                label="Component Category"
                value={formData.componentCategory}
                onChange={(componentCategory) => setFormData({ ...formData, componentCategory })}
                required={isRequired}
              />
              <Input
                label="Length"
                number
                step={0.1}
                value={formData.length}
                onChange={(length) => setFormData({ ...formData, length })}
                required={isRequired}
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
              required={isRequired}
            />
          </div>
          <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};
