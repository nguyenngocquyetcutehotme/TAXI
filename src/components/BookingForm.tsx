import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, MapPin, Calendar, Car, Percent, Check, Sparkles, Loader } from 'lucide-react';
import { Booking, PromoCode } from '../types';

interface BookingFormProps {
  prefilledType: 'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Vé xe ghép' | 'Đặt xe liên tỉnh' | null;
  onBookingSuccess: (booking: Booking) => void;
  resetPrefilledType: () => void;
}

const HN_LOCATIONS = [
  'Hà Đông, Hà Nội',
  'Mỹ Đình, Cầu Giấy, Hà Nội',
  'Hoàn Kiếm, Hà Nội',
  'Ba Đình, Hà Nội',
  'Đống Đa, Hà Nội',
  'Sân bay Nội Bài, Hà Nội',
  'Giải Phóng, Hoàng Mai, Hà Nội',
  'Bến xe Giáp Bát, Hà Nội',
  'Bến xe Nước Ngầm, Hà Nội'
];

const TH_LOCATIONS = [
  'TP Thanh Hóa, Thanh Hóa',
  'Sầm Sơn, Thanh Hóa',
  'Bỉm Sơn, Thanh Hóa',
  'Tĩnh Gia, Nghi Sơn, Thanh Hóa',
  'Thọ Xuân, Thanh Hóa',
  'Quảng Xương, Thanh Hóa',
  'Hậu Lộc, Thanh Hóa',
  'Hoằng Hóa, Thanh Hóa'
];

const PROVINCES = [
  'Hà Nội',
  'Thanh Hóa',
  'Ninh Bình',
  'Nghệ An',
  'Hải Phòng',
  'Quảng Ninh',
  'Nam Định',
  'Thái Bình',
  'Hà Nam',
  'Hưng Yên',
  'Bắc Ninh'
];

const PROMO_CODES: Record<string, PromoCode> = {
  'KHACHMOI': { code: 'KHACHMOI', description: 'Giảm 50k cho khách hàng mới', discountType: 'fixed', discountValue: 50000 },
  'KHUHOI': { code: 'KHUHOI', description: 'Giảm 10% cho chuyến khứ hồi', discountType: 'percent', discountValue: 10 },
  'DATTRUOC': { code: 'DATTRUOC', description: 'Giảm 5% khi đặt sớm 24h', discountType: 'percent', discountValue: 5 }
};

