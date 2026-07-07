import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Car, Phone, Info, Trash2, ShieldAlert, User, Star } from 'lucide-react';
import { Booking } from '../types';

interface BookingListProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function BookingList({ isOpen, onClose, bookings, onCancelBooking }: BookingListProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Chờ xác nhận':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200/50 text-xs font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Chờ xác nhận
          </span>
        );
      case 'Đã xác nhận':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200/50 text-xs font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Đã xác nhận
          </span>
        );
      case 'Tài xế đang đến':
        return (
          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200/50 text-xs font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce"></span>
            Tài xế đang đến
          </span>
        );
      case 'Đang di chuyển':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-xs font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Đang di chuyển
          </span>
        );
      case 'Đã hoàn thành':
        return (
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 border border-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">
            Đã hoàn thành
          </span>
        );
      case 'Đã hủy':
        return (
          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200/50 text-xs font-semibold px-2.5 py-1 rounded-full">
            Đã hủy
          </span>
        );
    }
  };

  const handleCancelClick = (id: string) => {
    if (window.confirm('Quý khách có chắc chắn muốn hủy đơn đặt xe này không?')) {
      onCancelBooking(id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          {/* Backdrop Closer */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-sans text-xl font-bold text-slate-800">Đơn Đặt Xe Của Tôi</h3>
                <p className="text-xs text-gray-400 font-light mt-0.5">Quản lý lịch trình di chuyển của quý khách</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition-all"
                id="btn-close-bookings-drawer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Bookings List Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {bookings.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-gray-400 mb-2">
                    <Car className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-700 text-base">Chưa có chuyến đi nào</h4>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-light">
                    Quý khách chưa thực hiện đặt chuyến đi nào trên thiết bị này. Hãy tiến hành đặt xe ngay để trải nghiệm dịch vụ.
                  </p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-gray-150 shadow-premium overflow-hidden hover:border-gray-300 transition-all duration-300"
                    id={`my-booking-card-${booking.id}`}
                  >
                    {/* Card Header */}
                    <div className="px-5 py-3.5 bg-slate-50 border-b border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-primary text-sm">{booking.id}</span>
                        <span className="text-[10px] text-gray-400 font-light">•</span>
                        <span className="text-xs text-slate-600 font-semibold">
                          {booking.serviceType === 'Đặt xe liên tỉnh' ? `Xe liên tỉnh (${booking.interprovincialType})` : booking.serviceType}
                        </span>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-4">
                      {/* Timeline details */}
                      <div className="relative pl-6 space-y-4">
                        <div className="absolute top-1 bottom-1 left-2 w-0.5 border-l-2 border-dashed border-gray-200"></div>

                        {/* Pickup point */}
                        <div className="relative">
                          <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-100"></div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Điểm Đón</p>
                          <p className="text-xs md:text-sm text-slate-700 font-semibold mt-0.5 truncate">{booking.pickup}</p>
                        </div>

                        {/* Dropoff point */}
                        <div className="relative">
                          <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-brand-orange border-2 border-white ring-2 ring-orange-100"></div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Điểm Trả</p>
                          <p className="text-xs md:text-sm text-slate-700 font-semibold mt-0.5 truncate">{booking.dropoff}</p>
                        </div>
                      </div>

                      {/* Time Details */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-50 text-xs md:text-sm text-slate-600 font-light">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          Ngày đi: <b>{booking.date}</b>
                        </span>
                        <span>
                          Thời gian: <b>Cả ngày (linh hoạt)</b>
                        </span>
                      </div>

                      {/* Assigned Driver (if accepted) */}
                      {booking.status !== 'Đã hủy' && booking.driverName && (
                        <div className="bg-brand-primary/[0.03] p-4 rounded-xl border border-brand-primary/10 space-y-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
                              {booking.driverName.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-800 text-xs md:text-sm">{booking.driverName}</span>
                                <span className="flex items-center text-[10px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 mr-0.5" /> 4.9
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-400 font-light">Tài xế được liên kết phụ trách chuyến</p>
                            </div>
                          </div>

                          <div className="flex justify-between text-xs font-semibold pt-1 text-slate-700">
                            <div>Biển số: <b className="text-brand-primary">{booking.licensePlate}</b></div>
                            <div>Hotline: <a href={`tel:${booking.driverPhone}`} className="text-brand-orange hover:underline">{booking.driverPhone}</a></div>
                          </div>
                        </div>
                      )}

                      {/* Pricing Details */}
                      <div className="bg-slate-50 px-4 py-3 rounded-xl border border-gray-100 flex flex-col gap-1.5 text-xs md:text-sm">
                        <div className="flex justify-between items-center text-slate-600 font-light flex-wrap gap-2">
                          <span>Khách hàng: <b>{booking.fullName}</b></span>
                          {booking.secondaryPhone && (
                            <span className="text-[11px]">Zalo/SĐT phụ: <b>{booking.secondaryPhone}</b></span>
                          )}
                        </div>
                        {booking.serviceType === 'Đặt xe liên tỉnh' && (booking.doorToDoorPickup || booking.doorToDoorDropoff) && (
                          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-gray-200/40">
                            {booking.doorToDoorPickup && (
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-200/40">Đón tận nhà</span>
                            )}
                            {booking.doorToDoorDropoff && (
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-200/40">Trả tận nhà</span>
                            )}
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-1.5 border-t border-gray-200/50">
                          <span className="text-gray-400 font-light">Tổng cộng</span>
                          <span className="font-extrabold text-brand-orange text-base">{formatPrice(booking.finalPrice)}</span>
                        </div>
                      </div>

                      {/* Control buttons */}
                      {(booking.status === 'Chờ xác nhận' || booking.status === 'Đã xác nhận' || booking.status === 'Tài xế đang đến') && (
                        <button
                          type="button"
                          onClick={() => handleCancelClick(booking.id)}
                          className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border border-red-200/40"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Hủy chuyến đi</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer advice */}
            <div className="p-4 bg-slate-50 border-t border-gray-100 text-[11px] text-gray-400 font-light flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Để chỉnh sửa thông tin người đi hoặc thay đổi lộ trình sau khi đặt, quý khách vui lòng liên hệ tổng đài hotline 24/7 để được hỗ trợ kịp thời.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
