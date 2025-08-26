import { BuildingEditForm } from './BuildingEditForm';
import { DataModel } from '../../../convex/_generated/dataModel';
import { Modal, useModal } from '../../uicomponents/Modal';
import { ChipWrapper } from '../../uicomponents/Chip';

export const BuildingEditFormModal: React.FC<{
  building: DataModel['buildings']['document'];
  users: DataModel['users']['document'][];
}> = ({ building, users }) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <ChipWrapper onClick={open}>Edit</ChipWrapper>
      <Modal isOpen={isOpen} onClose={close}>
        <BuildingEditForm building={building} users={users} onClose={close} />
      </Modal>
    </>
  );
};
