import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
});

export { gsap, useGSAP, ScrollTrigger };
