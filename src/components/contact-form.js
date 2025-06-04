"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    contact: "",
    availableTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 에러 메시지 초기화
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          occupation: "",
          contact: "",
          availableTime: "",
        });
        console.log("Firebase ID:", result.firebaseId);
        // 3초 후 성공 메시지 초기화
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setError(result.error || "제출 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("제출 오류:", error);
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="contact-footer">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름 *"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">직업선택 *</option>
              <option value="회사원">회사원</option>
              <option value="자영업">자영업</option>
              <option value="프리랜서">프리랜서</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="연락처 *"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <select
              name="availableTime"
              value={formData.availableTime}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">상담시간 *</option>
              <option value="오전">오전 (9시-12시)</option>
              <option value="오후">오후 (1시-6시)</option>
              <option value="저녁">저녁 (6시-9시)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`submit-button ${isSubmitted ? "submitted" : ""} ${
            isSubmitting ? "loading" : ""
          }`}
        >
          {isSubmitting
            ? "Firebase로 전송 중..."
            : isSubmitted
            ? "Firebase 전송 완료!"
            : "빠른 상담 신청"}
        </button>

        {error && <div className="error-message">{error}</div>}
        {isSubmitted && (
          <div className="success-message">
            Firebase에 상담 신청이 저장되었습니다!
          </div>
        )}

        <div className="privacy-checkbox">
          <input type="checkbox" id="privacy" required />
          <label htmlFor="privacy">
            개인정보보호정책에 동의합니다. [자세히보기]
          </label>
        </div>
      </form>
    </footer>
  );
}
