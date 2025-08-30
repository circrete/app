import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { Drawer } from '../../uicomponents/Drawer';
import { Suspense, useMemo, useState } from 'react';
import { ComponentEditForm } from './ComponentEditForm';
import { Bounds, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { getPreprocessedGeometryDatatForComponents } from '../../visualisation/webgl/lib/getGeometry';
import { ComponentInstancesRenderer } from '../../visualisation/webgl/renderers/ComponentInstancesRenderer';
import { Axis } from '../../visualisation/webgl/utils/Axis';
import { SelectToZoom } from '../../visualisation/webgl/utils/SelectToZoom';

export const ComponentVisualisation: React.FC<{
  components: DataModel['components']['document'][];
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
  geometryTypes: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
}> = ({ components, buildings, users, geometryTypes, crossSections, materials }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<DataModel['components']['document'][]>([]);

  const onClose = () => {
    setSelectedComponents([]);
    setShowForm(false);
  };

  const geometryDisplayMap = useMemo(() => {
    const building = buildings.find((b) => b._id === components[0].buildingId);
    if (!building) return {};
    return getPreprocessedGeometryDatatForComponents(components, building, geometryTypes, crossSections);
  }, [components, buildings, geometryTypes, crossSections]);

  const isAbstractPlanes = false;

  return (
    <GeneralTable
      addMethod={!showForm ? () => setShowForm(true) : undefined}
      selectedItemsCount={selectedComponents.length}
    >
      <Canvas gl={{ preserveDrawingBuffer: true }} className="bg-slate-700">
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <directionalLight position={[10, 0, 0]} intensity={0.5} />
        <directionalLight position={[-10, 0, 0]} intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={Math.PI} />
        <directionalLight position={[-10, -10, -10]} intensity={1} />
        <Suspense fallback={null}>
          <group name="slabGroup">
            <Bounds fit clip observe margin={1.2}>
              <SelectToZoom
                onClick={(id) => {
                  const component = components.find((c) => c._id === id);
                  if (component) {
                    setShowForm(true);
                    setSelectedComponents([component]);
                  }
                }}
              >
                {Object.entries(geometryDisplayMap).map(([geometryId, geometryDisplay]) => (
                  <ComponentInstancesRenderer
                    key={`slab-${geometryId}`}
                    geometryTypeId={geometryId}
                    widthHeightLength={geometryDisplay.widthHeightLength}
                    planes={isAbstractPlanes ? geometryDisplay.abstractStackPlanes : geometryDisplay.realityPlanes}
                  />
                ))}
              </SelectToZoom>
            </Bounds>
          </group>
        </Suspense>
        <OrbitControls makeDefault />
        <Axis components={components} />
      </Canvas>
      <Drawer isOpen={showForm}>
        <ComponentEditForm
          components={selectedComponents}
          buildings={buildings}
          users={users}
          geometries={geometryTypes}
          crossSections={crossSections}
          materials={materials}
          onClose={onClose}
        />
      </Drawer>
    </GeneralTable>
  );
};
