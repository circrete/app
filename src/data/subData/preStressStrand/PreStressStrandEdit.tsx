import { Input } from '../../../uicomponents/form/Input';
import { LocationType, PreStressStrandType } from '../../dataModelTypes';
import { LocationEdit } from '../location/LocationEdit';

export const PreStressStrandEdit: React.FC<{
  label?: string;
  preStressStrand: PreStressStrandType | undefined;
  onChange: (preStressStrand: PreStressStrandType) => void;
  required: boolean;
}> = ({ label, preStressStrand, onChange, required }) => {
  return preStressStrand ? (
    <div>
      {<h3 className="text-lg font-semibold mb-3">{label ?? 'Pre-Stress Strand'}</h3>}
      <div className="flex flex-row gap-4">
        <Input
          label="Force"
          number
          step={0.01}
          required={required}
          value={preStressStrand.force}
          onChange={(force: number) => onChange({ ...preStressStrand, force })}
        />
        <Input
          label="Steel Class"
          required={required}
          value={preStressStrand.steelClass}
          onChange={(steelClass: string) => onChange({ ...preStressStrand, steelClass })}
        />
        <Input
          label="Steel Diameter"
          number
          step={0.01}
          required={required}
          value={preStressStrand.steelDiameter}
          onChange={(steelDiameter: number) => onChange({ ...preStressStrand, steelDiameter })}
        />
        <Input
          label="Amount"
          number
          step={0.01}
          required={required}
          value={preStressStrand.amount}
          onChange={(amount: number) => onChange({ ...preStressStrand, amount })}
        />
        <LocationEdit
          label="Location"
          location={preStressStrand.location}
          onChange={(location: LocationType) => onChange({ ...preStressStrand, location })}
          required={required}
        />
      </div>
    </div>
  ) : null;
};
