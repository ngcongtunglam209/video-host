export type Region = "vn" | "world";

export type Story = {
  region: Region;
  tag: string;
  headline: string;
  bullets: string[];
  stat?: { value: string; label: string };
  source: string;
  image: string;
  // How to frame the image inside the panel (CSS object-position).
  imagePosition?: string;
  imageCaption: string;
  imageCredit: string;
};

export const BULLETIN_DATE = "Thứ Tư, 21/10/2026";

export const stories: Story[] = [
  {
    region: "vn",
    tag: "Ngoại giao",
    headline:
      "Việt Nam – Đan Mạch nâng cấp quan hệ lên Đối tác chiến lược toàn diện",
    bullets: [
      "Tổng Bí thư, Chủ tịch nước Tô Lâm và Phu nhân kết thúc chuyến thăm cấp Nhà nước tới Đan Mạch trưa 21/10 (giờ địa phương).",
      "Đan Mạch là nước thứ hai trong EU thiết lập quan hệ Đối tác chiến lược toàn diện với Việt Nam.",
      "Nhà vua Frederik X và Hoàng hậu Mary chủ trì lễ tiễn tại Cung điện Amalienborg.",
    ],
    source: "Báo Nhân Dân",
    image: "news/denmark.jpg",
    imageCaption: "Quảng trường Amalienborg, Copenhagen (ảnh tư liệu)",
    imageCredit: "Visit European Castles / CC BY-SA 4.0",
  },
  {
    region: "vn",
    tag: "Y tế",
    headline: "Thủ tướng: Đưa giá thuốc, trang thiết bị y tế về mức hợp lý",
    bullets: [
      "Sáng 21/10, Quốc hội thảo luận tại tổ các dự án luật về y tế, xã hội, trong đó có Luật Dược và Luật Bảo hiểm y tế.",
      "Thủ tướng Lê Minh Hưng: chi phí thuốc, thiết bị y tế bị đẩy lên quá mức, rất phi lý; một số quy định bất cập phải sửa ngay.",
      "Mục tiêu là người bệnh và bệnh viện tiếp cận thuốc, thiết bị y tế với giá phù hợp khả năng chi trả.",
    ],
    source: "Báo Nhân Dân",
    image: "news/assembly.jpg",
    imageCaption: "Tòa nhà Quốc hội, Hà Nội (ảnh tư liệu)",
    imageCredit: "Christophe95 / CC BY-SA 4.0",
  },
  {
    region: "vn",
    tag: "Chứng khoán",
    headline: "VN-Index tăng gần 47 điểm, lấy lại mốc 1.700",
    bullets: [
      "VN-Index tăng 46,7 điểm (2,76%), đóng cửa ở 1.738,7 điểm, mức tăng mạnh nhất kể từ phiên 8/4.",
      "Khối ngoại mua ròng trở lại sau 20 phiên bán ròng liên tiếp.",
      "Nhiều ngân hàng đã giảm lãi suất theo chỉ đạo của Chính phủ và Ngân hàng Nhà nước.",
    ],
    stat: { value: "1.738,7", label: "điểm · +46,7 (+2,76%)" },
    source: "Báo Tin tức (TTXVN)",
    image: "news/hose.jpg",
    imageCaption: "Sở Giao dịch Chứng khoán TP.HCM (ảnh tư liệu)",
    imageCredit: "Lengkeng91 / Public domain",
  },
  {
    region: "vn",
    tag: "Hạ tầng",
    headline: "Sân bay Long Thành tăng tốc về đích cuối năm",
    bullets: [
      "ACV đã thực hiện 7 đợt thanh toán, tổng khoảng 6.300 tỷ đồng cho các nhà thầu trong 5 tháng qua.",
      "Mục tiêu đưa sân bay vào khai thác thương mại vào cuối năm nay.",
      "Thủ tướng giao Bộ Công Thương điều phối vật liệu xây dựng cho công trình trọng điểm, báo cáo trước 25/10.",
    ],
    stat: { value: "6.300 tỷ", label: "đồng đã thanh toán cho nhà thầu" },
    source: "Báo Tin tức (TTXVN)",
    image: "news/longthanh.jpg",
    imageCaption: "Hệ thống cao tốc quanh khu vực sân bay Long Thành (ảnh tư liệu)",
    imageCredit: "Hwipadam / CC BY-SA 4.0",
  },
  {
    region: "vn",
    tag: "Thể thao",
    headline: "Đỗ Thanh Hải giành HCV đầu tiên cho Việt Nam tại Asian Para Games",
    bullets: [
      "Nội dung 100m bơi ếch nam hạng SB5 tại Nagoya (Nhật Bản), thành tích 1 phút 33 giây 91.",
      "Lê Tiến Đạt giành Huy chương Bạc cùng nội dung với 1 phút 36 giây 63.",
      "Đây là tấm HCV đầu tiên của Đoàn Thể thao người khuyết tật Việt Nam tại đại hội.",
    ],
    stat: { value: "1:33.91", label: "100m bơi ếch nam SB5" },
    source: "Báo Nhân Dân",
    image: "news/paraswim.jpg",
    imageCaption: "Ảnh minh họa: thi đấu bơi người khuyết tật",
    imageCredit: "U.S. Army / Staff Sgt. Michael Hunnisett / Public domain",
  },
  {
    region: "world",
    tag: "Nga – Ukraine",
    headline: "Nga trả tự do công dân Mỹ trong chuyến thăm của đặc phái viên Witkoff",
    bullets: [
      "Nga thả ông Stephen Hubbard, 74 tuổi, bị giam hơn 4 năm với cáo buộc làm lính đánh thuê cho Ukraine.",
      "Điện Kremlin cho biết sẵn sàng cho các cuộc đàm phán hòa bình mới về Ukraine.",
      "Tổng thống Zelensky ủng hộ đóng băng chiến tuyến như bước đầu tiến tới ngừng bắn.",
    ],
    source: "Euronews, Democracy Now!",
    image: "news/kremlin.jpg",
    imagePosition: "35% 50%",
    imageCaption: "Điện Kremlin, Moskva (ảnh tư liệu)",
    imageCredit: "Максим Улитин / CC BY 3.0",
  },
  {
    region: "world",
    tag: "Châu Âu",
    headline: "Làn sóng biểu tình vì chi phí sinh hoạt lan rộng khắp châu Âu",
    bullets: [
      "Pháp: hàng trăm nghìn người tuần hành tại hơn 140 thành phố hôm thứ Bảy, khoảng 2.400 người bị bắt.",
      "Pháp triển khai quân đội trước đợt biểu tình cuối tuần; Italy điều 500 binh sĩ tới Milan.",
      "Hàng nghìn người xuống đường tại Lisbon (Bồ Đào Nha) phản đối khủng hoảng nhà ở.",
    ],
    source: "Euronews, Democracy Now!",
    image: "news/paris.jpg",
    imageCaption: "Place de la République, Paris (ảnh tư liệu)",
    imageCredit: "Erwmat / CC BY-SA 4.0",
  },
  {
    region: "world",
    tag: "Y tế toàn cầu",
    headline: "Nigeria xác nhận ca nhiễm Ebola đầu tiên",
    bullets: [
      "Bệnh nhân là một phụ nữ đến Abuja bằng đường hàng không từ Uganda, được xác nhận nhiễm bệnh ngày 20/10.",
      "Nhà chức trách đã xác định 44 người tiếp xúc gần, phần lớn là nhân viên y tế.",
      "Đợt dịch bùng phát tại CHDC Congo từ tháng 5 và đã lan sang nhiều nước châu Phi.",
    ],
    stat: { value: "44", label: "người tiếp xúc gần đang được theo dõi" },
    source: "Al Jazeera",
    image: "news/ebola.jpg",
    imageCaption: "Virus Ebola dưới kính hiển vi điện tử (ảnh tư liệu)",
    imageCredit: "CDC / Cynthia Goldsmith / Public domain",
  },
  {
    region: "world",
    tag: "Thời tiết",
    headline: "Bão Adam gây thiệt hại nặng ở miền Đông Tây Ban Nha",
    bullets: [
      "Ít nhất 5 người thiệt mạng, hàng nghìn người phải sơ tán.",
      "Công tác dọn dẹp bắt đầu sau những trận mưa xối xả gây ngập lụt.",
    ],
    stat: { value: "≥ 5", label: "người thiệt mạng" },
    source: "Euronews",
    image: "news/spain.jpg",
    imageCaption: "Ảnh vệ tinh lũ lụt tại Valencia năm 2024 (ảnh tư liệu)",
    imageCredit: "NASA GSFC / MODIS / Public domain",
  },
  {
    region: "world",
    tag: "Thời tiết",
    headline: "Siêu bão Champi mạnh nhất Tây Bắc Thái Bình Dương từ đầu năm",
    bullets: [
      "Sáng 21/10 bão đạt cấp 17, giật trên cấp 17; sức gió khoảng 210 km/h, áp suất tâm 900 hPa.",
      "Tâm bão cách đảo Luzon (Philippines) khoảng 800 km về phía Đông Đông Nam.",
      "Dự báo không vào Biển Đông, nhưng hoàn lưu gây gió giật cấp 8–9, sóng cao 2–4 m ở phía Bắc Biển Đông.",
    ],
    stat: { value: "210 km/h", label: "sức gió theo số liệu vệ tinh" },
    source: "Báo Nhân Dân",
    image: "news/typhoon.jpg",
    imageCaption: "Ảnh minh họa: ảnh vệ tinh siêu bão Hagibis (2019)",
    imageCredit: "NASA GSFC / MODIS / Public domain",
  },
];

export const INTRO_IMAGE = {
  image: "news/intro.jpg",
  credit: "NASA Scientific Visualization Studio / Public domain",
};
