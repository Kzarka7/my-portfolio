import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.04,
  rotateAmplitude = 8,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const ref = useRef(null);

  /* ── Motion values — transform only, GPU composited ── */
  const x                 = useMotionValue(0);
  const y                 = useMotionValue(0);
  const rotateX   = useSpring(useMotionValue(0), springValues);
  const rotateY   = useSpring(useMotionValue(0), springValues);
  const scale     = useSpring(1, springValues);
  const opacity   = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const [hov, setHov] = useState(false);
  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect     = ref.current.getBoundingClientRect();
    const offsetX  = e.clientX - rect.left - rect.width  / 2;
    const offsetY  = e.clientY - rect.top  - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width  / 2)) * rotateAmplitude);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    rotateFigcaption.set(-(offsetY - lastY) * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    setHov(true);
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    setHov(false);
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
      className="relative [perspective:800px] flex items-center justify-center m-0"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
        className="relative [transform-style:preserve-3d] will-change-transform"
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          className={`absolute top-0 left-0 object-cover rounded-none [transform:translateZ(0)] will-change-transform border solid border-[var(--primary)] transition-shadow duration-500 ease-in-out ${
            hov ? "shadow-[0_0_16px_2px_var(--shadow-colored)]" : "shadow-none"
          }`}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div 
            className="absolute top-0 left-0 z-20 will-change-transform [transform:translateZ(30px)]"
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip — opacity spring, no layout thrash */}
      {showTooltip && (
        <motion.figcaption
          style={{
            fontFamily: 'var(--font-mono)',
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
          className="pointer-events-none absolute left-0 top-0 rounded-[2px] bg-[var(--surface)] border-[0.5px] border-[var(--border-secondary)] text-[var(--primary)] text-[10px] tracking-[0.1em] uppercase p-[4px_10px] z-10 will-change-[transform,opacity]"
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}