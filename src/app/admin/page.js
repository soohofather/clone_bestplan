// 서버 컴포넌트에서 Firebase 데이터 로드
async function getContacts() {
  try {
    const firebaseUrl =
      "https://service-bestplan-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json";

    const response = await fetch(firebaseUrl, {
      cache: "no-store", // 항상 최신 데이터를 가져오기 위해
    });

    if (!response.ok) {
      throw new Error(`Firebase fetch error: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      return [];
    }

    // Firebase 객체를 배열로 변환하고 Firebase ID 추가
    const contacts = Object.entries(data).map(([firebaseId, contact]) => ({
      ...contact,
      firebaseId,
    }));

    // 최신 순으로 정렬
    return contacts.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  } catch (error) {
    console.error("Error loading contacts from Firebase:", error);
    return [];
  }
}

export default async function AdminPage() {
  // 실제 프로덕션에서는 여기에 인증 로직을 추가해야 합니다
  const contacts = await getContacts();

  return (
    <div className="admin-container">
      <h1 className="admin-title">관리자 페이지 - 상담 신청 목록</h1>

      <div style={{ marginBottom: "16px", color: "#666" }}>
        총 {contacts.length}건의 상담 신청 (Firebase 연동)
      </div>

      {contacts.length === 0 ? (
        <div className="no-data">아직 상담 신청이 없습니다.</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead className="table-header">
              <tr>
                <th>이름</th>
                <th>직업</th>
                <th>연락처</th>
                <th>상담가능시간</th>
                <th>신청일시</th>
                <th>Firebase ID</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact.firebaseId || index} className="table-row">
                  <td>{contact.name}</td>
                  <td>{contact.occupation}</td>
                  <td>{contact.contact}</td>
                  <td>{contact.availableTime}</td>
                  <td>
                    {contact.createdAt ||
                      new Date(contact.timestamp).toLocaleString("ko-KR")}
                  </td>
                  <td style={{ fontSize: "12px", color: "#888" }}>
                    {contact.firebaseId?.substring(0, 8)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
