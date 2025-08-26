import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Select } from '../../uicomponents/form/Select';
import { Input } from '../../uicomponents/form/Input';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';

export const CrossSectionEditForm: React.FC<{
  crossSection: DataModel['crossSections']['document'] | null;
  materials: DataModel['materials']['document'][];
  rebars: DataModel['rebars']['document'][];
  users: DataModel['users']['document'][];
  onClose?: () => void;
}> = ({ crossSection, materials, rebars, users, onClose }) => {
  const editCrossSection = useMutation(api.tasks.editing.crossSections.editCrossSection);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: crossSection?.type || '',
    crossSectionCategory: crossSection?.crossSectionCategory || '',
    height: crossSection?.height || 0,
    width: crossSection?.width || 0,
    concreteMaterialTypeId: crossSection?.concreteMaterialTypeId || '',
    rebarTypeId: crossSection?.rebarTypeId || '',
    moment: crossSection?.moment || 0,
    normal: crossSection?.normal || 0,
    shear: crossSection?.shear || 0
  });

  useEffect(() => {
    if (crossSection) {
      setFormData({
        type: crossSection.type || '',
        crossSectionCategory: crossSection.crossSectionCategory || '',
        height: crossSection.height || 0,
        width: crossSection.width || 0,
        concreteMaterialTypeId: crossSection.concreteMaterialTypeId || '',
        rebarTypeId: crossSection.rebarTypeId || '',
        moment: crossSection.moment || 0,
        normal: crossSection.normal || 0,
        shear: crossSection.shear || 0
      });
    }
  }, [crossSection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!crossSection) return;
      await editCrossSection({
        crossSectionId: crossSection._id,
        ...formData
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to update cross section:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {crossSection ? (
        <div className="flex flex-col justify-start h-full gap-4">
          <div className="flex-none">
            <h2 className="text-xl font-bold mb-4">Edit Cross Section</h2>
            <Label>{crossSection?._id}</Label>
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
                  label="Category"
                  value={formData.crossSectionCategory}
                  onChange={(crossSectionCategory) => setFormData({ ...formData, crossSectionCategory })}
                  required
                />
                <Input
                  label="Height"
                  number
                  step={0.1}
                  value={formData.height}
                  onChange={(height) => setFormData({ ...formData, height })}
                  required
                />
                <Input
                  label="Width"
                  number
                  step={0.1}
                  value={formData.width}
                  onChange={(width) => setFormData({ ...formData, width })}
                  required
                />
                <Input
                  label="Moment"
                  number
                  step={0.1}
                  value={formData.moment}
                  onChange={(moment) => setFormData({ ...formData, moment })}
                  required
                />
                <Input
                  label="Normal"
                  number
                  step={0.1}
                  value={formData.normal}
                  onChange={(normal) => setFormData({ ...formData, normal })}
                  required
                />
                <Input
                  label="Shear"
                  number
                  step={0.1}
                  value={formData.shear}
                  onChange={(shear) => setFormData({ ...formData, shear })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Concrete Material"
                  value={formData.concreteMaterialTypeId}
                  onChange={(concreteMaterialTypeId) => setFormData({ ...formData, concreteMaterialTypeId })}
                  required
                  options={materials.map((material) => ({
                    label: `${material.materialCategory} - ${material.exposureClass}`,
                    value: material._id
                  }))}
                />
                <Select
                  label="Rebar Type"
                  value={formData.rebarTypeId}
                  onChange={(rebarTypeId) => setFormData({ ...formData, rebarTypeId })}
                  options={rebars.map((rebar) => ({
                    label: `${rebar.type} (${rebar.rebarEntries.length} entries)`,
                    value: rebar._id
                  }))}
                />
              </div>
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
