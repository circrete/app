import { Input } from '../../uicomponents/form/Input';
import { LocationDataType } from './locationType';

export const LocationEdit: React.FC<{
  label?: string;
  location: LocationDataType;
  onChange: (location: LocationDataType) => void;
}> = ({ label, location, onChange }) => {
  return (
    <div>
      {<h3 className="text-lg font-semibold mb-3">{label ?? 'Location'}</h3>}
      <div className="flex flex-row gap-4">
        <Input
          label="Height"
          number
          step={0.01}
          value={location.height}
          onChange={(height: number) => onChange({ ...location, height })}
        />
        <Input
          label="Latitude"
          number
          step={0.01}
          value={location.latitude}
          onChange={(latitude: number) => onChange({ ...location, latitude })}
        />
        <Input
          label="Longitude"
          number
          step={0.01}
          value={location.longitude}
          onChange={(longitude: number) => onChange({ ...location, longitude })}
        />
      </div>
    </div>
  );
};
