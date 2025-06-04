import Image from "next/image";
import ContactForm from "@/components/contact-form";

export default function Home() {
  return (
    <main className="main-container">
      {/* 헤더 이미지 */}
      <div className="header">
        <h1>베스트플랜 대부중개 2025</h1>
      </div>

      {/* 메인 콘텐츠 이미지들 */}
      <div className="image-section">
        <Image
          src="https://placehold.co/1200x600"
          width={1200}
          height={600}
          alt="메인 배너 이미지"
          className="main-image"
        />
      </div>

      <div className="pink-section">
        <Image
          src="https://placehold.co/1200x600"
          width={1200}
          height={600}
          alt="서비스 소개 이미지"
          className="main-image"
        />
      </div>

      <div className="white-section">
        <Image
          src="https://placehold.co/1200x600"
          width={1200}
          height={600}
          alt="혜택 안내 이미지"
          className="main-image"
        />
      </div>

      {/* 고정된 푸터 폼 */}
      <ContactForm />
    </main>
  );
}
