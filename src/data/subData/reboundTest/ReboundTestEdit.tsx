import { DataModel } from '../../../../convex/_generated/dataModel';
import { Input } from '../../../uicomponents/form/Input';
import { Select } from '../../../uicomponents/form/Select';
import { ReboundTestType, UserType } from '../../dataModelTypes';
import { getUserString } from '../../users.ts/userLogic';
import { LocationEdit } from '../location/LocationEdit';
import { ReboundTestChip } from './ReboundTestChip';

export const ReboundTestEdit: React.FC<{
  reboundTest: ReboundTestType;
  users: UserType[];
  onChange: (reboundTest: ReboundTestType) => void;
  onDelete: () => void;
}> = ({ reboundTest, users, onChange, onDelete }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="grid grid-cols-[1fr_auto] gap-4">
        <ReboundTestChip reboundTest={reboundTest} users={users} />
        {onDelete && <button onClick={onDelete}>delete</button>}
      </span>
      <div className="grid grid-cols-2 gap-4">
        {
          reboundTest.reboundValue.map((value, i) => (
            <span key={i} className="grid grid-cols-[1fr_auto] gap-4">
              <Input
                label="Rebound Value"
                value={value}
                number
                step={0.01}
                onChange={(value) =>
                  onChange({
                    ...reboundTest,
                    reboundValue: reboundTest.reboundValue.map((v, j) => (j === i ? value : v))
                  })
                }
                required={false}
              />
              <button
                onClick={() =>
                  onChange({ ...reboundTest, reboundValue: reboundTest.reboundValue.filter((_, j) => j !== i) })
                }
              >
                -
              </button>
            </span>
          ))
          // button to add a new reboun
        }
        <button onClick={() => onChange({ ...reboundTest, reboundValue: [...reboundTest.reboundValue, 0] })}>
          + add
        </button>
      </div>
      <Input
        label="Rebound Date"
        value={reboundTest.reboundDate}
        onChange={(reboundDate) => onChange({ ...reboundTest, reboundDate })}
        required={false}
      />
      <Select
        label="User"
        value={reboundTest.userId}
        onChange={(userId) => onChange({ ...reboundTest, userId })}
        required={false}
        options={users.map((u) => ({ value: u._id, label: getUserString(u as DataModel['users']['document']) }))}
      />
      <LocationEdit
        label="Location"
        location={reboundTest.location}
        onChange={(location) => onChange({ ...reboundTest, location })}
        required={false}
      />
    </div>
  );
};
