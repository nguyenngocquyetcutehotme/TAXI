import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Nguyễn Văn An',
      role: 'Khách hàng thân thiết',
      initials: 'AN',
      text: 'Xe rất mới và sạch sẽ. Bác tài lái xe rất êm và đúng giờ. Tôi rất hài lòng với dịch vụ limousine Hà Nội - Thanh Hóa này.'
    },
    {
      name: 'Lê Thị Hương',
      role: 'Khách hàng mới',
      initials: 'HL',
      text: 'Dịch vụ đưa đón tận nơi cực kỳ tiện lợi, không phải ra bến xe đông đúc. Nhân viên tư vấn nhiệt tình, đặt xe nhanh chóng.'
    },
    {
      name: 'Trần Minh',
      role: 'Doanh nhân',
      initials: 'TM',
      text: 'Giá cả minh bạch, không phát sinh thêm chi phí. Ghế massage trên xe nằm rất thoải mái, đi đường dài mà không thấy mệt.'
    }
  ];

  return (
    <section className="py-20 px-6 md:px-8 bg-slate-50" id="danh-gia">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Đánh Giá Từ Khách Hàng
            </h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mb-3"></div>
            <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base font-light">
              Ý kiến phản hồi thực tế từ những hành khách đã trải nghiệm dịch vụ di chuyển của chúng tôi.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 hover:shadow-floating transition-all duration-300 flex flex-col justify-between"
              id={`review-card-${index}`}
            >
              <div>
                {/* Stars rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed italic mb-8 font-light">
                  "{review.text}"
                </p>
              </div>

              {/* User Profile info */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary text-sm shadow-inner shrink-0">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm md:text-base">{review.name}</h4>
                  <p className="text-xs text-gray-400 font-light mt-0.5">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
