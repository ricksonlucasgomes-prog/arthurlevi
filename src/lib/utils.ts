import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Une classes condicionais resolvendo conflitos do Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Índice de seção formatado como "01", "02"… */
export function sectionIndex(n: number) {
  return String(n).padStart(2, '0');
}

/** Formata número para pt-BR, ou "—" quando ainda não há dado. */
export function formatNumber(value: number | null) {
  return value === null ? '—' : new Intl.NumberFormat('pt-BR').format(value);
}

/** Monta o link do WhatsApp a partir dos dígitos do responsável. */
export function whatsappLink(digits: string | null, message: string) {
  if (!digits) return null;
  return `https://wa.me/${digits.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

/** `true` quando existe pelo menos um valor real na lista. */
export function hasData(list: readonly unknown[]) {
  return list.length > 0;
}
