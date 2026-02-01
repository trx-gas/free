import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: '產品', href: '#products' },
    { label: '開發者', href: '#developers' },
    { label: '資源', href: '#resources' },
    { label: '聯繫我們', href: '#contact' },
    { label: '社區', href: '#community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold">
              Gas<span className="text-primary">Free</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Globe className="w-4 h-4 mr-2" />
              繁中
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="ghost" size="sm" className="mt-4 text-muted-foreground">
              <Globe className="w-4 h-4 mr-2" />
              繁中
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
