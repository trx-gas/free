import { DollarSign, Zap, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: DollarSign,
    title: '更便宜的轉賬',
    description: 'GasFree 相比傳統轉賬方式，成本降低至原來的約 40%，用戶只需以轉賬代幣支付少量費用',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: '容易使用',
    description: '無需原生代幣進行轉賬或激活賬戶，GasFree 降低了進入加密世界的門檻',
    color: 'text-accent',
  },
  {
    icon: Shield,
    title: '去中心化',
    description: 'GasFree 通過更簡單且去中心化的方式實現轉賬，從而提高了安全性，最大限度地降低了敏感信息暴露的風險',
    color: 'text-primary',
  },
  {
    icon: Sparkles,
    title: '更流暢的體驗',
    description: 'GasFree 消除了支付 Gas 的負擔，用戶只需簽名轉賬，一切都會得到妥善處理，提供無縫的體驗',
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
            <span className="text-gradient">新轉賬方式</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            面向大眾的更經濟且更簡便的轉賬方式
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
