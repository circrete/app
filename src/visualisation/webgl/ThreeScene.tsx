import { Canvas } from '@react-three/fiber';
import { Bounds, OrbitControls } from '@react-three/drei';
import React, { Suspense, useMemo } from 'react';
import { ComponentInstancesRenderer } from './renderers/ComponentInstancesRenderer';
import { Axis } from './utils/Axis';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { SelectToZoom } from './utils/SelectToZoom';
import { getPreprocessedGeometryDatatForComponents } from './lib/getGeometry';

export const ThreeScene: React.FC<{
  components: DataModel['components']['document'][];
  geometries: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  buildings: DataModel['buildings']['document'][];
}> = ({ components, geometries, crossSections, buildings }) => {
  // const data = useCollectionStore((s) => s.collections);
  // const userCategory = useTableStore((s) => s.viewer); // Get the user category

  if (components.length === 0) return null;

  const geometryDisplayMap = useMemo(() => {
    const building = buildings.find((b) => b._id === components[0].buildingId);
    if (!building) return {};
    return getPreprocessedGeometryDatatForComponents(components, building, geometries, crossSections);
  }, [components, buildings, geometries, crossSections]);

  const isAbstractPlanes = false;
  //  useMemo(
  //   () =>
  //     [NamedViews.ArchiveReusePotential, NamedViews.ArchiveProjectLevel, NamedViews.OnSiteTransport].includes(
  //       userCategory
  //     ),
  //   [userCategory]
  // );

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-800">
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <directionalLight position={[10, 0, 0]} intensity={0.5} />
        <directionalLight position={[-10, 0, 0]} intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={Math.PI} />
        <directionalLight position={[-10, -10, -10]} intensity={1} />
        <Suspense fallback={null}>
          <group name="slabGroup">
            <Bounds fit clip observe margin={1.2}>
              <SelectToZoom>
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
    </div>
  );
};
