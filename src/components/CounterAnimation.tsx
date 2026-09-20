import { useEffect, useState, useRef } from "react";

interface CounterAnimationProps {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
}

const CounterAnimation = ({
  target,
  duration = 2000,
  decimals = 0,
  suffix = "",
  className = "",
  suffixClassName = "",
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    const startTime = performance.now();
    const startValue = 0;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = startValue + (target - startValue) * easeOutQuart;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
};

export default CounterAnimation;
