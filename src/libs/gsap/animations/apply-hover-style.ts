import { theme } from '../../../app/styles/theme';

export function applyItemHoverStyle(
  tl: gsap.core.Timeline,
  pointId: number,
  activeScale: number,
): void {
  const itemSelector = `.item-${pointId}`;
  const labelSelector = `.item-${pointId} .label`;

  tl.to(itemSelector, {
    scale: activeScale,
    duration: 0.4,
    ease: 'back.out(1.7)',
  });

  tl.to(
    labelSelector,
    { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
    '<0.1',
  );

  tl.to(
    itemSelector,
    {
      borderColor: theme.colors.foreground,
      backgroundColor: theme.colors.background,
      duration: 0.3,
    },
    '<',
  );
}
