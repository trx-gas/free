import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Freja Kristensen',
    avatar: 'FK',
    content: '從沒想過有一天我們能夠擺脫加密貨幣轉賬的 Gas 費。這是一次美妙的體驗，重新點燃了我對加密世界的熱情。',
  },
  {
    name: 'Ayaka Shintani',
    avatar: 'AS',
    content: '多虧了對需要支付 Gas 費這一基本概念的重新審視，管理加密錢包和各種賬戶變得更容易、更省心。',
  },
  {
    name: 'Julien Neuvillette',
    avatar: 'JN',
    content: '怎能料到無 Gas 費的加密貨幣轉賬竟如此有顛覆性？它重燃了我對區塊鏈未來的信念。',
  },
  {
    name: 'Ilya Krasnoufimsk',
    avatar: 'IK',
    content: '這確實是一項開創性的創新。我們可以邀請加密貨幣領域的新人，而無需解釋完成交易的某些必要需求及其原因，比如 Gas 費。',
  },
  {
    name: 'Grazhio Kujab',
    avatar: 'GK',
    content: 'GasFree 真是無可匹敵——它有著優秀的機制，且用戶友好。開發者們應該因其流暢性而受到讚譽。',
  },
  {
    name: 'Muhammad Mulyam',
    avatar: 'MM',
    content: '顛覆性的新協議，它消除了加密貨幣最大的入門障礙 - 解釋 Gas 費問題 - 讓新手能像發短信一樣輕鬆體驗區塊鏈技術。',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="community" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            由繁榮的社區驅動的
            <br />
            <span className="text-gradient">更佳轉賬服務</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            全球性的倡議匯聚了志同道合者，共同致力於創造一個更美好的未來
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
