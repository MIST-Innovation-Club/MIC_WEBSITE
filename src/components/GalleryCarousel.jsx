import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ImageOff } from "lucide-react";

export default function GalleryCarousel({ title, images }) {
  const count = images.length;

  // Repeat the real images many times so both peek sides are always real,
  // fully-rendered slides (never a Swiper loop-clone, which is what caused
  // blank slides). The user starts deep in the middle of this repeated
  // list, giving dozens of "infinite" scrolls in either direction.
  const REPEAT = count > 0 ? Math.max(9, Math.ceil(40 / count)) : 1;
  const loopedImages = useMemo(
    () => Array.from({ length: REPEAT }, () => images).flat(),
    [images, REPEAT]
  );
  const startIndex = Math.floor(loopedImages.length / 2 / count) * count;

  const [dot, setDot] = useState(0);
  const swiperRef = useRef(null);

  const Frame = ({ img }) =>
    img?.imageUrl ? (
      <img src={img.imageUrl} alt="" className="w-full h-full object-cover" draggable={false} />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-ink-900 border border-ink-400/10 text-ink-400/40">
        <ImageOff className="h-10 w-10" />
        <span className="text-xs font-mono tracking-wide">No image</span>
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto mb-16 px-4">
      <h3 className="text-center font-display font-semibold text-xl md:text-2xl text-brand-light mb-6">{title}</h3>

      <Swiper
        modules={[Navigation, Autoplay]}
        centeredSlides
        slideToClickedSlide
        initialSlide={startIndex}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setDot(((s.activeIndex % count) + count) % count)}
        autoplay={count > 1 ? { delay: 4200, disableOnInteraction: false } : false}
        navigation={count > 1}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: count > 1 ? 1.4 : 1, spaceBetween: 20 },
        }}
        className="gallery-swiper rounded-2xl"
      >
        {loopedImages.map((img, i) => (
          <SwiperSlide key={i} className="!h-auto">
            <div className="aspect-video rounded-2xl overflow-hidden border border-ink-400/15 shadow-glow-blue/10">
              <Frame img={img} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {count > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideTo(startIndex + i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === dot ? "w-6 bg-circuit" : "w-1.5 bg-ink-400/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
