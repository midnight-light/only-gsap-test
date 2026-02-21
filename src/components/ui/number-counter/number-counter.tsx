import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { gsap, useGSAP } from '../../../app/gsap/gsap';

interface CounterSpanProps {
  variant: 'primary' | 'accent';
}

interface NumberCounterProps {
  value: number;
  duration?: number;
  ease?: string;
  className?: string;
  variant?: CounterSpanProps['variant'];
}

const variantStyles: Record<
  CounterSpanProps['variant'],
  ReturnType<typeof css>
> = {
  primary: css`
    color: ${({ theme }) => theme.colors.primary};
  `,
  accent: css`
    color: ${({ theme }) => theme.colors.accent};
  `,
};

const CounterSpan = styled.span<CounterSpanProps>`
  ${({ variant }) => variantStyles[variant]}
  font-variant-numeric: tabular-nums;
  display: inline-block;
`;

export const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  variant = 'primary',
  duration = 1.2,
  ease = 'power2.inOut',
  className,
}) => {
  const elRef = useRef<HTMLSpanElement>(null);
  /**
   * Proxy object - gsap tweens this, never the React state.
   * Initialized to value so the first render shows the correct number
   * without any tween (no "count from 0" flash on mount).
   */
  const proxyRef = useRef({ val: value });

  const { contextSafe } = useGSAP({ scope: elRef });

  const animateTo = contextSafe((target: number) => {
    const el = elRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.killTweensOf(proxyRef.current);

      gsap.to(proxyRef.current, {
        val: target,
        duration,
        ease,
        snap: { val: 1 },
        onUpdate() {
          if (el) el.textContent = String(Math.round(proxyRef.current.val));
        },
        onComplete() {
          proxyRef.current.val = target;
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.killTweensOf(proxyRef.current);
      proxyRef.current.val = target;
      el.textContent = String(target);
    });
  });

  useEffect(() => {
    animateTo(value);
  }, [value]);

  return (
    <CounterSpan
      variant={variant}
      ref={elRef}
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      {value}
    </CounterSpan>
  );
};
