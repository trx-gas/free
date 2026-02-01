import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import heroLogo from '@/assets/hero-logo-3d.png';

const AnimatedNumber = ({ end, duration = 2000, prefix = '', suffix = '' }: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              人人都可享用的
              <br />
              经济便捷的
              <br />
              <span className="text-gradient">转账服务</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg">
              GasFree 通过无需原生代币的无缝转账体验，使用户能更专注于资产管理
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                GasFree 钱包
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                集成我们
              </Button>
            </div>
          </div>

          {/* Right Content - 3D Logo & Stats */}
          <div className="relative">
            <div className="relative flex justify-center">
              <img 
                src={heroLogo}
                alt="GasFree 3D Logo"
                className="w-80 h-80 md:w-96 md:h-96 object-contain animate-float"
              />
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-0 right-0 space-y-6">
              <div className="text-right">
                <p className="text-muted-foreground text-sm">交易量</p>
                <p className="text-2xl md:text-3xl font-bold">
                  $<AnimatedNumber end={51314842} prefix="" />
                </p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm">交易笔数</p>
                <p className="text-2xl md:text-3xl font-bold">
                  <AnimatedNumber end={2795592} suffix="+" />
                </p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm">节约费用</p>
                <p className="text-2xl md:text-3xl font-bold">
                  $<AnimatedNumber end={3698124} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
