import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap, useGSAP } from '../app/gsap/gsap';

interface BulletPaginationProps {
  totalPoints: number;

  currentPointId: number;

  onBulletClick?: (index: number) => void;

  initialDelay?: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;

const Bullet = styled.button`
  position: relative;
  width: 0.375rem;
  height: 0.375rem;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: none;
  will-change: transform;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  -webkit-tap-highlight-color: transparent;
`;

const BulletDot = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.muted};
  opacity: 0.4;
  will-change: transform, opacity, background-color;
`;

const BulletInner = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text};
  will-change: transform;
`;

export const BulletPagination: React.FC<BulletPaginationProps> = ({
  currentPointId,
  totalPoints,
  onBulletClick,
  initialDelay = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevActiveIndexRef = useRef(currentPointId);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const isAnimatingRef = useRef(false);
  const animatingToIndexRef = useRef(currentPointId);
  const pendingIndexRef = useRef<{
    index: number;
    previousIndex: number;
  } | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const durationBase = 0.4;
      const durationStep = 0.08;
      const durationOffset = 0.2;

      const bullets = containerRef.current?.querySelectorAll('.bullet');
      if (!bullets || bullets.length === 0) return;

      const tl = gsap.timeline({ delay: initialDelay });
      timelineRef.current = tl;

      bullets.forEach((bullet, index) => {
        const dot = bullet.querySelector('.bullet-dot');
        const inner = bullet.querySelector('.bullet-inner');

        if (dot) {
          gsap.set(dot, { scale: 0, opacity: 0 });
          tl.to(
            dot,
            {
              scale: 1,
              opacity: 0.4,
              duration: durationBase,
              ease: 'back.out(1.7)',
            },
            index * durationStep,
          );
        }

        if (index === currentPointId && inner) {
          tl.to(
            inner,
            {
              scale: 1.2,
              duration: durationBase,
              ease: 'back.out(2)',
            },
            index * durationStep + durationOffset,
          );

          if (dot) {
            tl.to(
              dot,
              {
                opacity: 1,
                scale: 1.2,
                duration: durationBase,
              },
              index * durationStep + durationOffset,
            );
          }
        }
      });
    },
    { scope: containerRef },
  );

  const animateActiveBullet = contextSafe(
    (newIndex: number, prevIndex: number) => {
      if (newIndex === prevIndex) return;

      if (isAnimatingRef.current) {
        if (newIndex !== animatingToIndexRef.current) {
          pendingIndexRef.current = {
            index: newIndex,
            previousIndex: animatingToIndexRef.current,
          };
        }
        return;
      }

      isAnimatingRef.current = true;
      animatingToIndexRef.current = newIndex;

      const prevDot = containerRef.current?.querySelector(
        `.bullet-${prevIndex} .bullet-dot`,
      );
      const prevInner = containerRef.current?.querySelector(
        `.bullet-${prevIndex} .bullet-inner`,
      );
      const newDot = containerRef.current?.querySelector(
        `.bullet-${newIndex} .bullet-dot`,
      );
      const newInner = containerRef.current?.querySelector(
        `.bullet-${newIndex} .bullet-inner`,
      );

      gsap.killTweensOf([prevDot, prevInner, newDot, newInner]);

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;

          if (pendingIndexRef.current) {
            const pending = pendingIndexRef.current;
            pendingIndexRef.current = null;
            animateActiveBullet(pending.index, pending.previousIndex);
          }
        },
      });

      if (prevDot) {
        tl.to(
          prevDot,
          {
            scale: 1,
            opacity: 0.4,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0,
        );
      }

      if (prevInner) {
        tl.to(
          prevInner,
          {
            scale: 0,
            duration: 0.3,
            ease: 'power2.in',
          },
          0,
        );
      }

      if (newDot) {
        tl.to(
          newDot,
          {
            scale: 1.2,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          0.1,
        );
      }

      if (newInner) {
        tl.to(
          newInner,
          {
            scale: 1.2,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          0.1,
        );
      }
    },
  );

  useEffect(() => {
    const prevIndex = prevActiveIndexRef.current;
    prevActiveIndexRef.current = currentPointId;

    if (prevIndex !== currentPointId) {
      animateActiveBullet(currentPointId, prevIndex);
    }
  }, [currentPointId, animateActiveBullet]);

  const handleClick = contextSafe((index: number) => {
    if (index === currentPointId) return;
    onBulletClick?.(index + 1);
  });

  return (
    <Container ref={containerRef} role="tablist">
      {Array.from({ length: totalPoints }).map(
        (_, index) => (
          console.log('index', index),
          (
            <Bullet
              key={index}
              className={`bullet bullet-${index}`}
              onClick={() => handleClick(index)}
              role="tab"
              aria-selected={index === currentPointId}
              aria-label={`Перейти к слайду ${index + 1}`}
            >
              <BulletDot className="bullet-dot" />
              <BulletInner className="bullet-inner" />
            </Bullet>
          )
        ),
      )}
    </Container>
  );
};
