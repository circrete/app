import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Select } from '../../uicomponents/form/Select';
import { Input } from '../../uicomponents/form/Input';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';

export const RebarEditForm: React.FC<{
  rebar: DataModel['rebars']['document'] | null;
  materials: DataModel['materials']['document'][];
  onClose?: () => void;
}> = ({ rebar, materials, onClose }) => {
  const editRebar = useMutation(api.tasks.editing.rebars.editRebar);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: rebar?.type || '',
    rebarMaterialId: rebar?.rebarMaterialId || '',
    rebarEntries: rebar?.rebarEntries || []
  });

  useEffect(() => {
    if (rebar) {
      setFormData({
        type: rebar.type || '',
        rebarMaterialId: rebar.rebarMaterialId || '',
        rebarEntries: rebar.rebarEntries || []
      });
    }
  }, [rebar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!rebar) return;
      await editRebar({
        rebarId: rebar._id,
        ...formData
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to update rebar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {rebar ? (
        <div className="flex flex-col justify-start h-full gap-4">
          <div className="flex-none">
            <h2 className="text-xl font-bold mb-4">Edit Rebar</h2>
            <Label>{rebar?._id}</Label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              <Input
                label="Type"
                value={formData.type}
                onChange={(type) => setFormData({ ...formData, type })}
                required
              />

              <Select
                label="Material"
                value={formData.rebarMaterialId}
                onChange={(rebarMaterialId) => setFormData({ ...formData, rebarMaterialId })}
                options={materials.map((material) => ({
                  label: `${material.materialCategory} - ${material.exposureClass}`,
                  value: material._id
                }))}
              />

              <div>
                <label className="block text-sm font-medium mb-2">Rebar Entries</label>
                <div className="text-sm text-gray-600">{formData.rebarEntries.length} entries configured</div>
                <p className="text-xs text-gray-500 mt-1">Rebar entries editing not yet implemented</p>
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
