import { theme } from '../../../app/styles/theme';

export function resetItemHoverStyle(
  tl: gsap.core.Timeline,
  pointId: number,
  initialScale: number,
): void {
  const itemSelector = `.item-${pointId}`;
  const labelSelector = `.item-${pointId} .label`;

  tl.to(labelSelector, {
    opacity: 0,
    scale: 0,
    duration: 0.2,
    ease: 'power2.in',
  });

  tl.to(
    itemSelector,
    {
      scale: initialScale,
      duration: 0.3,
      ease: 'power2.inOut',
    },
    '<0.05',
  );
  tl.to(
    itemSelector,
    {
      borderColor: theme.colors.muted,
      backgroundColor: theme.colors.foreground,
      duration: 0.3,
    },
    '<',
  );
}
