import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Freja Kristensen',
    avatar: 'FK',
    content: '从没想过有一天我们能够摆脱加密货币转账的 Gas 费。这是一次美妙的体验，重新点燃了我对加密世界的热情。',
  },
  {
    name: 'Ayaka Shintani',
    avatar: 'AS',
    content: '多亏了对需要支付 Gas 费这一基本概念的重新审视，管理加密钱包和各种账户变得更容易、更省心。',
  },
  {
    name: 'Julien Neuvillette',
    avatar: 'JN',
    content: '怎能料到无 Gas 费的加密货币转账竟如此有颠覆性？它重燃了我对区块链未来的信念。',
  },
  {
    name: 'Ilya Krasnoufimsk',
    avatar: 'IK',
    content: '这确实是一项开创性的创新。我们可以邀请加密货币领域的新人，而无需解释完成交易的某些必要需求及其原因，比如 Gas 费。',
  },
  {
    name: 'Grazhio Kujab',
    avatar: 'GK',
    content: 'GasFree 真是无可匹敌——它有着优秀的机制，且用户友好。开发者们应该因其流畅性而受到赞誉。',
  },
  {
    name: 'Muhammad Mulyam',
    avatar: 'MM',
    content: '颠覆性的新协议，它消除了加密货币最大的入门障碍 - 解释 Gas 费问题 - 让新手能像发短信一样轻松体验区块链技术。',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="community" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            由繁荣的社区驱动的
            <br />
            <span className="text-gradient">更佳转账服务</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            全球性的倡议汇聚了志同道合者，共同致力于创造一个更美好的未来
          </p>
        </div>

        {/* Testimonial Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-80 mx-3 bg-card/50 border-border/50 hover:border-primary/50 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
