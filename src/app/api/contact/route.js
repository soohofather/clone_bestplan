export async function POST(request) {
  try {
    const data = await request.json();

    // 데이터 유효성 검사
    if (
      !data.name ||
      !data.occupation ||
      !data.contact ||
      !data.availableTime
    ) {
      return Response.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 연락처 형식 간단 검증
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (!phoneRegex.test(data.contact)) {
      return Response.json(
        { error: "올바른 연락처 형식을 입력해주세요." },
        { status: 400 }
      );
    }

    // 데이터에 타임스탬프와 ID 추가
    const contactData = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toLocaleString("ko-KR"),
    };

    // Firebase Realtime Database URL
    const firebaseUrl =
      "https://service-bestplan-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json";

    // Firebase에 데이터 전송
    const firebaseResponse = await fetch(firebaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!firebaseResponse.ok) {
      throw new Error(`Firebase error: ${firebaseResponse.status}`);
    }

    const firebaseResult = await firebaseResponse.json();

    return Response.json({
      success: true,
      message: "상담 신청이 완료되었습니다.",
      firebaseId: firebaseResult.name,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return Response.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
