import { MapContainer, TileLayer, Marker, MapContainerProps } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import { DataModel } from '../../../convex/_generated/dataModel';
import { getCenterForBuildings, getMapStageKey, getZoomForBuildings } from './lib';
import { CircreteIcon } from './BuildingIcon';

export const MapWrapper: React.FC<
  MapContainerProps &
    React.RefAttributes<LeafletMap> & {
      buildings: DataModel['buildings']['document'][];
      setBuilding: (building: DataModel['buildings']['document']) => void;
    }
> = ({ buildings, setBuilding, ...props }) => (
  <MapContainer
    {...props}
    attributionControl={false}
    className="w-full h-full"
    center={getCenterForBuildings(buildings)}
    zoom={getZoomForBuildings(buildings)}
    key={getMapStageKey(buildings)}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {buildings.map(
      (building) =>
        building.location && (
          <Marker
            key={building._id}
            position={[building.location.latitude, building.location.longitude]}
            icon={CircreteIcon}
            eventHandlers={{
              click: (e) => setBuilding(building)
            }}
          >
            {/* <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
          </Marker>
        )
    )}
  </MapContainer>
);
