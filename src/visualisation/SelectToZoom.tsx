import { useBounds } from '@react-three/drei';
import React from 'react';

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
export const SelectToZoom: React.FC<{ children: any; onClick?: (id: string) => void }> = ({ children, onClick }) => {
  const api = useBounds();

  // useEffect(() => {
  //   if (selectedIds) {
  //     const slab = useTableStore.getState().elements.find((p) => selectedIds.includes(p.id!));
  //     if (slab) {
  //       const view = getViewForSlab(slab);
  //       view ? api.to(view) : api.fit();
  //     } else api.fit();
  //   }
  // }, [selectedIds]);
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        e.delta <= 2 && api.refresh(e.object).fit();
        onClick?.(e.object.name);
      }}
      onPointerMissed={(e: any) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
};
