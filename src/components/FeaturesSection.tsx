import { DollarSign, Zap, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: DollarSign,
    title: '更便宜的转账',
    description: 'GasFree 相比传统转账方式，成本降低至原来的约 40%，用户只需以转账代币支付少量费用',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: '容易使用',
    description: '无需原生代币进行转账或激活账户，GasFree 降低了进入加密世界的门槛',
    color: 'text-accent',
  },
  {
    icon: Shield,
    title: '去中心化',
    description: 'GasFree 通过更简单且去中心化的方式实现转账，从而提高了安全性，最大限度地降低了敏感信息暴露的风险',
    color: 'text-primary',
  },
  {
    icon: Sparkles,
    title: '更流畅的体验',
    description: 'GasFree 消除了支付 Gas 的负担，用户只需签名转账，一切都会得到妥善处理，提供无缝的体验',
    color: 'text-accent',
  },
];

const FeaturesSection = () => {
  return (
    <section id="products" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            便宜 <span className="text-muted-foreground">且</span> 易用的
            <br />
            <span className="text-gradient">新转账方式</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            面向大众的更经济且更简便的转账方式
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
