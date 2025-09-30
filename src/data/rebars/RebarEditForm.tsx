import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Input } from '../../uicomponents/form/Input';
import { Select } from '../../uicomponents/form/Select';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';
import { findCommonString, findDataForArrayField, getMultiEditTitle } from '../helpers/multiEditHelpers';

export const RebarEditForm: React.FC<{
  rebars: DataModel['rebars']['document'][];
  materials: DataModel['materials']['document'][];
  onClose?: () => void;
}> = ({ rebars, materials, onClose }) => {
  const createRebar = useMutation(api.tasks.editing.rebars.createRebar);
  const editRebar = useMutation(api.tasks.editing.rebars.editRebar);
  const editMultipleRebars = useMutation(api.tasks.editing.rebars.editMultipleRebars);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequired = rebars.length < 2;
  const isAdd = rebars.length === 0;
  const rebar = rebars[0]; // For single edit, use the first rebar

  const [formData, setFormData] = useState({
    rebarMaterialId: findCommonString(rebars, 'rebarMaterialId'),
    rebarEntries: findDataForArrayField(rebars, 'rebarEntries')
  });

  useEffect(() => {
    setFormData({
      rebarMaterialId: findCommonString(rebars, 'rebarMaterialId'),
      rebarEntries: findDataForArrayField(rebars, 'rebarEntries')
    });
  }, [rebars]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isAdd) {
        await createRebar(formData as any);
      } else if (!isRequired) {
        // @ts-ignore
        await editMultipleRebars({
          rebarIds: rebars.map((r) => r._id),
          ...formData
        });
      } else if (rebar) {
        // @ts-ignore
        await editRebar({
          rebarId: rebar._id,
          ...formData
        });
      }
      onClose?.();
    } catch (error) {
      console.error('Failed to update rebar(s):', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="flex flex-col justify-start h-full gap-4">
        <div className="flex-none">
          <h2 className="text-xl font-bold mb-4">{getMultiEditTitle('Rebar', rebars.length)}</h2>
          {isAdd ? (
            <Label>Creating new rebar</Label>
          ) : isRequired ? (
            <Label>{rebar?._id}</Label>
          ) : (
            <div className="space-y-1">
              <Label>Editing {rebars.length} rebars</Label>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            <Select
              label="Material"
              value={formData.rebarMaterialId}
              onChange={(rebarMaterialId) => setFormData({ ...formData, rebarMaterialId })}
              options={materials.map((material) => ({
                label: `${material.materialCategory} - ${material.exposureClass}`,
                value: material._id
              }))}
              required={isRequired}
            />

            <div>
              <label className="block text-sm font-medium mb-2">Rebar Entries</label>
              <div className="text-sm text-gray-600">{formData.rebarEntries.length} entries configured</div>
              <p className="text-gray-500 mt-1">Rebar entries editing not yet implemented</p>
            </div>
          </div>
          <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};
