import React, { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Input } from '../../uicomponents/form/Input';
import { SubmitCancel } from '../../uicomponents/form/SubmitCancel';
import { Label } from '../../uicomponents/form/Label';
import { findCommonString, shouldRequireField, getMultiEditTitle } from '../helpers/multiEditHelpers';

export const UserEditForm: React.FC<{
  users: DataModel['users']['document'][];
  onClose?: () => void;
}> = ({ users, onClose }) => {
  const editUser = useMutation(api.tasks.editing.users.editUser);
  const editMultipleUsers = useMutation(api.tasks.editing.users.editMultipleUsers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequired = users.length < 2;
  const user = users[0]; // For single edit, use the first user

  const [formData, setFormData] = useState({
    name: findCommonString(users, 'name'),
    company: findCommonString(users, 'company'),
    address: findCommonString(users, 'address'),
    mail: findCommonString(users, 'mail'),
    userCategory: findCommonString(users, 'userCategory')
  });

  useEffect(() => {
    setFormData({
      name: findCommonString(users, 'name'),
      company: findCommonString(users, 'company'),
      address: findCommonString(users, 'address'),
      mail: findCommonString(users, 'mail'),
      userCategory: findCommonString(users, 'userCategory')
    });
  }, [users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!isRequired) {
        await editMultipleUsers({
          userIds: users.map((u) => u._id),
          ...formData
        });
      } else if (user) {
        await editUser({
          userId: user._id,
          ...formData
        });
      }
      onClose?.();
    } catch (error) {
      console.error('Failed to update user(s):', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (users.length === 0) {
    return <div className="w-[400px] text-white">No users selected</div>;
  }

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="flex flex-col justify-start h-full gap-4">
        <div className="flex-none">
          <h2 className="text-xl font-bold mb-4">{getMultiEditTitle('User', users.length)}</h2>
          {isRequired ? (
            <Label>{user?._id}</Label>
          ) : (
            <div className="space-y-1">
              <Label>Editing {users.length} users</Label>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto h-full">
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(name) => setFormData({ ...formData, name })}
                required={isRequired}
              />
              <Input
                label="Company"
                value={formData.company}
                onChange={(company) => setFormData({ ...formData, company })}
                required={isRequired}
              />
              <Input
                label="Address"
                value={formData.address}
                onChange={(address) => setFormData({ ...formData, address })}
                required={isRequired}
              />
              <Input
                label="Email"
                value={formData.mail}
                onChange={(mail) => setFormData({ ...formData, mail })}
                required={isRequired}
              />
              <Input
                label="User Category"
                value={formData.userCategory}
                onChange={(userCategory) => setFormData({ ...formData, userCategory })}
                required={isRequired}
              />
            </div>
          </div>
          <SubmitCancel onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};
