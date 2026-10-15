/** Big section title with a small sparkle, used after the story. */
export function SectionTitle({ id, children, className = "" }: { id: string; children: string; className?: string }) {
  return (
    <h2 id={id} data-anim="up" className={`glow flex items-center gap-3 text-3xl font-bold sm:text-[2.625rem] ${className}`}>
      {children}
      <span aria-hidden className="text-2xl text-accent sm:text-3xl">✦</span>
    </h2>
  );
}
