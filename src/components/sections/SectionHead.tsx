import type { ReactNode } from 'react';

export default function SectionHead({ id, title, children }: { id: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-12 flex flex-col gap-4 lg:mb-16">
      <h2 id={`h-${id}`} className="section-title m-0 gradient-text w-fit pb-1">
        {title}
      </h2>
      {children && <p className="lede m-0">{children}</p>}
    </header>
  );
}
