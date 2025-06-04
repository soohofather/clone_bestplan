/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co"],
    dangerouslyAllowSVG: true, // ⛔ 보안상 위험할 수 있음
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // 보안 설정 보완 // 외부 이미지 도메인 등록
  },
};

export default nextConfig;
