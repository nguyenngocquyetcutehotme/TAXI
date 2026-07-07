import React from 'react';
import { Car, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800" id="lien-he">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center text-white">
              <Car className="w-6 h-6" />
            </div>
            <span className="font-sans text-xl md:text-2xl font-bold text-white tracking-tight">
              Taxi Tiện Chuyến
            </span>
          </div>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md font-light">
            Nhà xe chuyên tuyến Hà Nội - Thanh Hóa với tôn chỉ phục vụ tận tâm, chu đáo, mang lại sự an toàn và thoải mái tuyệt đối cho quý khách hàng trên từng nẻo đường di chuyển.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 text-xs font-semibold">
            <a href="#" className="hover:text-brand-primary transition-colors">Facebook</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-brand-primary transition-colors">Zalo</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-brand-primary transition-colors">Google Maps</a>
          </div>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="font-bold text-white text-base mb-6 tracking-wide">LIÊN HỆ 24/7</h4>
          <ul className="space-y-4 text-xs md:text-sm text-slate-400 font-light">
            <li className="flex items-center gap-2.5 hover:text-slate-200 transition-colors">
              <Phone className="w-4 h-4 text-brand-primary shrink-0" />
              <span>09xx.xxx.xxx</span>
            </li>
            <li className="flex items-center gap-2.5 hover:text-slate-200 transition-colors">
              <Mail className="w-4 h-4 text-brand-primary shrink-0" />
              <span className="truncate">contact@taxitienchuyen.vn</span>
            </li>
            <li className="flex items-start gap-2.5 hover:text-slate-200 transition-colors">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <span>TP. Thanh Hóa &amp; Bến xe Mỹ Đình, Hà Nội</span>
            </li>
          </ul>
        </div>

        {/* Terms Column */}
        <div>
          <h4 className="font-bold text-white text-base mb-6 tracking-wide">QUY ĐỊNH &amp; CHÍNH SÁCH</h4>
          <ul className="space-y-3.5 text-xs md:text-sm text-slate-400 font-light">
            <li>
              <a href="#" className="hover:text-brand-primary hover:underline transition-all">
                Chính sách hủy chuyến đi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary hover:underline transition-all">
                Bảo mật thông tin khách hàng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary hover:underline transition-all">
                Chính sách bồi thường dịch vụ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary hover:underline transition-all">
                Khiếu nại &amp; Phản hồi
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Rights */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-8 text-center text-xs md:text-sm text-slate-500 font-light">
        © {currentYear} Taxi Tiện Chuyến. All rights reserved. Phát triển bởi AI Studio Workspace.
      </div>
    </footer>
  );
}
