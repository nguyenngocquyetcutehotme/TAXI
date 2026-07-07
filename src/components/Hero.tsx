import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, Users } from 'lucide-react';

interface HeroProps {
  onScrollToBooking: () => void;
}

export default function Hero({ onScrollToBooking }: HeroProps) {
  return (
    <section className="relative min-h-[680px] lg:min-h-[800px] flex items-center overflow-hidden bg-slate-950 text-white" id="home">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover brightness-[0.35] scale-105 transform transition-transform duration-[10000ms]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-4S0xbWwhCDtXfmAUYN9SSSWvv0FCh45mnoWRJ9jO40TW7VwSoSWxdXJXMEHNv1VqjYFWloZ4mUZnuN26voMxZ2ChkCKGscyaLv56M50b3m3tIaAzYf0W8jvel7flxPWkgJZx6vRnu03lceREaBETmnrKdeY9cprOvtNjLXViK_MQQNkzik_v05o5Re-boNzvZhHWWjmCaHLjDaR6hNkwQ1AkJx7nCtslpwLdxOuW2kEB4oJHWBIgBjC7PcumVzphXQsvMu__VA9t"
          alt="Xe limousine hạng sang Hà Nội - Thanh Hóa"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 w-full">
        <div className="max-w-2xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-brand-tertiary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-brand-tertiary-container/30 shadow-sm shadow-brand-tertiary/20">
              HÀ NỘI — THANH HÓA
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight"
          >
            Limousine Hà Nội - <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-brand-orange">
              Thanh Hóa
            </span>: Đẳng Cấp & Uy Tín
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-lg md:text-xl text-slate-100/90 leading-relaxed mb-8 font-light"
          >
            Dịch vụ đưa đón tận nơi, xe đời mới, tài xế chuyên nghiệp. Cam kết uy tín tuyệt đối từ nhà xe cá nhân tiện chuyến hàng đầu.
          </motion.p>

          {/* CTA & Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <button
              onClick={onScrollToBooking}
              className="group bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-brand-orange/30 hover:bg-brand-orange/90 hover:shadow-xl hover:shadow-brand-orange/40 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              id="btn-hero-cta"
            >
              <span>Đặt xe ngay</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Drivers Proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full border-2 border-white/80 bg-slate-800 overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDARdUOrmbaOZ2o0DSmVFgDQRfNGiGu-e9_gcC2IlU781V4yLv0HnDa9jlEwjdNbmHwPRCKfLHnWycv7tNwJ7VaC1pyRgzz0jaKTbbVe66qvUq8bTxdBbAWrE2hAPSgaEH-tmfUh3U_ZQhekW2p2ghN1oI21_MYYvGXGIY92CJCYzZ7c8boK5ZJSRWBfq902oiOcuSStGztRTGxKkwCsedI9B2eZhVfqaZe2RxpoRUvJaOn-Sbd5KExtnkkmLN8QX2gqiqfiBBVrrBM"
                    alt="Tài xế chuyên nghiệp"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white/80 bg-brand-primary-container text-white text-xs font-bold flex items-center justify-center shadow-md">
                  +5k
                </div>
              </div>
              <div className="text-slate-100 text-sm">
                <div className="flex items-center gap-1 font-semibold text-amber-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>10+ năm kinh nghiệm</span>
                </div>
                <p className="text-xs text-slate-300 font-light">Lái xe tận tâm, an toàn tuyệt đối</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
