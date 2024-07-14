import { cn } from '@/lib/utils';

export function SectionLayout({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={cn([
        'flex flex-col max-w-[900px] mx-7 md:mx-9 lg:mx-auto my-6',
        className,
      ])}
    >
      {children}
    </section>
  );
}
