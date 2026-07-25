import Image from 'next/image';
import type { MediaSlot } from '@/data/player';
import { cn } from '@/lib/utils';

interface MediaFrameProps {
  slot: MediaSlot;
  /** Classe de proporção/altura do contêiner. Ex.: "aspect-[3/4]". */
  className?: string;
  /** `sizes` do next/image — essencial para não baixar imagem maior que o necessário. */
  sizes?: string;
  priority?: boolean;
  /** Escurece a foto para o texto por cima manter contraste. */
  overlay?: boolean;
  /** Reduz o placeholder ao essencial (usado em blocos pequenos). */
  compact?: boolean;
}

/**
 * Exibe a foto quando ela existe; enquanto não existe, exibe um placeholder
 * técnico que informa exatamente qual arquivo precisa ser colocado ali.
 *
 * Nenhuma imagem é inventada: o placeholder é desenhado em CSS.
 */
export function MediaFrame({
  slot,
  className,
  sizes = '100vw',
  priority = false,
  overlay = false,
  compact = false,
}: MediaFrameProps) {
  return (
    <div className={cn('relative overflow-hidden bg-carbon', className)}>
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <MediaPlaceholder slot={slot} compact={compact} />
      )}

      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
        />
      ) : null}
    </div>
  );
}

function MediaPlaceholder({ slot, compact }: { slot: MediaSlot; compact: boolean }) {
  return (
    <div
      className="hatch absolute inset-0 flex flex-col justify-between p-4 sm:p-6"
      role="img"
      aria-label={`Espaço reservado para foto: ${slot.alt}`}
    >
      {/* Cantos técnicos — referência de enquadramento */}
      <Corner className="left-3 top-3 border-l border-t" />
      <Corner className="right-3 top-3 border-r border-t" />
      <Corner className="bottom-3 left-3 border-b border-l" />
      <Corner className="bottom-3 right-3 border-b border-r" />

      <p className="kicker relative text-accent">Mídia pendente</p>

      <div className="relative max-w-[36ch] space-y-2">
        <p className="font-mono text-[0.7rem] leading-relaxed break-all text-bone/90">
          {slot.expectedPath}
        </p>
        {!compact ? (
          <>
            <p className="text-[0.8rem] leading-snug text-ash">{slot.brief}</p>
            <p className="kicker text-[0.6rem] text-ash/70">{slot.spec}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return <span aria-hidden className={cn('absolute size-5 border-line-strong', className)} />;
}
