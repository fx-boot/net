import type { Representative } from '../../types/portfolio';
import { CopyEmailButton } from './CopyEmailButton';
export function RepresentationCard({ person }: { person: Representative }) {
 return <article className="representation"><span className="representation-region">{person.region}</span><h3>{person.name}</h3><p>{person.title}<br />{person.company}</p><CopyEmailButton email={person.email} /></article>;
}
