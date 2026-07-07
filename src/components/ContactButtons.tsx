import React from 'react';
import { Phone, Clock } from 'lucide-react';
import { Booking } from '../types';

interface ContactButtonsProps {
  bookingsCount: number;
  onOpenBookings: () => void;
}

export default function ContactButtons({ bookingsCount, onOpenBookings }: ContactButtonsProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-40">
      
      {/* My Bookings Quick Button */}
      {bookingsCount > 0 && (
        <button
          onClick={onOpenBookings}
          className="w-13 h-13 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-floating hover:scale-110 active:scale-95 transition-all cursor-pointer relative group border border-slate-700"
          title="Đơn đặt của tôi"
          id="floating-btn-bookings"
        >
          <Clock className="w-5.5 h-5.5" />
          <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            {bookingsCount}
          </span>
          {/* Tooltip */}
          <span className="absolute right-15 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            Đơn hàng của bạn ({bookingsCount})
          </span>
        </button>
      )}

      {/* Zalo Chat Floating Button */}
      <a
        href="https://zalo.me/0912345678"
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 bg-[#0068FF] rounded-full flex items-center justify-center shadow-floating hover:scale-110 active:scale-95 transition-all cursor-pointer group relative"
        title="Chat qua Zalo"
        id="floating-btn-zalo"
      >
        <img
          alt="Zalo"
          className="w-7 h-7 invert brightness-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-7eo-q8pbs9zZl5YAGAmse-p0p3GdH3KIYIVO9HlCXqsHEwVUkUWxbEqnGMilgmrE_05C06dZ8Gu_J0W927XaGFoN7OCC6i1eH-Z1jg8EYopQLnKrqDBC7mzykHgapWr_NL1Ds1NVO_M3ymQAy7k-Ps8OBBCbTq5zuOURu1iph6kPXTE1OePihzO1OGdlWGQIf_WY6yM-FezwfMP84h_rRVbqkkwAeGMJCbsgd2azTadzGTehDwt7W4ulO_fFceGrMMcjq1JCXY9B"
          referrerPolicy="no-referrer"
        />
        {/* Tooltip */}
        <span className="absolute right-15 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Nhắn Zalo tư vấn ngay
        </span>
      </a>

      {/* Call Hotline Floating Button */}
      <a
        href="tel:0912345678"
        className="w-13 h-13 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-floating hover:scale-110 active:scale-95 transition-all cursor-pointer group relative animate-bounce hover:animate-none"
        title="Gọi điện hotline"
        id="floating-btn-phone"
      >
        <Phone className="w-5.5 h-5.5" />
        {/* Tooltip */}
        <span className="absolute right-15 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Gọi điện Hotline: 09xx
        </span>
      </a>

    </div>
  );
}
