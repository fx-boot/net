export interface PreviewClient { priority: number; start: () => void; stop: () => void }

/** One decoding lease shared by the hero and every portfolio preview. No RAF. */
export class PreviewPlayback {
  private clients = new Map<symbol, PreviewClient & { eligible: boolean }>();
  private owner: symbol | null = null;
  private blocked = false;
  register(client: PreviewClient) {
    const id = Symbol('preview');
    this.clients.set(id, { ...client, eligible: false });
    return {
      ownsPlayback: () => this.owner === id,
      setEligible: (eligible: boolean) => {
        const entry = this.clients.get(id);
        if (entry) { entry.eligible = eligible; this.reconcile(); }
      },
      release: () => {
        const entry = this.clients.get(id);
        if (this.owner === id) { this.owner = null; entry?.stop(); }
        this.clients.delete(id); this.reconcile();
      },
    };
  }
  setBlocked(blocked: boolean) { this.blocked = blocked; this.reconcile(); }
  private reconcile() {
    let next: symbol | null = null, priority = -Infinity;
    if (!this.blocked) for (const [id, client] of this.clients) {
      if (client.eligible && client.priority > priority) { next = id; priority = client.priority; }
    }
    if (next === this.owner) return;
    const previous = this.owner;
    this.owner = null;
    // Stop the previous decoder synchronously before authorizing the next one.
    if (previous) this.clients.get(previous)?.stop();
    this.owner = next;
    if (next) this.clients.get(next)?.start();
  }
}
export const previewPlayback = new PreviewPlayback();
