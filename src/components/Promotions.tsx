import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, ArrowLeftRight, Clock, Copy, Check } from 'lucide-react';

interface PromotionsProps {
  onApplyPromo: (code: string) => void;
}

export default function Promotions({ onApplyPromo }: PromotionsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promos = [
    {
      title: 'Khách Hàng Mới',
      desc: 'Giảm ngay 50.000đ cho chuyến đi đầu tiên khi quý khách đăng ký đặt xe trực tiếp qua website.',
      code: 'KHACHMOI',
      icon: (
        <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-6">
          <UserPlus className="w-6 h-6" />
        </div>
      )
    },
    {
      title: 'Chuyến Khứ Hồi',
      desc: 'Giảm 10% tổng hóa đơn chuyến đi khi quý khách tiến hành đặt hai chiều Hà Nội - Thanh Hóa khứ hồi.',
      code: 'KHUHOI',
      icon: (
        <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-6">
          <ArrowLeftRight className="w-6 h-6" />
        </div>
      )
    },
    {
      title: 'Đặt Trước 24h',
      desc: 'Ưu đãi ngay 5% giá cước cho các khách hàng lên lịch đặt xe sớm và hoàn tất thanh toán trước 24h.',
      code: 'DATTRUOC',
      icon: (
        <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-6">
          <Clock className="w-6 h-6" />
        </div>
      )
    }
  ];

  const handleCopy = (code: string) => {
    setCopiedCode(code);
    onApplyPromo(code); // auto apply and scroll to form
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-20 px-6 md:px-8 max-w-7xl mx-auto" id="khuyen-mai">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Chương Trình Khuyến Mãi
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mb-3"></div>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base font-light">
            Ưu đãi ngập tràn dành cho hành khách đặt xe limousine Hà Nội - Thanh Hóa hôm nay.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {promos.map((promo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 hover:shadow-floating transition-all duration-300 flex flex-col justify-between items-start"
            id={`promo-card-${index}`}
          >
            <div>
              {promo.icon}
              <h3 className="font-sans text-xl font-bold text-slate-800 mb-2">{promo.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 font-light">{promo.desc}</p>
            </div>

            <div className="w-full flex items-center justify-between border-t border-gray-50 pt-5 mt-4">
              <div className="text-left">
                <span className="text-[10px] text-gray-400 font-medium block uppercase tracking-wider">Mã Giảm Giá</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{promo.code}</span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(promo.code)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-lg transition-all cursor-pointer border border-brand-primary/10 active:scale-95"
                id={`btn-copy-promo-${index}`}
              >
                {copiedCode === promo.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Đã áp dụng!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy &amp; Áp dụng</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
