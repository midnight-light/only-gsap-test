import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import styled from 'styled-components';
import { TimeLineEvent } from '../../constants/historical-dates-mok.constants';
import { Button } from '../../../../components/ui/button';
import { ChevronIcon } from '../../../../components/icons/chevron-icon';

const SwiperContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  /* padding-left: ${({ theme }) => theme.spacing.xl}; */
`;

const SlidesArea = styled.div`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.xl};
  min-width: 0;

  pointer-events: auto;
  .swiper {
    width: 100%;
    height: 100%;
  }
`;

const SlideContent = styled.div`
  width: 22rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const EventYear = styled.span`
  font-size: ${({ theme }) => theme.typography.heading.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const EventDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const PointControlsContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  pointer-events: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

const PointControlsButtons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

interface EventsSwiperProps {
  onPointChange: (newPointActiveIndex: number) => void;
  events: TimeLineEvent[];
  currentPointId: number;
  totalPoints: number;
}

const NavButtonPrev = styled(Button)<{ $active: boolean }>`
  position: absolute;
  left: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
`;

const NavButtonNext = styled(Button)<{ $active: boolean }>`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: auto;
  z-index: 2;
`;

export const EventsSwiper: React.FC<EventsSwiperProps> = ({
  onPointChange,
  events,
  currentPointId,
  totalPoints,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const pad = (n: number) => String(n).padStart(2, '0');

  const handleSlideChange = (swiper: SwiperType) => {
    console.warn('swiper.activeIndex', swiper.activeIndex);
    setActiveIndex(swiper.activeIndex);
  };

  const toggleSlide = (newActiveIndex: number) => {
    console.warn('toggleSlide', newActiveIndex);
    if (newActiveIndex < 0 || newActiveIndex >= events.length) return;

    const isPrev = newActiveIndex < activeIndex;
    setActiveIndex(newActiveIndex);
    isPrev ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext();
  };

  return (
    <SwiperContainer>
      <PointControlsContainer>
        <span>
          {pad(currentPointId)}/{pad(totalPoints)}
        </span>
        <PointControlsButtons>
          <Button
            disabled={currentPointId < 1}
            variant="outline"
            onClick={() => onPointChange(currentPointId - 1)}
          >
            <ChevronIcon direction="left" />
          </Button>
          <Button
            disabled={currentPointId >= totalPoints}
            variant="outline"
            onClick={() => onPointChange(currentPointId + 1)}
          >
            <ChevronIcon direction="right" />
          </Button>
        </PointControlsButtons>
      </PointControlsContainer>

      <SlidesArea>
        <NavButtonPrev
          size="md"
          $active={activeIndex > 0}
          onClick={() => toggleSlide(activeIndex - 1)}
          aria-label="Предыдущее событие"
        >
          <ChevronIcon direction="left" />
        </NavButtonPrev>
        <Swiper
          key={currentPointId}
          className="events-swiper"
          modules={[A11y, Keyboard]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          slidesPerView={3}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <SlideContent>
                <EventYear>{event.year}</EventYear>
                <EventDescription>{event.description}</EventDescription>
              </SlideContent>
            </SwiperSlide>
          ))}
        </Swiper>
        <NavButtonNext
          size="md"
          $active={activeIndex < events.length - 2}
          onClick={() => toggleSlide(activeIndex + 1)}
          aria-label="Следующее событие"
        >
          <ChevronIcon direction="right" />
        </NavButtonNext>
      </SlidesArea>
    </SwiperContainer>
    // </SwiperControls>
  );
};
