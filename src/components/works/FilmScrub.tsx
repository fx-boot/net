import type { FilmScrubData } from '../../types/portfolio';
import type { useFilmScrub } from '../../hooks/useFilmScrub';

export function FilmScrub({ data, state }: { data: FilmScrubData; state: ReturnType<typeof useFilmScrub> }) {
  if (!state.warmed) return null;
  return <span className="film-scrub-layers" aria-hidden="true">
    {data.frames.map((frame, index) => <img key={frame.src} src={frame.src} alt="" width={1280} height={720} decoding="async" draggable={false}
      ref={element => { state.layers.current[index] = element; }}
      data-source-time={frame.sourceTime} onLoad={event => { if(event.currentTarget.currentSrc===new URL(frame.src,location.href).href)state.loaded.current.add(frame.src); }}
      onError={() => { state.loaded.current.delete(frame.src); }} />)}
  </span>;
}
