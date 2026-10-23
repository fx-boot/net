import Noise from '../react-bits/Noise';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';
export function FilmGrain() {
  const desktop = useDesktopPointer(), reduced = useReducedMotion();
  if (!desktop || reduced) return null;
  return <Noise opacity={0.06} fps={12} size={0.7} contrast={0.45} blendMode="soft-light" dust={0} scratches={0} flicker={0} />;
}
