export function Toast({ message, error = false }: { message: string; error?: boolean }) {
  return <div className={`toast ${message ? 'is-visible' : ''} ${error ? 'is-error' : ''}`} role="status" aria-live="polite" aria-atomic="true">{message}</div>;
}
