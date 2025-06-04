import "./globals.css";

export const metadata = {
  title: "베스트플랜 | 대출 상담",
  description: "전문 대출 상담 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
