import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Wifi, Armchair, BadgeDollarSign, Star } from 'lucide-react';

export default function Features() {
  const items = [
    {
      title: 'Đưa đón tận nơi',
      desc: 'Không cần ra bến, xe đón trả tận cửa nhà, cơ quan hoặc khách sạn của bạn.',
      icon: <MapPin className="w-5 h-5 text-brand-primary" />
    },
    {
      title: 'Wifi & Nước uống',
      desc: 'Hệ thống Wifi 4G tốc độ cao, nước khoáng lạnh và khăn ướt phục vụ miễn phí suốt hành trình.',
      icon: <Wifi className="w-5 h-5 text-brand-primary" />
    },
    {
      title: 'Ghế Massage cao cấp',
      desc: 'Thư giãn tối đa trên các ghế bọc da chỉnh điện sang trọng tích hợp hệ thống massage rung đa điểm.',
      icon: <Armchair className="w-5 h-5 text-brand-primary" />
    },
    {
      title: 'Giá cạnh tranh',
      desc: 'Giá cước công khai minh bạch, tuyệt đối không tăng giá ngày lễ Tết hay phát sinh chi phí ẩn.',
      icon: <BadgeDollarSign className="w-5 h-5 text-brand-primary" />
    }
  ];

  return (
    <section className="bg-slate-50 py-20" id="tien-ich">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text and Features List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Tiện Ích 5 Sao Trên Mọi Nẻo Đường
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-start p-1 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-brand-primary/10 p-3 rounded-xl shrink-0 text-brand-primary shadow-sm shadow-brand-primary/5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base mb-1.5">{item.title}</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Img with rating tag */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-premium group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6000ms]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvvoRGOBZYbBAKzBx5KW1XrUbfhN_6SIhZdrEg47YHlLndkoE5pBsm6lQcGof70WaDRHbjRctRO_rwat3NSMbJk8pANyQz6_I5vhCe-NPRqHL_TCaQPp1JC7G_qsGNjFuRz-wIy1U_wm32gzN9ju87VhzHKTwVAaJANgo4sOr03oQUsalVAE8hznAwYpUeCZS0R6cFzAhrA4B7XIxzJ5uAyElQ2Y8iUoCGJLT4bddOWwg1MUhzSZcEva3tn7Vh4d_xK8eKg8xR9ehj"
                alt="Xe limousine di chuyển trên cao tốc êm ái"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            </div>

            {/* Floating Rating Card */}
            <div className="absolute -bottom-6 -left-4 md:-left-6 bg-white p-5 rounded-2xl shadow-floating max-w-[240px] border border-gray-100/60">
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-extrabold text-slate-800 text-base">4.9/5 Rating</span>
              </div>
              <p className="text-xs text-gray-500 italic leading-relaxed font-light">
                "Dịch vụ tuyệt vời, lái xe êm ái, đón trả khách đúng giờ và nhiệt tình chu đáo!"
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
