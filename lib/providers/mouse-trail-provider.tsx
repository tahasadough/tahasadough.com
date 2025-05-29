'use client';
import mouseTrail from '@codemasters/mousetrail';
import { useEffect, PropsWithChildren } from 'react';
import { useScreenSize } from 'spicyhooks';

export default function MouseTrailProvider({ children }: PropsWithChildren) {
  const { width } = useScreenSize();

  useEffect(() => {
    if (width > 768) mouseTrail();
    else mouseTrail.distroy();
  }, [width]);

  return <>{children}</>;
}
