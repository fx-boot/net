import { DirectorCard } from './DirectorCard';
import { DirectorStatement } from './DirectorStatement';
import { CreativePractice } from './CreativePractice';
import { CineBreakdown } from './CineBreakdown';
export function About() {
 return <section id="about" className="biography section-space" aria-labelledby="about-heading"><div className="biography-spread"><DirectorCard/><div className="director-track"><DirectorStatement/><CreativePractice/></div></div><CineBreakdown/></section>;
}
