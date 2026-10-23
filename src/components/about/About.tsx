import { DirectorCard } from './DirectorCard';
import { DirectorStatement } from './DirectorStatement';
import { StudioCapacity } from './StudioCapacity';
import { CineBreakdown } from './CineBreakdown';

export function About() {
  return <section id="about" className="biography section-space" aria-labelledby="about-heading">
    <div className="biography-spread"><DirectorCard />
    <div className="director-track"><DirectorStatement /><StudioCapacity /></div></div>
    <CineBreakdown />
  </section>;
}
