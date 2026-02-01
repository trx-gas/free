import { Users } from 'lucide-react';

const partners = [
  { name: 'TronLink', logo: '🔗' },
  { name: 'Guarda', logo: '🛡️' },
  { name: 'Klever', logo: '💎' },
  { name: 'eDir', logo: '📁' },
  { name: 'JustLend', logo: '💰' },
  { name: 'WinkLink', logo: '🔮' },
  { name: 'SUN.io', logo: '☀️' },
  { name: 'BitTorrent', logo: '🌀' },
  { name: 'APENFT', logo: '🎨' },
];

const EcosystemSection = () => {
  return (
    <section id="resources" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            為增長而構建的
            <br />
            <span className="text-gradient">生態系統</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            全球性且互聯的數字錢包應用與 DApps 網絡
          </p>
        </div>

        {/* User Count */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/50 border border-border">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold">6M+</span>
            <span className="text-muted-foreground">用戶數量</span>
          </div>
        </div>

        {/* Partner Marquee */}
        <div className="relative">
          {/* First Row */}
          <div className="flex overflow-hidden mb-4">
            <div className="flex animate-marquee">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex items-center gap-3 px-6 py-4 mx-2 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all cursor-pointer min-w-fit"
                >
                  <span className="text-2xl">{partner.logo}</span>
                  <span className="font-medium whitespace-nowrap">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Reverse */}
          <div className="flex overflow-hidden mb-4">
            <div className="flex animate-marquee-reverse">
              {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex items-center gap-3 px-6 py-4 mx-2 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all cursor-pointer min-w-fit"
                >
                  <span className="text-2xl">{partner.logo}</span>
                  <span className="font-medium whitespace-nowrap">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Third Row */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee" style={{ animationDuration: '35s' }}>
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`row3-${index}`}
                  className="flex items-center gap-3 px-6 py-4 mx-2 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all cursor-pointer min-w-fit"
                >
                  <span className="text-2xl">{partner.logo}</span>
                  <span className="font-medium whitespace-nowrap">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
