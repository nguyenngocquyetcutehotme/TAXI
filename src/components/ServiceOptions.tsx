import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Users, MapPin } from 'lucide-react';

interface ServiceOptionsProps {
  onSelectServiceType: (type: 'Bao xe 9 chỗ' | 'Bao xe 12 chỗ' | 'Vé xe ghép' | 'Đặt xe liên tỉnh') => void;
}

export default function ServiceOptions({ onSelectServiceType }: ServiceOptionsProps) {
  const options = [
    {
      title: 'Bao Trọn Xe VIP',
      description: 'Dành cho gia đình, cơ quan hoặc nhóm bạn. Tận hưởng không gian riêng tư tuyệt đối và chủ động hoàn toàn về thời gian khởi hành.',
      icon: (
        <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 animate-pulse">
          <Shield className="w-8 h-8" />
        </div>
      ),
      features: [
        'Xe Limousine 9-12 chỗ đời mới sang trọng',
        'Đưa đón tận nơi tại mọi địa điểm theo yêu cầu',
        'Tùy chọn lộ trình riêng biệt, nghỉ chân linh hoạt',
        'Tài xế phục vụ riêng, giữ bí mật thông tin hành trình'
      ],
      buttonText: 'Bao xe Limousine',
      type: 'Bao xe 9 chỗ' as const,
      colorClass: 'border-brand-primary hover:shadow-brand-primary/10 text-brand-primary',
      bgClass: 'hover:bg-brand-primary hover:text-white border-brand-primary text-brand-primary'
    },
    {
      title: 'Vé Xe Ghép',
      description: 'Giải pháp tiết kiệm nhưng vẫn đảm bảo sự sang trọng. Chia sẻ hành trình cùng những hành khách văn minh, lịch sự.',
      icon: (
        <div className="w-14 h-14 bg-brand-tertiary/10 text-brand-tertiary rounded-2xl flex items-center justify-center mb-6">
          <Users className="w-8 h-8" />
        </div>
      ),
      features: [
        'Giá cả tiết kiệm chỉ từ 220.000đ / Ghế',
        'Ghế massage cao cấp chuẩn thương gia rộng rãi',
        'Tần suất khởi hành liên tục mỗi giờ từ 5h sáng',
        'Lái xe điềm đạm, cam kết không nhồi nhét khách'
      ],
      buttonText: 'Đặt ghế ghép ngay',
      type: 'Vé xe ghép' as const,
      colorClass: 'border-brand-tertiary hover:shadow-brand-tertiary/10 text-brand-tertiary',
      bgClass: 'hover:bg-brand-tertiary hover:text-white border-brand-tertiary text-brand-tertiary'
    },
    {
      title: 'Đặt Xe Liên Tỉnh',
      description: 'Dịch vụ taxi riêng liên tỉnh, tiện chuyến tiện lợi với mức giá trọn gói cạnh tranh nhất. Đón trả tận nơi, tính giá tự động.',
      icon: (
        <div className="w-14 h-14 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mb-6">
          <MapPin className="w-8 h-8" />
        </div>
      ),
      features: [
        'Hỗ trợ toàn bộ các tỉnh thành lân cận miền Bắc',
        'Dòng xe riêng tư 4 chỗ, 7 chỗ, 16 chỗ hiện đại',
        'Cung cấp bảng giá tạm tính trực tiếp tức thời',
        'Đưa đón tận cổng nhà, phục vụ chu đáo 24/7'
      ],
      buttonText: 'Yêu cầu xe liên tỉnh',
      type: 'Đặt xe liên tỉnh' as const,
      colorClass: 'border-brand-orange hover:shadow-brand-orange/10 text-brand-orange',
      bgClass: 'hover:bg-brand-orange hover:text-white border-brand-orange text-brand-orange'
    }
  ];

  return (
    <section className="py-20 px-6 md:px-8 max-w-7xl mx-auto" id="dich-vu">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Lựa Chọn Hành Trình Của Bạn
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mb-3"></div>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base font-light">
            Cung cấp dịch vụ đa dạng phù hợp với mọi nhu cầu di chuyển đơn lẻ hay gia đình của bạn.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`group bg-white p-8 rounded-2xl shadow-premium border border-gray-100 hover:shadow-floating hover:border-gray-200/80 transition-all duration-300 flex flex-col justify-between`}
            id={`service-card-${index}`}
          >
            <div>
              {option.icon}
              <h3 className="font-sans text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-brand-primary transition-colors">
                {option.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light h-20 overflow-hidden">
                {option.description}
              </p>

              <ul className="space-y-3.5 mb-8">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectServiceType(option.type);
                // Also scroll to booking form
                const element = document.getElementById('booking-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`w-full py-3 border-2 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 cursor-pointer text-center ${option.bgClass} active:scale-98`}
              id={`btn-select-service-${index}`}
            >
              {option.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
