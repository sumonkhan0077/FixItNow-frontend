// "use client";

// import Lenis from "lenis";
// import { useEffect } from "react";

// export default function SmoothScroll() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.3,                     // scroll duration slightly higher → more cinematic
//       easing: (t) => 1 - Math.pow(1 - t, 4),  // cubic ease-out, even smoother
//       smooth: true,                      // enable smooth scroll
//       direction: "vertical",             // vertical scroll
//       gestureOrientation: "vertical",    // track touch gesture for mobile
//       smoothTouch: 0.1,                  // make mobile scroll soft
//       normalizeWheel: true,              // normalize mouse wheel
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return null;
// }
'use client';
import { ReactLenis } from 'lenis/react';

function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;