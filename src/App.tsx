import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquareDot, CheckCircle, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceOptions from './components/ServiceOptions';
import Features from './components/Features';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import Promotions from './components/Promotions';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ContactButtons from './components/ContactButtons';
import { Booking } from './types';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('taxi_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [prefilledType, setPrefilledType] = useState<'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Vé xe ghép' | 'Đặt xe liên tỉnh' | null>(null);
  
  // Real-time custom toast state
  const [toast, setToast] = useState<{ message: string; subText?: string; type: 'success' | 'info' } | null>(null);

  // Sync bookings list to localStorage
  useEffect(() => {
    localStorage.setItem('taxi_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Simulate booking lifecycle (Chờ xác nhận -> Đã xác nhận -> Tài xế đang đến)
  useEffect(() => {
    const pendingBooking = bookings.find(b => b.status === 'Chờ xác nhận');
    if (!pendingBooking) return;

    // After 8 seconds, simulate "Confirming"
    const confirmTimer = setTimeout(() => {
      setBookings(prevBookings =>
        prevBookings.map(b =>
          b.id === pendingBooking.id
            ? { ...b, status: 'Đã xác nhận' }
            : b
        )
      );

      setToast({
        message: `Đơn xe ${pendingBooking.id} đã được XÁC NHẬN!`,
        subText: `Tổng đài viên đã phê duyệt hành trình Hà Nội ➔ Thanh Hóa ngày ${pendingBooking.date}.`,
        type: 'success'
      });
    }, 8000);

    return () => clearTimeout(confirmTimer);
  }, [bookings]);

  // Simulate next stage (Đã xác nhận -> Tài xế đang đến)
  useEffect(() => {
    const confirmedBooking = bookings.find(b => b.status === 'Đã xác nhận');
    if (!confirmedBooking) return;

    // After 15 seconds, simulate "Driver assigned / on the way"
    const driverTimer = setTimeout(() => {
      setBookings(prevBookings =>
        prevBookings.map(b =>
          b.id === confirmedBooking.id
            ? { ...b, status: 'Tài xế đang đến' }
            : b
        )
      );

      setToast({
        message: `Tài xế đang đến đón quý khách!`,
        subText: `Tài xế ${confirmedBooking.driverName} (${confirmedBooking.licensePlate}) đang di chuyển tới điểm đón của bạn.`,
        type: 'info'
      });
    }, 15000);

    return () => clearTimeout(driverTimer);
  }, [bookings]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const dismissTimer = setTimeout(() => {
        setToast(null);
      }, 6500);
      return () => clearTimeout(dismissTimer);
    }
  }, [toast]);

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    // Show a small popup hint
    setToast({
      message: 'Hệ thống đã ghi nhận đơn đặt!',
      subText: `Mã chuyến đi: ${newBooking.id}. Nhà xe đang sắp xếp tài xế phù hợp...`,
      type: 'info'
    });
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Đã hủy' } : b))
    );
    setToast({
      message: 'Hủy đơn đặt xe thành công!',
      subText: `Đơn hàng ${id} đã được đổi trạng thái thành Hủy chuyến đi.`,
      type: 'info'
    });
  };

  const handleSelectServiceType = (type: 'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Vé xe ghép' | 'Đặt xe liên tỉnh') => {
    setPrefilledType(type);
  };

  const handleApplyPromoCode = (code: string) => {
    // We pass this into prefilled and scroll to the form section
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Set a slight delay to allow focus and typing
    setToast({
      message: `Đã tự động điền mã ${code}!`,
      subText: 'Quý khách vui lòng kiểm tra giá trị giảm giá hiển thị ở hóa đơn tạm tính.',
      type: 'success'
    });
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-brand-primary-container/20 selection:text-brand-primary">
      
      {/* Navigation Header */}
      <Header
        bookings={bookings}
        onOpenBookings={() => setIsBookingsOpen(true)}
        onScrollTo={handleScrollTo}
        onSelectServiceType={handleSelectServiceType}
      />

      {/* Hero Header Banner */}
      <Hero onScrollToBooking={() => handleScrollTo('booking-section')} />

      <main className="flex-grow">
        
        {/* Core Journey selection cards */}
        <ServiceOptions onSelectServiceType={handleSelectServiceType} />

        {/* 5-Star Features Amenities Grid */}
        <Features />

        {/* Dynamic Booking form */}
        <BookingForm
          prefilledType={prefilledType}
          onBookingSuccess={handleBookingSuccess}
          resetPrefilledType={() => setPrefilledType(null)}
        />

        {/* Proof of trust counts banner */}
        <section className="py-14 bg-slate-100 text-center border-t border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-wrap justify-around gap-8 items-center text-slate-500">
              <div className="flex flex-col items-center">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-brand-primary">15+</span>
                <span className="font-semibold text-xs md:text-sm text-slate-400 mt-1 uppercase tracking-wider">Đầu xe hiện đại</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-brand-primary">10k+</span>
                <span className="font-semibold text-xs md:text-sm text-slate-400 mt-1 uppercase tracking-wider">Lượt khách mỗi năm</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-brand-primary">100%</span>
                <span className="font-semibold text-xs md:text-sm text-slate-400 mt-1 uppercase tracking-wider">Đúng giờ, uy tín</span>
              </div>
            </div>
          </div>
        </section>

        {/* Active Promos section */}
        <Promotions onApplyPromo={handleApplyPromoCode} />

        {/* Testimonials customer reviews */}
        <Testimonials />

      </main>

      {/* Footer Area */}
      <Footer />

      {/* Floating Call & Chat Action buttons */}
      <ContactButtons
        bookingsCount={bookings.length}
        onOpenBookings={() => setIsBookingsOpen(true)}
      />

      {/* Booking List Drawer Panel */}
      <BookingList
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Dynamic Animated Notification Toasts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3.5 border border-slate-800 max-w-sm w-[90%] md:w-full"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-primary/10 text-brand-primary'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle className="w-5.5 h-5.5" />
              ) : (
                <MessageSquareDot className="w-5.5 h-5.5" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                {toast.message}
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h5>
              {toast.subText && (
                <p className="text-xs text-slate-400 font-light mt-0.5 leading-relaxed">
                  {toast.subText}
                </p>
              )}
            </div>

            <button
              onClick={() => setToast(null)}
              className="text-slate-500 hover:text-slate-300 transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
