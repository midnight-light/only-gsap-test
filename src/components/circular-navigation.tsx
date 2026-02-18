import { useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap, useGSAP } from '../app/gsap/gsap';
import { theme } from '../app/styles/theme';
import {
  HistoricalDate,
  TimeLinePoint,
} from '../features/historical-date/constants/historical-dates-mok.constants';

const initialState = {
  items: {
    angleOffset: -Math.PI / 3, // -60 градусов для начальной позиции
    scale: 0.1,
    activeScale: 1.5,
  },
};

interface CircularNavigationProps {
  points: HistoricalDate;
  radius?: number;
  pointSize?: number;
  targetAngle?: number;
  selectedPointId?: number;
  initialDelay?: number;
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gallery = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: center center;
  position: relative;
`;

const CenterCircle = styled.div<{ $radius: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ $radius }) => $radius / 8}rem;
  height: ${({ $radius }) => $radius / 8}rem;
  border: 1px solid ${({ theme }) => theme.colors.muted};

  transform: translate(-50%, -50%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.heading.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Item = styled.div<{ $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.1);
  border: 1px solid ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  will-change: transform;
`;

const ItemLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
  pointer-events: none;
  opacity: 0;
`;

const ItemDescription = styled.div`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  max-width: 10rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.5;
  white-space: pre-wrap;
`;

const DebugInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  z-index: 100;

  div {
    margin: 4px 0;
  }
`;

export const CircularNavigation: React.FC<CircularNavigationProps> = ({
  points,
  radius = 300,
  pointSize = 56,
  targetAngle = initialState.items.angleOffset,
  initialDelay = 1.5,
  selectedPointId,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const [activeDescription, setActiveDescription] = useState<string>('');

  const [activePointId, setActivePointId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  useGSAP(
    () => {
      const items = container.current?.querySelectorAll('.item');
      const centerCircle = container.current?.querySelector('.center-circle');
      const containerEl = container.current;

      if (!items || !containerEl || !centerCircle || !gallery.current) {
        console.warn('CircularNavigation: Required elements not found');
        return;
      }

      const numberOfItems = items.length;
      const angleIncrement = (2 * Math.PI) / numberOfItems;

      const centerX = containerEl.offsetWidth / 2;
      const centerY = containerEl.offsetHeight / 2;

      if (descriptionRef.current) {
        const targetAngleRad = initialState.items.angleOffset;
        const itemScreenX = centerX + radius * Math.cos(targetAngleRad);
        const itemScreenY = centerY + radius * Math.sin(targetAngleRad);

        gsap.set(descriptionRef.current, {
          left:
            itemScreenX + (pointSize / 2) * initialState.items.activeScale + 20,
          top: itemScreenY,
          yPercent: -50,
        });
      }

      const tl = gsap.timeline({ delay: initialDelay });
      timelineRef.current = tl;

      gsap.set(centerCircle, { scale: 0 });
      tl.to(centerCircle, {
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // анимация появления точек
      items.forEach((item, index) => {
        const angle = index * angleIncrement + initialState.items.angleOffset;
        const initialRotation = angle * (180 / Math.PI) + 90;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // сохранение начального угла для последующих расчетов
        item.setAttribute('data-angle', angle.toString());
        item.setAttribute('data-index', index.toString());

        tl.to(
          item,
          {
            left: x + 'px',
            top: y + 'px',
            scale: initialState.items.scale,
            rotate: initialRotation,
            duration: 1,
            ease: 'power2.out',
          },
          index * 0.1,
        );
        const labelEl = item.querySelector<HTMLElement>('.label');
        if (labelEl) {
          tl.set(
            labelEl,
            {
              rotation: -initialRotation,
            },

            index * 0.1,
          );
        }
      });
    },
    { scope: container },
  );

  const { contextSafe } = useGSAP({ scope: container });

  const handleMouseEnter = contextSafe((pointId: number) => {
    if (activePointId === pointId || isAnimating) return;
    const itemSelector = `.item-${pointId}`;
    const labelSelector = `.item-${pointId} .label`;

    const tl = gsap.timeline();
    tl.to(itemSelector, {
      scale: initialState.items.activeScale,
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    tl.to(
      labelSelector,
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(2)',
      },
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
  });

  const handleMouseLeave = contextSafe((pointId: number) => {
    if (activePointId === pointId || isAnimating) return;

    const itemSelector = `.item-${pointId}`;
    const labelSelector = `.item-${pointId} .label`;

    const tl = gsap.timeline();

    tl.to(labelSelector, {
      opacity: 0,
      scale: 0,
      duration: 0.2,
      ease: 'power2.in',
    });

    tl.to(
      itemSelector,
      {
        scale: initialState.items.scale,
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
  });

  const handlePointClick = contextSafe((point: TimeLinePoint) => {
    if (isAnimating || activePointId === point.id) return;

    const previousActiveId = activePointId;

    setActivePointId(point.id);
    setIsAnimating(true);

    // вычисление угла точки
    const numberOfItems = points.meta.pointCount;
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const pointAngle =
      point.id * angleIncrement + initialState.items.angleOffset;
    const pointAngleDegrees = pointAngle * (180 / Math.PI);

    // текущая позиция точки с учетом вращения контейнера
    const currentPointPosition = (pointAngleDegrees + currentRotation) % 360;

    // разница до целевого угла
    let delta = targetAngle - currentPointPosition;

    // выбор кратчайшего пути
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newRotation = currentRotation + delta;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentRotation(newRotation);
        setIsAnimating(false);
      },
    });

    if (previousActiveId && previousActiveId !== point.id) {
      tl.to(
        `.item-${previousActiveId}`,
        {
          scale: initialState.items.scale,
          backgroundColor: theme.colors.foreground,
          duration: 0.3,
          ease: 'power2.in',
        },
        0,
      );

      tl.to(
        `.item-${previousActiveId} .label`,
        {
          opacity: 0,
          scale: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        0,
      );

      tl.to(
        descriptionRef.current,
        {
          opacity: 0,
          x: -5,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            //обновляем текст когда description спрятан
            setActiveDescription(point.category ?? '');
            gsap.set(descriptionRef.current, { x: 5 });
          },
        },
        0,
      );
    } else {
      setActiveDescription(point.category ?? '');
    }

    // анимация вращения
    tl.to(
      gallery.current,
      {
        rotation: newRotation,
        duration: 1.2,
        ease: 'power2.inOut',
      },
      0,
    );

    points.data.forEach((p, idx) => {
      const angle = idx * angleIncrement + initialState.items.angleOffset;
      const initialRotation = angle * (180 / Math.PI) + 90;
      tl.to(
        `.item-${p.id} .label`,
        {
          rotation: -(newRotation + initialRotation),
          ease: 'power2.inOut',
        },
        0,
      );
    });

    tl.to(
      `.item-${point.id}`,
      {
        scale: initialState.items.activeScale,
        duration: 0.5,
      },
      0,
    );

    tl.to(
      `.item-${point.id} .label`,

      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      },
      0.6,
    );
    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      1.0,
    );
  });

  return (
    <Container ref={container}>
      <Gallery ref={gallery}>
        <CenterCircle className="center-circle" $radius={radius} />

        {points.data.map((point) => (
          <Item
            key={point.id}
            aria-label={`Point ${point.category}`}
            className={`item item-${point.id}`}
            $size={pointSize}
            onClick={() => handlePointClick(point)}
            onMouseEnter={() => handleMouseEnter(point.id)}
            onMouseLeave={() => handleMouseLeave(point.id)}
          >
            <ItemLabel className="label">{point.id}</ItemLabel>
          </Item>
        ))}
      </Gallery>

      <ItemDescription ref={descriptionRef} className="active-description">
        {activeDescription}
      </ItemDescription>

      {process.env.NODE_ENV === 'development' && (
        <DebugInfo>
          <div>Points: {points.meta.pointCount}</div>
          <div>Radius: {radius}px</div>
          <div>Current Rotation: {currentRotation.toFixed(1)}°</div>
          <div>Active Point: {activePointId ?? 'none'}</div>
          <div>Target Angle: {targetAngle}°</div>
          <div>Is Animating: {isAnimating ? 'yes' : 'no'}</div>
        </DebugInfo>
      )}
    </Container>
  );
};
