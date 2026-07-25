'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Magnetic } from './magnetic';

type Variant = 'primary' | 'ghost';

interface ActionProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Ícone opcional à esquerda do rótulo (usar com muita parcimônia). */
  glyph?: ReactNode;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-3 px-7 py-4 kicker transition-colors duration-500 select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-bone',
  ghost: 'border border-line-strong text-bone hover:border-bone',
};

/**
 * CTA do site. Retangular por decisão de direção de arte — a linguagem é
 * esportiva/editorial, não SaaS.
 */
export function Action({
  href,
  children,
  variant = 'primary',
  className,
  glyph,
  external = false,
  onClick,
  disabled = false,
  ...rest
}: ActionProps) {
  const content = (
    <>
      {glyph ? <span className="shrink-0">{glyph}</span> : null}
      <span>{children}</span>
      {/* Preenchimento que sobe no hover, apenas na variante ghost. */}
      {variant === 'ghost' ? (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-bone/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
        />
      ) : null}
    </>
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, 'cursor-not-allowed border border-line text-ash', className)}
        {...rest}
      >
        {content}
      </span>
    );
  }

  return (
    <Magnetic className="inline-flex">
      <Link
        href={href}
        onClick={onClick}
        data-cursor="action"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cn(base, variants[variant], 'overflow-hidden', className)}
        {...rest}
      >
        {content}
      </Link>
    </Magnetic>
  );
}

/** Triângulo de play — único ícone do site, desenhado em SVG. */
export function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 12" aria-hidden className={cn('h-3 w-2.5 fill-current', className)}>
      <path d="M0 0v12l10-6z" />
    </svg>
  );
}
