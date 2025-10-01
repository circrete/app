import { Input } from '../../../uicomponents/form/Input';
import { LocationType } from '../../dataModelTypes';

const getUpdatedLocation = (longitude: number = 0, latitude: number = 0, height: number = 0): LocationType => ({
  longitude,
  latitude,
  height
});

export const LocationEdit: React.FC<{
  label?: string;
  location: LocationType | undefined;
  onChange: (location: LocationType) => void;
  required: boolean;
}> = ({ label, location, onChange, required }) => {
  return (
    <div>
      {<h3 className="text-lg font-semibold mb-3">{label ?? 'Location'}</h3>}
      <div className="flex flex-row gap-4">
        <Input
          label="Height"
          number
          step={0.01}
          required={required}
          value={location?.height ?? 0}
          onChange={(height: number) => onChange(getUpdatedLocation(location?.longitude, location?.latitude, height))}
        />
        <Input
          label="Latitude"
          number
          step={0.01}
          required={required}
          value={location?.latitude ?? 0}
          onChange={(latitude: number) => onChange(getUpdatedLocation(location?.longitude, latitude, location?.height))}
        />
        <Input
          label="Longitude"
          number
          step={0.01}
          required={required}
          value={location?.longitude ?? 0}
          onChange={(longitude: number) =>
            onChange(getUpdatedLocation(longitude, location?.latitude, location?.height))
          }
        />
      </div>
    </div>
  );
};
