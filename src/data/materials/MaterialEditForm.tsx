import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Select } from '../../uicomponents/form/Select';
import { Input } from '../../uicomponents/form/Input';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';

export const MaterialEditForm: React.FC<{
  material: DataModel['materials']['document'] | null;
  crossSections: DataModel['crossSections']['document'][];
  onClose?: () => void;
}> = ({ material, crossSections, onClose }) => {
  const editMaterial = useMutation(api.tasks.editing.materials.editMaterial);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    materialCategory: material?.materialCategory || '',
    exposureClass: material?.exposureClass || '',
    compressiveStrength: material?.compressiveStrength || 0,
    tensileStrength: material?.tensileStrength || 0,
    density: material?.density || 0,
    elasticModulus: material?.elasticModulus || 0,
    fc0k: material?.fc0k || 0,
    fc90k: material?.fc90k || 0,
    ft0k: material?.ft0k || 0,
    ft90k: material?.ft90k || 0,
    crossSectionId: material?.crossSectionId || ''
  });

  useEffect(() => {
    if (material) {
      setFormData({
        materialCategory: material.materialCategory || '',
        exposureClass: material.exposureClass || '',
        compressiveStrength: material.compressiveStrength || 0,
        tensileStrength: material.tensileStrength || 0,
        density: material.density || 0,
        elasticModulus: material.elasticModulus || 0,
        fc0k: material.fc0k || 0,
        fc90k: material.fc90k || 0,
        ft0k: material.ft0k || 0,
        ft90k: material.ft90k || 0,
        crossSectionId: material.crossSectionId || ''
      });
    }
  }, [material]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!material) return;
      await editMaterial({
        materialId: material._id,
        ...formData
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to update material:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {material ? (
        <div className="flex flex-col justify-start h-full gap-4">
          <div className="flex-none">
            <h2 className="text-xl font-bold mb-4">Edit Material</h2>
            <Label>{material?._id}</Label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Material Category"
                  value={formData.materialCategory}
                  onChange={(materialCategory) => setFormData({ ...formData, materialCategory })}
                  required
                />
                <Input
                  label="Exposure Class"
                  value={formData.exposureClass}
                  onChange={(exposureClass) => setFormData({ ...formData, exposureClass })}
                  required
                />
                <Input
                  label="Compressive Strength"
                  number
                  step={0.1}
                  value={formData.compressiveStrength}
                  onChange={(compressiveStrength) => setFormData({ ...formData, compressiveStrength })}
                  required
                />
                <Input
                  label="Tensile Strength"
                  number
                  step={0.1}
                  value={formData.tensileStrength}
                  onChange={(tensileStrength) => setFormData({ ...formData, tensileStrength })}
                  required
                />
                <Input
                  label="Density"
                  number
                  step={0.1}
                  value={formData.density}
                  onChange={(density) => setFormData({ ...formData, density })}
                  required
                />
                <Input
                  label="Elastic Modulus"
                  number
                  step={0.1}
                  value={formData.elasticModulus}
                  onChange={(elasticModulus) => setFormData({ ...formData, elasticModulus })}
                  required
                />
                <Input
                  label="fc0k"
                  number
                  step={0.1}
                  value={formData.fc0k}
                  onChange={(fc0k) => setFormData({ ...formData, fc0k })}
                  required
                />
                <Input
                  label="fc90k"
                  number
                  step={0.1}
                  value={formData.fc90k}
                  onChange={(fc90k) => setFormData({ ...formData, fc90k })}
                  required
                />
                <Input
                  label="ft0k"
                  number
                  step={0.1}
                  value={formData.ft0k}
                  onChange={(ft0k) => setFormData({ ...formData, ft0k })}
                  required
                />
                <Input
                  label="ft90k"
                  number
                  step={0.1}
                  value={formData.ft90k}
                  onChange={(ft90k) => setFormData({ ...formData, ft90k })}
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