export default function BookingForm({ prefilledType, onBookingSuccess, resetPrefilledType }: BookingFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState<'Vé xe ghép' | 'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Đặt xe liên tỉnh'>('Vé xe ghép');
  const [interprovincialType, setInterprovincialType] = useState<'Xe 4 chỗ' | 'Xe 7 chỗ' | 'Xe 16 chỗ' | 'Limousine 9 chỗ'>('Xe 4 chỗ');
  const [fromProvince, setFromProvince] = useState('Hà Nội');
  const [toProvince, setToProvince] = useState('Thanh Hóa');
  const [doorToDoorPickup, setDoorToDoorPickup] = useState(true);
  const [doorToDoorDropoff, setDoorToDoorDropoff] = useState(true);
  const [seatsCount, setSeatsCount] = useState(1);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  
  // UI states
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Handle prefilled service type from options
  useEffect(() => {
    if (prefilledType) {
      setServiceType(prefilledType);
      resetPrefilledType();
      // Scroll to booking form
      const element = document.getElementById('booking-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [prefilledType]);

  // Close suggestion dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Price calculations
  const getBasePrice = () => {
    if (serviceType === 'Vé xe ghép') {
      return 220000 * seatsCount;
    } else if (serviceType === 'Bao xe 9 chỗ') {
      return 1400000;
    } else if (serviceType === 'Bao xe 12 chỗ') {
      return 1900000;
    } else {
      // Đặt xe liên tỉnh
      let routeBase = 1500000;
      const key = `${fromProvince}-${toProvince}`;
      const reverseKey = `${toProvince}-${fromProvince}`;
      
      const rates: Record<string, number> = {
        'Hà Nội-Thanh Hóa': 1500000,
        'Hà Nội-Ninh Bình': 900000,
        'Hà Nội-Nghệ An': 2800000,
        'Hà Nội-Hải Phòng': 1100000,
        'Hà Nội-Quảng Ninh': 1600000,
        'Hà Nội-Nam Định': 1000000,
        'Hà Nội-Thái Bình': 1050000,
        'Hà Nội-Hà Nam': 600000,
        'Hà Nội-Hưng Yên': 550000,
        'Hà Nội-Bắc Ninh': 500000,
        'Thanh Hóa-Ninh Bình': 800000,
        'Thanh Hóa-Nghệ An': 1400000,
      };

      if (rates[key]) {
        routeBase = rates[key];
      } else if (rates[reverseKey]) {
        routeBase = rates[reverseKey];
      } else if (fromProvince === toProvince) {
        routeBase = 450000; // Cùng tỉnh
      } else {
        routeBase = 1200000; // Mặc định liên tỉnh khác
      }

      // Multiply by vehicle factor
      let factor = 1.0;
      if (interprovincialType === 'Xe 7 chỗ') factor = 1.25;
      else if (interprovincialType === 'Xe 16 chỗ') factor = 1.8;
      else if (interprovincialType === 'Limousine 9 chỗ') factor = 2.2;

      let calculated = routeBase * factor;

      // Add door-to-door options if checked
      if (doorToDoorPickup) calculated += 50000;
      if (doorToDoorDropoff) calculated += 50000;

      return Math.round(calculated);
    }
  };

  const basePrice = getBasePrice();
  
  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountType === 'fixed') {
      return appliedPromo.discountValue;
    } else {
      return Math.round((basePrice * appliedPromo.discountValue) / 100);
    }
  };

  const discountAmount = getDiscountAmount();
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.toUpperCase().trim();
    if (!code) return;

    if (PROMO_CODES[code]) {
      setAppliedPromo(PROMO_CODES[code]);
      setPromoInput(code);
    } else {
      setPromoError('Mã giảm giá không hợp lệ. Hãy thử: KHACHMOI, KHUHOI hoặc DATTRUOC');
      setAppliedPromo(null);
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !pickup || !dropoff || !date) {
      alert('Vui lòng điền đầy đủ các thông tin cần thiết!');
      return;
    }

    setIsSubmitting(true);

    // Simulate server request
    setTimeout(() => {
      // Driver pool for simulation
      const drivers = [
        { name: 'Nguyễn Văn Hùng', phone: '0912.834.721', plate: '29B-184.22' },
        { name: 'Trần Quốc Tuấn', phone: '0988.341.112', plate: '36A-591.03' },
        { name: 'Lê Anh Đức', phone: '0977.234.901', plate: '29B-883.41' },
        { name: 'Phạm Minh Hải', phone: '0904.551.982', plate: '36B-024.95' }
      ];
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];

      const newBooking: Booking = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName,
        phone,
        secondaryPhone: secondaryPhone || undefined,
        pickup: serviceType === 'Đặt xe liên tỉnh' ? `[${fromProvince}] ${pickup}` : pickup,
        dropoff: serviceType === 'Đặt xe liên tỉnh' ? `[${toProvince}] ${dropoff}` : dropoff,
        date,
        serviceType,
        interprovincialType: serviceType === 'Đặt xe liên tỉnh' ? interprovincialType : undefined,
        fromProvince: serviceType === 'Đặt xe liên tỉnh' ? fromProvince : undefined,
        toProvince: serviceType === 'Đặt xe liên tỉnh' ? toProvince : undefined,
        doorToDoorPickup: serviceType === 'Đặt xe liên tỉnh' ? doorToDoorPickup : false,
        doorToDoorDropoff: serviceType === 'Đặt xe liên tỉnh' ? doorToDoorDropoff : false,
        price: basePrice,
        promoCode: appliedPromo?.code,
        discount: discountAmount,
        finalPrice,
        status: 'Chờ xác nhận',
        driverName: randomDriver.name,
        driverPhone: randomDriver.phone,
        licensePlate: randomDriver.plate,
        createdAt: new Date().toISOString()
      };

      setLatestBooking(newBooking);
      onBookingSuccess(newBooking);
      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Reset form (keep name & phone for easier next usage)
      setPickup('');
      setDropoff('');
      setPromoInput('');
      setAppliedPromo(null);
    }, 1500);
  };

  const handleSelectPromo = (code: string) => {
    setPromoInput(code);
    setAppliedPromo(PROMO_CODES[code]);
    setPromoError('');
  };

  return (
    <section className="py-20 px-6 md:px-8 bg-slate-100" id="booking-section">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-floating overflow-hidden border border-gray-100">
          
          {/* Form Header */}
          <div className="bg-brand-primary p-6 md:p-8 text-white text-center relative">
            <div className="absolute top-4 right-4 bg-white/10 text-white border border-white/20 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Xác nhận cực nhanh</span>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl font-bold mb-2">Đăng Ký Đặt Xe Online</h2>
            <p className="text-slate-100/90 text-xs md:text-sm font-light">
              Chúng tôi sẽ liên hệ hoặc gửi tin nhắn SMS xác nhận trong vòng 5 phút
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
            
            {/* Step 1: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-primary" />
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ tên của bạn"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  id="input-fullname"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-brand-primary" />
                  Số điện thoại đón <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại liên hệ"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  id="input-phone"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-brand-orange" />
                  SĐT phụ / Zalo <span className="text-gray-400 font-light text-[10px]">(Không bắt buộc)</span>
                </label>
                <input
                  type="tel"
                  placeholder="Nhập số Zalo hoặc SĐT phụ"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  id="input-secondary-phone"
                />
              </div>
            </div>

            {/* Step 2: Route details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pickup location with autocomplete suggestions */}
              <div ref={pickupRef} className="space-y-1.5 relative">
                <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  {serviceType === 'Đặt xe liên tỉnh' ? "Địa chỉ đón chi tiết" : "Điểm đón khách"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={serviceType === 'Đặt xe liên tỉnh' ? `Số nhà, phố, phường... tại tỉnh ${fromProvince}` : "Ví dụ: Ba Đình, Hà Nội hoặc Khách sạn..."}
                  value={pickup}
                  onFocus={() => setShowPickupSuggestions(true)}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    setShowPickupSuggestions(true);
                  }}
                  className="w-full h-13 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  id="input-pickup"
                />
                
                <AnimatePresence>
                  {showPickupSuggestions && (serviceType !== 'Đặt xe liên tỉnh' || fromProvince === 'Hà Nội' || fromProvince === 'Thanh Hóa') && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-20 left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg max-h-56 overflow-y-auto"
                    >
                      <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                        {(serviceType === 'Đặt xe liên tỉnh' ? fromProvince : 'Hà Nội') === 'Hà Nội' ? 'Gợi ý điểm đón Hà Nội' : 'Gợi ý điểm đón Thanh Hóa'}
                      </div>
                      {((serviceType === 'Đặt xe liên tỉnh' ? fromProvince : 'Hà Nội') === 'Hà Nội' ? HN_LOCATIONS : TH_LOCATIONS)
                        .filter(loc => loc.toLowerCase().includes(pickup.toLowerCase()))
                        .map((loc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setPickup(loc);
                              setShowPickupSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-brand-primary/5 text-slate-700 text-sm transition-colors border-b border-gray-50 last:border-0"
                          >
                            {loc}
                          </button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropoff location with autocomplete suggestions */}
              <div ref={dropoffRef} className="space-y-1.5 relative">
                <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  {serviceType === 'Đặt xe liên tỉnh' ? "Địa chỉ trả chi tiết" : "Điểm trả khách"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={serviceType === 'Đặt xe liên tỉnh' ? `Số nhà, phố, phường... tại tỉnh ${toProvince}` : "Ví dụ: TP Thanh Hóa hoặc Sầm Sơn..."}
                  value={dropoff}
                  onFocus={() => setShowDropoffSuggestions(true)}
                  onChange={(e) => {
                    setDropoff(e.target.value);
                    setShowDropoffSuggestions(true);
                  }}
                  className="w-full h-13 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  id="input-dropoff"
                />

                <AnimatePresence>
                  {showDropoffSuggestions && (serviceType !== 'Đặt xe liên tỉnh' || toProvince === 'Hà Nội' || toProvince === 'Thanh Hóa') && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-20 left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg max-h-56 overflow-y-auto"
                    >
                      <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                        {(serviceType === 'Đặt xe liên tỉnh' ? toProvince : 'Thanh Hóa') === 'Hà Nội' ? 'Gợi ý điểm trả Hà Nội' : 'Gợi ý điểm trả Thanh Hóa'}
                      </div>
                      {((serviceType === 'Đặt xe liên tỉnh' ? toProvince : 'Thanh Hóa') === 'Hà Nội' ? HN_LOCATIONS : TH_LOCATIONS)
                        .filter(loc => loc.toLowerCase().includes(dropoff.toLowerCase()))
                        .map((loc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setDropoff(loc);
                              setShowDropoffSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-brand-primary/5 text-slate-700 text-sm transition-colors border-b border-gray-50 last:border-0"
                          >
                            {loc}
                          </button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Step 3: Date & Service configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-primary" />
                  Ngày khởi hành <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  id="input-date"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-brand-primary" />
                  Loại hình di chuyển <span className="text-red-500">*</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full h-13 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all bg-white font-semibold text-slate-800"
                  id="input-servicetype"
                >
                  <option value="Vé xe ghép">Vé xe ghép (Chỉ từ 220k/Ghế)</option>
                  <option value="Bao xe 9 chỗ">Bao trọn xe Limousine 9 Chỗ (1.400k)</option>
                  <option value="Bao xe 12 chỗ">Bao trọn xe Limousine 12 Chỗ (1.900k)</option>
                  <option value="Đặt xe liên tỉnh">Đặt xe liên tỉnh (Tính giá trực tiếp, Đón trả tận nơi)</option>
                </select>
              </div>
            </div>

            {/* Step 3.5: Interprovincial Configuration Panel */}
            {serviceType === 'Đặt xe liên tỉnh' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-brand-primary/[0.03] p-5 md:p-6 rounded-2xl border border-brand-primary/10 space-y-5 overflow-hidden"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></span>
                  <h4 className="font-sans font-bold text-slate-800 text-sm">Cấu hình hành trình di chuyển liên tỉnh</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* From Province */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 block">Tỉnh/Thành đi</label>
                    <select
                      value={fromProvince}
                      onChange={(e) => setFromProvince(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-sm bg-white font-medium text-slate-700"
                    >
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  {/* Interchange button */}
                  <div className="flex items-end justify-center pb-1">
                    <button
                      type="button"
                      onClick={() => {
                        const temp = fromProvince;
                        setFromProvince(toProvince);
                        setToProvince(temp);
                      }}
                      className="w-full md:w-auto px-4 h-11 bg-white hover:bg-slate-50 border border-gray-200 rounded-xl text-xs font-bold text-brand-primary shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      ⇄ Đổi chiều đi
                    </button>
                  </div>

                  {/* To Province */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 block">Tỉnh/Thành đến</label>
                    <select
                      value={toProvince}
                      onChange={(e) => setToProvince(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-sm bg-white font-medium text-slate-700"
                    >
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-gray-100">
                  {/* Interprovincial vehicle type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 block">Dòng xe yêu cầu</label>
                    <select
                      value={interprovincialType}
                      onChange={(e) => setInterprovincialType(e.target.value as any)}
                      className="w-full h-11 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-sm bg-white font-medium text-slate-700"
                    >
                      <option value="Xe 4 chỗ">Xe 4 chỗ riêng tư (Giá rẻ tối ưu)</option>
                      <option value="Xe 7 chỗ">Xe 7 chỗ rộng rãi (Gia đình, Đồ đạc)</option>
                      <option value="Xe 16 chỗ">Xe 16 chỗ lớn (Hội nhóm, Du lịch)</option>
                      <option value="Limousine 9 chỗ">Limousine 9 chỗ VIP (Khoang thương gia)</option>
                    </select>
                  </div>

                  {/* Door-to-door options */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 block">Dịch vụ đưa đón tận nơi</label>
                    <div className="flex flex-col gap-2 pt-1">
                      <label className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={doorToDoorPickup}
                          onChange={(e) => setDoorToDoorPickup(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-emerald-500"
                        />
                        <span>Đón tận nơi tại địa chỉ yêu cầu <b className="text-emerald-600 font-bold">(+50.000đ)</b></span>
                      </label>

                      <label className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={doorToDoorDropoff}
                          onChange={(e) => setDoorToDoorDropoff(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-emerald-500"
                        />
                        <span>Trả tận nơi tại địa chỉ yêu cầu <b className="text-emerald-600 font-bold">(+50.000đ)</b></span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Dynamic Seats counter for "Vé xe ghép" */}
            {serviceType === 'Vé xe ghép' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-brand-primary/5 p-4 rounded-2xl border border-brand-primary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">Số lượng ghế đặt</h5>
                  <p className="text-xs text-gray-500 font-light">Mỗi hành khách tối đa đặt 9 ghế cho một hành trình</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSeatsCount(prev => Math.max(1, prev - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-brand-primary flex items-center justify-center font-bold text-slate-700 active:scale-90 transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-slate-800 text-base w-6 text-center">{seatsCount}</span>
                  <button
                    type="button"
                    onClick={() => setSeatsCount(prev => Math.min(9, prev + 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-brand-primary flex items-center justify-center font-bold text-slate-700 active:scale-90 transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            )}

            {/* Promo Code section */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="w-full md:w-auto">
                <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-1">
                  <Percent className="w-4 h-4 text-brand-orange" />
                  Mã Khuyến Mãi
                </h5>
                <p className="text-xs text-gray-400 font-light">Áp dụng mã để nhận ưu đãi giảm giá tốt nhất</p>
                
                {/* Promo hints */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectPromo('KHACHMOI')}
                    className="text-[10px] bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-md font-semibold border border-brand-primary/10 cursor-pointer"
                  >
                    KHACHMOI (-50k)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPromo('KHUHOI')}
                    className="text-[10px] bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-md font-semibold border border-brand-primary/10 cursor-pointer"
                  >
                    KHUHOI (-10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPromo('DATTRUOC')}
                    className="text-[10px] bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-md font-semibold border border-brand-primary/10 cursor-pointer"
                  >
                    DATTRUOC (-5%)
                  </button>
                </div>
              </div>

              <div className="w-full md:w-72">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Mã giảm giá..."
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 h-11 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer active:scale-95"
                  >
                    Áp dụng
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {appliedPromo.description}
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-red-500 font-light mt-1">{promoError}</p>
                )}
              </div>
            </div>

            {/* Dynamic Receipt panel */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-gray-400 font-light block uppercase tracking-wider">Tổng kinh phí tạm tính</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-brand-orange">{formatPrice(finalPrice)}</span>
                  {discountAmount > 0 && (
                    <span className="text-xs text-gray-400 line-through">{formatPrice(basePrice)}</span>
                  )}
                </div>
                {discountAmount > 0 && (
                  <p className="text-xs text-emerald-500 font-medium mt-0.5">
                    Đã giảm {formatPrice(discountAmount)} ({appliedPromo?.code})
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-60 h-13 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-full font-bold text-base shadow-lg shadow-brand-orange/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
                id="btn-submit-booking"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Đang gửi yêu cầu...</span>
                  </>
                ) : (
                  <span>Gửi yêu cầu ngay</span>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && latestBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-floating border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <h3 className="font-sans text-xl md:text-2xl font-bold text-slate-800 mb-2">Đăng Ký Đặt Xe Thành Công!</h3>
              <p className="text-gray-500 text-sm font-light mb-6">
                Cảm ơn quý khách <b>{latestBooking.fullName}</b>! Mã đơn đặt xe của quý khách là <b className="text-brand-primary">{latestBooking.id}</b>. Tổng đài sẽ liên hệ ngay lập tức.
              </p>

              {/* Booking receipt shortcut card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 text-left space-y-2 text-xs md:text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tuyến đi:</span> 
                  <span className="font-semibold text-slate-800">
                    {latestBooking.serviceType === 'Đặt xe liên tỉnh' ? `${latestBooking.fromProvince} ➔ ${latestBooking.toProvince}` : "Hà Nội ➔ Thanh Hóa"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Loại hình:</span> 
                  <span className="font-semibold text-slate-800">
                    {latestBooking.serviceType === 'Đặt xe liên tỉnh' ? `${latestBooking.serviceType} (${latestBooking.interprovincialType})` : latestBooking.serviceType}
                  </span>
                </div>
                {latestBooking.secondaryPhone && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">SĐT phụ / Zalo:</span> 
                    <span className="font-medium text-slate-800">{latestBooking.secondaryPhone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Điểm đón:</span> 
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">{latestBooking.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Điểm trả:</span> 
                  <span className="font-medium text-slate-700 truncate max-w-[200px]">{latestBooking.dropoff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ngày khởi hành:</span> 
                  <span className="font-medium text-slate-700">{latestBooking.date}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-gray-200 pt-2">
                  <span className="text-gray-400 font-semibold">Tổng thanh toán:</span> 
                  <span className="font-extrabold text-brand-orange text-sm md:text-base">{formatPrice(latestBooking.finalPrice)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                }}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all cursor-pointer"
                id="btn-close-success-modal"
              >
                Đồng ý
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
