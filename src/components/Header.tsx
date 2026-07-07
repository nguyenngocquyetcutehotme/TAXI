import React, { useState } from 'react';
import { Menu, X, Phone, Car, Clock } from 'lucide-react';
import { Booking } from '../types';

interface HeaderProps {
  bookings: Booking[];
  onOpenBookings: () => void;
  onScrollTo: (id: string) => void;
  onSelectServiceType?: (type: 'Vé xe ghép' | 'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Đặt xe liên tỉnh') => void;
}

export default function Header({ bookings, onOpenBookings, onScrollTo, onSelectServiceType }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeBookings = bookings.filter(b => b.status !== 'Đã hủy' && b.status !== 'Đã hoàn thành');

  const navItems = [
    { name: 'Trang chủ', id: 'home' },
    { name: 'Vé Xe Ghép', id: 'booking-section', serviceType: 'Vé xe ghép' as const },
    { name: 'Bao Xe Limousine', id: 'booking-section', serviceType: 'Bao xe 9 chỗ' as const },
    { name: 'Xe Liên Tỉnh', id: 'booking-section', serviceType: 'Đặt xe liên tỉnh' as const },
    { name: 'Khuyến mãi', id: 'khuyen-mai' },
    { name: 'Đánh giá', id: 'danh-gia' },
    { name: 'Liên hệ', id: 'lien-he' },
  ];

  const handleNavClick = (id: string, serviceType?: 'Vé xe ghép' | 'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Đặt xe liên tỉnh') => {
    setIsOpen(false);
    onScrollTo(id);
    if (serviceType && onSelectServiceType) {
      onSelectServiceType(serviceType);
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <nav className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="logo-container"
        >
          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
            <Car className="w-6 h-6" />
          </div>
          <span className="font-sans text-xl md:text-2xl font-bold text-brand-primary tracking-tight">
            Taxi Tiện Chuyến
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 lg:gap-8 items-center font-medium text-gray-600">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavClick(item.id, item.serviceType)}
                className="hover:text-brand-primary transition-colors cursor-pointer py-1 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <a 
            href="tel:0912345678" 
            className="hidden lg:flex items-center gap-1.5 font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-orange animate-pulse" />
            <span>Hotline: 09xx</span>
          </a>

          {/* Bookings Tracker Button */}
          {bookings.length > 0 && (
            <button
              onClick={onOpenBookings}
              className="relative p-2 text-gray-600 hover:text-brand-primary bg-gray-50 hover:bg-brand-primary/5 rounded-full transition-all duration-300"
              title="Đơn đặt của tôi"
              id="btn-bookings-tracker"
            >
              <Clock className="w-5 h-5" />
              {activeBookings.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                  {activeBookings.length}
                </span>
              )}
            </button>
          )}

          <button 
            onClick={() => handleNavClick('booking-section')}
            className="bg-brand-primary text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-brand-primary/90 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            id="btn-order-now-header"
          >
            ĐẶT XE NGAY
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-gray-600 hover:text-brand-primary hover:bg-gray-50 rounded-lg transition-all"
            id="btn-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4 px-6 shadow-inner animate-fade-in">
          <ul className="flex flex-col gap-4 font-semibold text-gray-700">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.id, item.serviceType)}
                  className="w-full text-left py-2 hover:text-brand-primary border-b border-gray-50 transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
            {bookings.length > 0 && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBookings();
                  }}
                  className="w-full text-left py-2 hover:text-brand-primary text-brand-orange border-b border-gray-50 flex items-center justify-between"
                >
                  <span>Đơn đặt của tôi</span>
                  <span className="bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full">
                    {bookings.length}
                  </span>
                </button>
              </li>
            )}
            <li className="pt-2">
              <a 
                href="tel:0912345678" 
                className="flex items-center gap-2 text-brand-primary py-1 font-bold"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                Hotline: 09xx.xxx.xxx
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
