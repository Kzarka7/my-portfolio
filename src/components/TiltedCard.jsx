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
  const x         = useMotionValue(0);
  const y         = useMotionValue(0);
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
    rotateY.set((offsetX / (rect.width  / 2)) *  rotateAmplitude);
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
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        perspective: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: 'relative',
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          /* Promote to GPU layer before interaction starts */
          willChange: 'transform',
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: imageWidth,
            height: imageHeight,
            objectFit: 'cover',
            /* Sharp edges — no border-radius for Blueprint OS */
            borderRadius: 0,
            /* Force GPU layer, skip main thread paint */
            transform: 'translateZ(0)',
            willChange: 'transform',
            border: "solid 1px var(--primary-C2)",
            boxShadow: hov ? "0 0 16px 2px var(--primary-59)" : "none",
            transition: "box-shadow 0.5s ease",
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div style={{
            position: 'absolute', top: 0, left: 0,
            zIndex: 2,
            willChange: 'transform',
            transform: 'translateZ(30px)',
          }}>
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip — opacity spring, no layout thrash */}
      {showTooltip && (
        <motion.figcaption
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            left: 0, top: 0,
            borderRadius: '2px',
            background: 'var(--surface)',
            border: '0.5px solid var(--border-67)',
            color: 'var(--primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            zIndex: 10,
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
            willChange: 'transform, opacity',
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}