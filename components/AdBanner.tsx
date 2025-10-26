type AdProps = {
  imageUrl?: string; // اختياري
  alt?: string;
};

export default function AdBanner({ imageUrl, alt }: AdProps) {
  return (
    <div className="rounded-2xl overflow-hidden border w-full">
      <img
        src={imageUrl || "/Images/FakeNews.png"} // صورة افتراضية
        alt={alt || "إعلان"}
        className="w-full h-[320px] object-cover"
      />
    </div>
  );
}
