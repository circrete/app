import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Select } from '../../uicomponents/form/Select';
import { Input } from '../../uicomponents/form/Input';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';
import { findCommonString, findCommonNumber, getMultiEditTitle } from '../helpers/multiEditHelpers';

export const MaterialEditForm: React.FC<{
  materials: DataModel['materials']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  onClose?: () => void;
}> = ({ materials, crossSections, onClose }) => {
  const createMaterial = useMutation(api.tasks.editing.materials.createMaterial);
  const editMaterial = useMutation(api.tasks.editing.materials.editMaterial);
  const editMultipleMaterials = useMutation(api.tasks.editing.materials.editMultipleMaterials);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequired = materials.length < 2;
  const isAdd = materials.length === 0;
  const material = materials[0]; // For single edit, use the first material

  const [formData, setFormData] = useState({
    materialCategory: findCommonString(materials, 'materialCategory'),
    exposureClass: findCommonString(materials, 'exposureClass'),
    compressiveStrength: findCommonNumber(materials, 'compressiveStrength'),
    tensileStrength: findCommonNumber(materials, 'tensileStrength'),
    density: findCommonNumber(materials, 'density'),
    elasticModulus: findCommonNumber(materials, 'elasticModulus'),
    fc0k: findCommonNumber(materials, 'fc0k'),
    fc90k: findCommonNumber(materials, 'fc90k'),
    ft0k: findCommonNumber(materials, 'ft0k'),
    ft90k: findCommonNumber(materials, 'ft90k'),
    crossSectionId: findCommonString(materials, 'crossSectionId')
  });

  useEffect(() => {
    setFormData({
      materialCategory: findCommonString(materials, 'materialCategory'),
      exposureClass: findCommonString(materials, 'exposureClass'),
      compressiveStrength: findCommonNumber(materials, 'compressiveStrength'),
      tensileStrength: findCommonNumber(materials, 'tensileStrength'),
      density: findCommonNumber(materials, 'density'),
      elasticModulus: findCommonNumber(materials, 'elasticModulus'),
      fc0k: findCommonNumber(materials, 'fc0k'),
      fc90k: findCommonNumber(materials, 'fc90k'),
      ft0k: findCommonNumber(materials, 'ft0k'),
      ft90k: findCommonNumber(materials, 'ft90k'),
      crossSectionId: findCommonString(materials, 'crossSectionId')
    });
  }, [materials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isAdd) {
        console.log('formData', formData);

        await createMaterial(formData as any);
      } else if (!isRequired) {
        await editMultipleMaterials({
          materialIds: materials.map((m) => m._id),
          ...formData
        });
      } else if (material) {
        await editMaterial({
          materialId: material._id,
          ...formData
        });
      }
      onClose?.();
    } catch (error) {
      console.error('Failed to update material(s):', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="flex flex-col justify-start h-full gap-4">
        <div className="flex-none">
          <h2 className="text-xl font-bold mb-4">{getMultiEditTitle('Material', materials.length)}</h2>
          {isAdd ? (
            <Label>Creating new material</Label>
          ) : isRequired ? (
            <Label>{material?._id}</Label>
          ) : (
            <div className="space-y-1">
              <Label>Editing {materials.length} materials</Label>
              {materials.map((m, index) => (
                <div key={m._id} className="text-sm text-gray-600">
                  {index + 1}. {m._id}
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Material Category"
                value={formData.materialCategory}
                onChange={(materialCategory) => setFormData({ ...formData, materialCategory })}
                required={isRequired}
              />
              <Input
                label="Exposure Class"
                value={formData.exposureClass}
                onChange={(exposureClass) => setFormData({ ...formData, exposureClass })}
                required={isRequired}
              />
              <Input
                label="Compressive Strength"
                number
                step={0.1}
                value={formData.compressiveStrength}
                onChange={(compressiveStrength) => setFormData({ ...formData, compressiveStrength })}
                required={isRequired}
              />
              <Input
                label="Tensile Strength"
                number
                step={0.1}
                value={formData.tensileStrength}
                onChange={(tensileStrength) => setFormData({ ...formData, tensileStrength })}
                required={isRequired}
              />
              <Input
                label="Density"
                number
                step={0.1}
                value={formData.density}
                onChange={(density) => setFormData({ ...formData, density })}
                required={isRequired}
              />
              <Input
                label="Elastic Modulus"
                number
                step={0.1}
                value={formData.elasticModulus}
                onChange={(elasticModulus) => setFormData({ ...formData, elasticModulus })}
                required={isRequired}
              />
              <Input
                label="fc0k"
                number
                step={0.1}
                value={formData.fc0k}
                onChange={(fc0k) => setFormData({ ...formData, fc0k })}
                required={isRequired}
              />
              <Input
                label="fc90k"
                number
                step={0.1}
                value={formData.fc90k}
                onChange={(fc90k) => setFormData({ ...formData, fc90k })}
                required={isRequired}
              />
              <Input
                label="ft0k"
                number
                step={0.1}
                value={formData.ft0k}
                onChange={(ft0k) => setFormData({ ...formData, ft0k })}
                required={isRequired}
              />
              <Input
                label="ft90k"
                number
                step={0.1}
                value={formData.ft90k}
                onChange={(ft90k) => setFormData({ ...formData, ft90k })}
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
