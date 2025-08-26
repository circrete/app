import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Input } from '../../uicomponents/form/Input';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';

export const UserEditForm: React.FC<{
  user: DataModel['users']['document'] | null;
  onClose?: () => void;
}> = ({ user, onClose }) => {
  const editUser = useMutation(api.tasks.editing.users.editUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    company: user?.company || '',
    address: user?.address || '',
    mail: user?.mail || '',
    userCategory: user?.userCategory || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        company: user.company || '',
        address: user.address || '',
        mail: user.mail || '',
        userCategory: user.userCategory || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) return;
      await editUser({
        userId: user._id,
        ...formData
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {user ? (
        <div className="flex flex-col justify-start h-full gap-4">
          <div className="flex-none">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <Label>{user?._id}</Label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(name) => setFormData({ ...formData, name })}
                  required
                />
                <Input
                  label="Company"
                  value={formData.company}
                  onChange={(company) => setFormData({ ...formData, company })}
                  required
                />
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(address) => setFormData({ ...formData, address })}
                  required
                />
                <Input
                  label="Email"
                  value={formData.mail}
                  onChange={(mail) => setFormData({ ...formData, mail })}
                  required
                />
                <Input
                  label="User Category"
                  value={formData.userCategory}
                  onChange={(userCategory) => setFormData({ ...formData, userCategory })}
                  required
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
