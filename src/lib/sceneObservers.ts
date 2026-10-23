type Scene = {visible:(active:boolean)=>void;resized:()=>void};
const scenes=new Map<HTMLElement,Scene>();
let visibility:IntersectionObserver|undefined,resize:ResizeObserver|undefined;
// Scroll scenes share two observers regardless of catalog size.
export function observeScrollScene(node:HTMLElement,scene:Scene){
 if(!visibility)visibility=new IntersectionObserver(entries=>{entries.forEach(entry=>scenes.get(entry.target as HTMLElement)?.visible(entry.isIntersecting));},{rootMargin:'80px 0px'});
 if(!resize)resize=new ResizeObserver(entries=>{entries.forEach(entry=>scenes.get(entry.target as HTMLElement)?.resized());});
 scenes.set(node,scene);visibility.observe(node);resize.observe(node);
 return ()=>{visibility?.unobserve(node);resize?.unobserve(node);scenes.delete(node);if(!scenes.size){visibility?.disconnect();resize?.disconnect();visibility=undefined;resize=undefined;}};
}
