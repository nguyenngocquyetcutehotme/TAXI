export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  secondaryPhone?: string;
  pickup: string;
  dropoff: string;
  date: string;
  serviceType: 'Vé xe ghép' | 'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Đặt xe liên tỉnh';
  interprovincialType?: 'Xe 4 chỗ' | 'Xe 7 chỗ' | 'Xe 16 chỗ' | 'Limousine 9 chỗ';
  fromProvince?: string;
  toProvince?: string;
  doorToDoorPickup: boolean;
  doorToDoorDropoff: boolean;
  price: number;
  promoCode?: string;
  discount: number;
  finalPrice: number;
  status: 'Chờ xác nhận' | 'Đã xác nhận' | 'Tài xế đang đến' | 'Đang di chuyển' | 'Đã hoàn thành' | 'Đã hủy';
  driverName?: string;
  driverPhone?: string;
  licensePlate?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  content: string;
}

export interface PromoCode {
  code: string;
  description: string;
  discountType: 'fixed' | 'percent';
  discountValue: number;
}
