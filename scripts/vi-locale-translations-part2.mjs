/** Part 2: intake, scheduler, footer, whatIsAutism, abaTherapy */

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

export function applyIntakeSchedulerFooter(vi) {
  deepMerge(vi.pages, {
    footer: {
      forParents: {
        title: "Dành cho phụ huynh",
        links: [
          "Hỗ trợ chẩn đoán tự kỷ",
          "Về tự kỷ",
          "Về liệu pháp ABA",
          "Phạm vi bảo hiểm",
          "Tài nguyên gia đình",
          "Bắt đầu",
        ],
      },
      resources: {
        title: "Tài nguyên",
        links: [
          "Công cụ sàng lọc M-CHAT-R",
          "Công cụ sàng lọc CAST",
          "Đánh giá ADOS-2",
          "Hướng dẫn người chăm sóc",
          "Blog & Bài viết",
          "Câu hỏi thường gặp",
        ],
      },
      careers: {
        title: "Tuyển dụng",
        links: [
          "Vị trí đang tuyển",
          "Nghề nghiệp RBT",
          "Nghề nghiệp BCBA",
          "Lãnh đạo lâm sàng",
          "Hướng dẫn phỏng vấn",
        ],
      },
      contact: {
        title: "Liên hệ Eden",
        faxPrefix: "Fax:",
        email: "info@edenabatherapy.com",
      },
      serviceAreas: {
        title: "Khu vực phục vụ",
        text: "Tự hào phục vụ gia đình khắp Bắc Virginia bao gồm Fairfax, Annandale, Arlington, Alexandria, Centreville, Chantilly, Herndon, Reston, Springfield, Burke, Falls Church, McLean, Vienna và các cộng đồng lân cận.",
      },
      googleReviews: {
        title: "Đánh giá Google",
        text: "Gia đình tin tưởng Eden ABA Therapy vì chăm sóc tự kỷ tận tâm và dịch vụ ABA cá nhân hóa.",
        leaveReview: "Để lại đánh giá Google",
      },
      copyright: "Eden ABA Therapy. Đã đăng ký bản quyền.",
      legalLinks: [
        "Chính sách Quyền riêng tư",
        "Điều khoản Dịch vụ",
        "Khả năng truy cập",
        "Thông báo về Thực hành Quyền riêng tư",
      ],
    },
    intake: {
      badge: "Intake Eden ABA Therapy",
      title: "Mẫu Intake - Quy trình 6 bước",
      intro:
        "Hoàn tất từng phần một. Tiến độ của bạn được giữ trên trang này trong khi gia đình đi qua toàn bộ quy trình intake.",
      progress: "Tiến độ",
      checklist: "Danh sách kiểm tra",
      stepOf: "Bước",
      of: "trên",
      secureDraftNote:
        "Xem trước kiểu bản nháp bảo mật. Gửi trực tiếp cuối cùng có thể kết nối backend/API sau.",
      previousStep: "← Bước trước",
      saveExit: "💾 Lưu & Thoát",
      saveAlert: "Tiến độ intake của bạn đã được lưu trên thiết bị này.",
      reviewSubmit: "Xem xét & Gửi ✓",
      submitAlert:
        "✅ Mẫu intake đã hoàn tất. Bước tiếp theo: kết nối nút này với API intake bảo mật, thông báo email và lưu trữ tải tài liệu.",
      nextStep: "Bước tiếp theo →",
      selectOption: "Chọn tùy chọn",
      selected: "Đã chọn:",
      sections: [
        {
          title: "Thông tin cơ bản",
          subtitle:
            "Bắt đầu với thông tin cơ bản về trẻ, phụ huynh/người giám hộ, nguồn giới thiệu và dịch vụ yêu cầu.",
          note: "Trường bắt buộc được đánh dấu bằng dấu sao trong phiên bản intake cuối cùng. Thành viên đội ngũ sẽ liên hệ gia đình sau khi gửi.",
          fields: [
            ["Họ tên pháp lý đầy đủ của trẻ", "text", "Họ Tên đệm Tên"],
            ["Tên gọi ưa thích", "text", "Tùy chọn"],
            ["Ngày sinh", "date", ""],
            ["Giới tính", "select", "Nam|Nữ|Khác|Không muốn nói"],
            ["Ngôn ngữ chính của trẻ", "text", "English, Vietnamese, Spanish, etc."],
            ["Địa chỉ đường phố", "text", "Nhập địa chỉ đường phố"],
            ["Thành phố", "text", "Thành phố"],
            ["Tiểu bang", "select", "VA|MD|DC|Khác"],
            ["Mã ZIP", "text", "Mã ZIP"],
            ["Họ tên đầy đủ phụ huynh / người giám hộ", "text", "Họ và Tên"],
            ["Mối quan hệ với trẻ", "select", "Mẹ|Bố|Người giám hộ|Ông bà|Khác"],
            ["Số điện thoại chính", "tel", "(703) 000-0000"],
            ["Email chính", "email", "name@example.com"],
            ["Tên liên hệ khẩn cấp", "text", "Tên"],
            ["Điện thoại liên hệ khẩn cấp", "tel", "Số điện thoại"],
            [
              "Địa điểm dịch vụ ưu tiên",
              "select",
              "Nhà|Phòng khám|Trường/Nhà trẻ|Telehealth|Chưa chắc",
            ],
          ],
        },
        {
          title: "Bảo hiểm y tế",
          subtitle:
            "Thu thập thông tin chẩn đoán, nhà cung cấp, thuốc, dị ứng, an toàn và bảo hiểm để xem xét intake.",
          note: "Gia đình nên có thẻ bảo hiểm, báo cáo chẩn đoán và giấy giới thiệu sẵn sàng để tải lên sau.",
          fields: [
            [
              "Chẩn đoán chính / Lý do giới thiệu",
              "select",
              "Rối loạn phổ tự kỷ|Chậm phát triển|Mối quan tâm hành vi|Chậm nói|Khác",
            ],
            ["Ngày chẩn đoán", "date", ""],
            ["Nhà cung cấp / Cơ sở chẩn đoán", "text", "Tên nhà cung cấp"],
            ["Bác sĩ / Bác sĩ nhi chính", "text", "Tên bác sĩ"],
            ["Số điện thoại bác sĩ", "tel", "Số điện thoại"],
            ["Thuốc hiện tại", "textarea", "Thuốc, liều lượng, lịch uống"],
            ["Dị ứng", "textarea", "Thực phẩm, thuốc, môi trường, v.v."],
            ["Lo ngại co giật hoặc thần kinh", "select", "Có|Không|Không chắc"],
            [
              "Nhà cung cấp bảo hiểm",
              "select",
              "Aetna|Anthem|Blue Cross Blue Shield|Cigna|Medicaid|United Healthcare|Tricare|Khác",
            ],
            ["Mã thành viên / Mã hợp đồng", "text", "Mã thành viên"],
            ["Số nhóm", "text", "Tùy chọn"],
            ["Tên chủ hợp đồng", "text", "Tên"],
            ["Ngày sinh chủ hợp đồng", "date", ""],
            ["Số điện thoại bảo hiểm", "tel", "Số điện thoại"],
          ],
        },
        {
          title: "Đồng ý pháp lý",
          subtitle:
            "Xem xét thông tin người giám hộ pháp lý, lệnh tòa, HIPAA, đồng ý ABA, phát hành thông tin, tham dự, hủy lịch, giám hộ và xác nhận an toàn.",
          note: "Bước này phản ánh bảng điều khiển đồng ý từ mẫu intake đã tải lên và nhóm các mục đồng ý trước chữ ký cuối.",
          fields: [
            ["Họ tên đầy đủ đại diện pháp lý", "text", "Họ và Tên"],
            [
              "Mối quan hệ với trẻ",
              "select",
              "Mẹ|Bố|Người giám hộ|Đại diện được ủy quyền|Khác",
            ],
            ["Điện thoại đại diện pháp lý", "tel", "Số điện thoại"],
            ["Email đại diện pháp lý", "email", "Email"],
            [
              "Có lệnh tòa, thỏa thuận giám hộ hoặc hạn chế nào không?",
              "select",
              "Có|Không|Không chắc",
            ],
            ["Chi tiết lệnh tòa", "textarea", "Mô tả nếu có"],
            [
              "Xác nhận HIPAA",
              "checkbox",
              "Tôi xác nhận Thông báo về Thực hành Quyền riêng tư",
            ],
            [
              "Đồng ý dịch vụ ABA",
              "checkbox",
              "Tôi đồng ý đánh giá và dịch vụ trị liệu ABA",
            ],
            [
              "Thỏa thuận phụ huynh / người giám hộ",
              "checkbox",
              "Tôi đồng ý trách nhiệm phụ huynh/người giám hộ",
            ],
            [
              "Ủy quyền phát hành thông tin",
              "checkbox",
              "Tôi ủy quyền trao đổi thông tin để phối hợp chăm sóc",
            ],
            [
              "Chính sách tham dự",
              "checkbox",
              "Tôi hiểu chính sách tham dự",
            ],
            [
              "Chính sách hủy lịch",
              "checkbox",
              "Tôi hiểu chính sách hủy lịch",
            ],
            [
              "Xác nhận an toàn & sự cố",
              "checkbox",
              "Tôi hiểu chính sách an toàn và thông báo sự cố",
            ],
            ["Chữ ký phụ huynh / người giám hộ", "text", "Nhập họ tên pháp lý đầy đủ"],
            ["Ngày", "date", ""],
          ],
        },
        {
          title: "Tài chính & Giao tiếp",
          subtitle:
            "Thu thập trách nhiệm thanh toán, cách liên hệ ưu tiên, nhu cầu ngôn ngữ, nhắc lịch hẹn và thời gian rảnh.",
          note: "Tùy chọn thanh toán và giao tiếp giúp đội intake phối hợp quyền lợi, ủy quyền, nhắc nhở và lịch hẹn.",
          fields: [
            [
              "Bên chịu trách nhiệm tài chính",
              "select",
              "Phụ huynh|Người giám hộ|Chủ hợp đồng|Bản thân|Khác",
            ],
            ["Điện thoại bên chịu trách nhiệm", "tel", "Số điện thoại"],
            ["Email bên chịu trách nhiệm", "email", "Email"],
            [
              "Loại thanh toán",
              "select",
              "Bảo hiểm|Tự trả / Trả riêng|Cả bảo hiểm & tự trả|Không chắc",
            ],
            [
              "Phương thức thanh toán ưu tiên",
              "select",
              "Tự động thanh toán|Thẻ tín dụng / ghi nợ|HSA / FSA|Chỉ hóa đơn",
            ],
            [
              "Ngôn ngữ ưu tiên",
              "select",
              "English|Vietnamese|Spanish|Arabic|Khác",
            ],
            ["Cần thông dịch viên?", "select", "Có|Không|Đôi khi"],
            [
              "Cách liên hệ ưu tiên",
              "select",
              "Gọi điện|Tin nhắn|Email|Tin nhắn cổng thông tin",
            ],
            [
              "Thời gian liên hệ tốt nhất",
              "select",
              "Buổi sáng|Buổi chiều|Buổi tối|Bất cứ lúc nào",
            ],
            [
              "Nhắc lịch hẹn",
              "select",
              "Tin nhắn|Email|Gọi điện|Tin nhắn cổng thông tin",
            ],
            ["Ngày rảnh", "text", "Thứ Hai, Thứ Ba, v.v."],
            ["Giờ rảnh", "text", "Buổi sáng, buổi chiều, sau giờ học, v.v."],
            [
              "Giờ ABA hàng tuần yêu cầu",
              "select",
              "Dưới 10|10–15|15–20|20–25|25–30|30+|Không chắc",
            ],
          ],
        },
        {
          title: "Gia đình & Lâm sàng",
          subtitle:
            "Thu thập tiền sử gia đình, tiền sử phát triển, hồ sơ hành vi, nhu cầu giao tiếp, kỹ năng sinh hoạt chức năng và ưu tiên điều trị.",
          note: "Bước này giúp đội lâm sàng chuẩn bị mục tiêu đánh giá và mục tiêu điều trị cá nhân hóa.",
          fields: [
            ["Họ tên đầy đủ người chăm sóc chính", "text", "Tên"],
            ["Ngôn ngữ tại nhà", "select", "English|Vietnamese|Spanish|Arabic|Khác"],
            [
              "Thành viên hộ gia đình khác",
              "textarea",
              "Tên, mối quan hệ, tuổi",
            ],
            ["Con bạn sinh đủ tháng?", "select", "Có|Không|Không chắc"],
            ["Thoái hóa phát triển?", "select", "Có|Không|Không chắc"],
            [
              "Dịch vụ trước đây",
              "textarea",
              "ABA, Trị liệu ngôn ngữ, OT, PT, dịch vụ trường học, v.v.",
            ],
            ["Trường / Nhà trẻ / Chương trình hiện tại", "text", "Tùy chọn"],
            [
              "Lĩnh vực quan tâm chính",
              "textarea",
              "Giao tiếp, hành vi, vui chơi, vệ sinh, ăn uống, an toàn, v.v.",
            ],
            [
              "Mức độ nghiêm trọng hành vi",
              "select",
              "Lo ngại nhẹ|Lo ngại trung bình|Lo ngại đáng kể|Lo ngại an toàn cao|Không chắc",
            ],
            [
              "Yếu tố kích hoạt đã biết",
              "textarea",
              "Chuyển tiếp, bị từ chối, chờ đợi, tiếng ồn, yêu cầu, v.v.",
            ],
            [
              "Điều gì giúp con bạn bình tĩnh?",
              "textarea",
              "Vật ưa thích, nghỉ ngơi, nhạc, không gian yên tĩnh, v.v.",
            ],
            [
              "Phương thức giao tiếp chính",
              "select",
              "Lời nói|Cử chỉ|PECS / hình ảnh|Thiết bị AAC|Ngôn ngữ ký hiệu|Giao tiếp hỗn hợp|Không chắc",
            ],
            [
              "Tình trạng vệ sinh",
              "select",
              "Độc lập|Cần nhắc nhở|Cần giúp đỡ|Đang dùng tã/bỉm|Đang tập|Chưa bắt đầu",
            ],
            [
              "Mục tiêu gia đình hàng đầu trong 90 ngày đầu",
              "textarea",
              "Liệt kê 3–5 mục tiêu",
            ],
          ],
        },
        {
          title: "Tải lên & Chữ ký",
          subtitle:
            "Tải tài liệu lên, xem xét thông tin cuối cùng và ký xác nhận intake.",
          note: "Trong phiên bản trực tiếp, tài liệu tải lên nên được lưu trữ bảo mật và gửi đến đội intake.",
          fields: [
            ["Thẻ bảo hiểm mặt trước & sau", "file", ""],
            ["Ảnh ID phụ huynh / người giám hộ", "file", ""],
            ["Báo cáo đánh giá chẩn đoán", "file", ""],
            ["Giấy giới thiệu / Đơn thuốc ABA", "file", ""],
            ["IEP / IFSP / Kế hoạch 504", "file", ""],
            ["Đánh giá trường học / Báo cáo giáo dục tâm lý", "file", ""],
            ["Danh sách thuốc / Kế hoạch y tế", "file", ""],
            ["Lệnh tòa / Tài liệu giám hộ", "file", ""],
            ["Tài liệu hỗ trợ khác", "file", ""],
            [
              "Giải thích tài liệu còn thiếu",
              "textarea",
              "Nếu tài liệu đang chờ, giải thích tại đây",
            ],
            [
              "Ghi chú cuối cho đội intake",
              "textarea",
              "Còn điều gì đội ngũ nên biết không?",
            ],
            [
              "Tôi xác nhận thông tin là chính xác",
              "checkbox",
              "Có, thông tin là đúng và đầy đủ",
            ],
            ["Chữ ký cuối", "text", "Nhập họ tên pháp lý đầy đủ"],
            ["Ngày ký", "date", ""],
          ],
        },
      ],
    },
    scheduler: {
      introOnly: {
        eyebrow: "Đặt lịch trực tuyến",
        title: "Đặt lịch hẹn trực tuyến với Eden ABA Therapy.",
        intro:
          "Dùng trình đặt lịch nhiều bước có hướng dẫn để yêu cầu đánh giá liệu pháp ABA, chọn thời gian ưu tiên và chia sẻ thông tin bảo hiểm để xem xét.",
        scheduleOnline: "Đặt lịch trực tuyến",
      },
      introCard: {
        sections: [
          {
            title: "Trình đặt lịch này hỗ trợ",
            items: [
              "Yêu cầu đánh giá liệu pháp ABA",
              "Chia sẻ thông tin gia đình và trẻ một cách bảo mật",
              "Chọn ngày và giờ hẹn ưu tiên",
              "Cung cấp chi tiết bảo hiểm để xem xét đủ điều kiện",
              "Gửi mọi thứ trực tiếp đến Eden ABA Therapy",
            ],
          },
          {
            title: "Vì sao gia đình thích",
            items: [
              "Quy trình hướng dẫn đơn giản",
              "Tiết kiệm thời gian trước intake",
              "Giúp đội ngũ chuẩn bị trước khi liên hệ bạn",
              "Hỗ trợ xác minh bảo hiểm",
              "Dùng cho hẹn trực tuyến/Zoom hoặc trực tiếp",
            ],
          },
          {
            title: "Trước khi bắt đầu",
            items: [
              "Thông tin liên hệ phụ huynh/người giám hộ",
              "Thông tin cơ bản của trẻ",
              "Ngày hẹn ưu tiên",
              "Gói bảo hiểm và mã thành viên nếu có",
              "Mối quan tâm hoặc câu hỏi bạn muốn đội ngũ biết",
            ],
          },
        ],
        startButton: "Bắt đầu trình đặt lịch",
      },
      wizard: {
        steps: ["Phân loại", "Dịch vụ", "Gia đình", "Lịch trình", "Bảo hiểm", "Xem xét"],
        stepPrefix: "Bước",
        availableTimes: [
          "9:00 AM",
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "12:00 PM",
          "12:30 PM",
          "1:00 PM",
          "1:30 PM",
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
        ],
        notSelected: "Chưa chọn",
        submitted: {
          title: "Đã gửi lịch hẹn",
          referencePrefix: "Reference: EAT-",
          liveNote:
            "Trong phiên bản trực tiếp, yêu cầu này sẽ lưu vào Supabase, tạo cuộc họp Zoom, thông báo nhân viên Eden và gửi xác nhận cho gia đình.",
          zoomPreview: "Xem trước cuộc họp Zoom",
          zoomUrl: "https://zoom.us/j/secure-eden-aba-intake",
          passcodeLabel: "Mã cuộc họp:",
          passcode: "EDEN",
          appointmentLabel: "Lịch hẹn:",
        },
        triage: {
          title: "Phân loại AI trước khi đặt lịch",
          intro: "Cho chúng tôi biết gia đình cần gì để chuyển yêu cầu đúng hướng.",
          fields: [
            ["communication", "Mối quan tâm giao tiếp"],
            ["behavior", "Mối quan tâm hành vi"],
            ["social", "Mối quan tâm xã hội"],
            ["urgency", "Mức độ khẩn cấp lên lịch"],
          ],
          concernOptions: [
            "Lo ngại nhẹ",
            "Lo ngại trung bình",
            "Lo ngại cao",
            "Ưu tiên",
          ],
          parentNotes: "Ghi chú phụ huynh",
          notesPlaceholder:
            "Mô tả mối quan tâm, mục tiêu, hành vi, nhu cầu giao tiếp hoặc câu hỏi của bạn.",
        },
        service: {
          title: "Chọn dịch vụ",
          intro: "Chọn loại dịch vụ và hình thức hẹn.",
          serviceLabel: "Dịch vụ",
          serviceOptions: [
            "Đánh giá liệu pháp ABA",
            "Tư vấn phụ huynh",
            "Xem xét bảo hiểm",
            "Hỗ trợ đánh giá ASD",
          ],
          locationLabel: "Loại địa điểm",
          locationOptions: ["Trực tuyến / Zoom", "Tại nhà", "Hẹn văn phòng"],
          visitLabel: "Loại lần khám",
          visitOptions: ["Bệnh nhân mới", "Gia đình quay lại", "Giới thiệu từ nhà cung cấp"],
        },
        family: {
          title: "Thông tin phụ huynh và bệnh nhân",
          intro: "Thêm thông tin liên hệ và chi tiết cơ bản về trẻ.",
          parentName: "Tên phụ huynh *",
          email: "Email *",
          phone: "Số điện thoại *",
          childName: "Tên trẻ *",
          childBirthdate: "Ngày sinh trẻ",
          ageGroups: ["0-2", "3-5", "6-12", "13+"],
          zipCode: "Mã ZIP *",
        },
        schedule: {
          title: "Ngày và giờ",
          intro: "Chọn ngày hẹn ưu tiên và giờ có sẵn.",
          preferredDate: "Ngày ưu tiên",
          slotsAvailable: "✅ 16 khung giờ có sẵn vào ngày đã chọn",
        },
        insurance: {
          title: "Bảo hiểm và mối quan tâm",
          intro: "Thêm chi tiết bảo hiểm và mối quan tâm gia đình để xem xét intake.",
          planLabel: "Gói bảo hiểm",
          planOptions: [
            "Medicaid",
            "Anthem",
            "Aetna",
            "Cigna",
            "UnitedHealthcare",
            "Khác",
          ],
          memberId: "Mã thành viên *",
          referral: "Nguồn giới thiệu *",
          eligibilityCheck: "Chạy kiểm tra đủ điều kiện bảo hiểm",
          parentConcerns: "Mối quan tâm phụ huynh *",
        },
        review: {
          title: "Xem xét và gửi",
          intro: "Xem xét yêu cầu trước khi gửi đến Eden ABA Therapy.",
          triageSummary: "Tóm tắt phân loại",
          urgency: "Mức khẩn cấp:",
          communication: "Giao tiếp:",
          behavior: "Hành vi:",
          social: "Xã hội:",
          appointment: "Lịch hẹn",
          familyInformation: "Thông tin gia đình",
          childPrefix: "Trẻ:",
          insurance: "Bảo hiểm",
          memberIdPrefix: "Mã thành viên:",
          eligibilityRequested: "Kiểm tra đủ điều kiện: Đã yêu cầu",
        },
        sidebar: {
          title: "Bảng tóm tắt gọn",
          bookingStatus: "Trạng thái đặt lịch",
          stepLabel: "Bước",
          progressLabel: "Tiến độ",
          nextAutomation: "Tự động hóa tiếp theo",
          automationValue: "Supabase + Zoom + email/SMS",
          service: "Dịch vụ",
          chosenTime: "Giờ đã chọn",
          insurance: "Bảo hiểm",
          officeEmail: "Email văn phòng",
        },
      },
    },
  });
}

export function applyWhatIsAutismPage(vi) {
  deepMerge(vi.pages, {
    whatIsAutism: {
      breadcrumb: "Liệu pháp ABA › Trung tâm Tài nguyên Gia đình",
      title: "Tự kỷ là gì?",
      heroIntro:
        "Rối loạn phổ tự kỷ là tình trạng phát triển thần kinh có thể ảnh hưởng giao tiếp, tương tác xã hội, học tập, hành vi, xử lý cảm giác, thói quen hằng ngày và độc lập. Mỗi trẻ tự kỷ có hồ sơ điểm mạnh và nhu cầu hỗ trợ riêng, nên gia đình được lợi từ giáo dục rõ ràng, hướng dẫn tận tâm và lập kế hoạch cá nhân hóa.",
      parentNotePrefix: "Lưu ý thân thiện với phụ huynh:",
      parentNote:
        "Trang này mang tính giáo dục và không chẩn đoán tự kỷ. Nếu bạn có mối quan tâm, hãy trao đổi với bác sĩ nhi hoặc chuyên gia có đủ năng lực.",
      screeningSupport: "Sàng lọc và hỗ trợ tự kỷ",
      startABA: "Bắt đầu liệu pháp ABA",
      heroStats: [
        ["1 trong 31", "Ước tính CDC cho trẻ được xác định có tự kỷ"],
        ["Hỗ trợ sớm", "Có thể giúp gia đình hiểu nhu cầu sớm hơn"],
        ["Phổ", "Tự kỷ trông khác nhau với mỗi trẻ"],
      ],
      imageAlts: {
        hero: "Gia đình gặp chuyên gia tự kỷ",
        learning: "Trẻ tham gia hoạt động học tập",
        community: "Gia đình tìm hiểu hỗ trợ phát triển",
        observation: "Phụ huynh quan sát phát triển của trẻ",
        social: "Trẻ phát triển kỹ năng xã hội",
        language: "Phát triển ngôn ngữ và giao tiếp",
        nonverbal: "Trẻ thực hành kỹ năng giao tiếp",
        sensory: "Vui chơi cảm giác và hoạt động phát triển",
        regulation: "Trẻ học chiến lược bình tĩnh",
        daily: "Trẻ học kỹ năng sinh hoạt hằng ngày",
        school: "Trẻ nhận hỗ trợ lớp học",
        family: "Cuộc họp hỗ trợ gia đình với clinician",
        research: "Gia đình thảo luận nghiên cứu tự kỷ",
        support: "Hỗ trợ phát triển cá nhân hóa",
        evaluation: "Đánh giá và chẩn đoán tự kỷ",
        screening: "Quy trình sàng lọc tự kỷ",
        aba: "Buổi liệu pháp ABA",
        parent: "Đào tạo và hướng dẫn phụ huynh",
        clinic: "Môi trường liệu pháp ABA tại phòng khám",
        home: "Hỗ trợ trị liệu tại nhà",
        progress: "Tiến bộ phát triển và thành công",
        resources: "Tài nguyên tự kỷ cho gia đình",
        cta: "Bắt đầu hỗ trợ tự kỷ hôm nay",
      },
      sectionNav: [
        ["Tổng quan", "what-is-autism-overview"],
        ["Dấu hiệu sớm", "early-signs-autism"],
        ["Giao tiếp", "communication-differences"],
        ["Cảm giác & Hành vi", "sensory-behavior"],
        ["Nguyên nhân & Hiểu lầm", "causes-myths"],
        ["Chẩn đoán", "autism-diagnosis"],
        ["Hỗ trợ ABA", "aba-support"],
        ["Cột mốc", "developmental-milestones"],
        ["Tài nguyên", "parent-resources"],
      ],
      overview: {
        eyebrow: "Hiểu về tự kỷ",
        title: "Tự kỷ là gì?",
        paragraphs: [
          "Tự kỷ ảnh hưởng cách não bộ phát triển và cách một người trải nghiệm thế giới. Nó có thể ảnh hưởng giao tiếp, mối quan hệ, vui chơi, xử lý cảm giác, điều hòa cảm xúc, học tập, linh hoạt và kỹ năng sinh hoạt hằng ngày.",
          "Tự kỷ được gọi là phổ vì nhu cầu hỗ trợ rất đa dạng. Một trẻ có thể nói trôi chảy nhưng gặp khó với bạn bè và chuyển tiếp. Trẻ khác có thể dùng ít lời hoặc thiết bị AAC và cần nhiều hỗ trợ hơn với thói quen hằng ngày và an toàn.",
        ],
        callout:
          "Tài nguyên tự kỷ hữu ích nên nhìn toàn bộ đứa trẻ: điểm mạnh, nhu cầu, ưu tiên gia đình, phong cách giao tiếp, văn hóa, yêu cầu trường học và thói quen hằng ngày.",
      },
      howCommon: {
        eyebrow: "Tự kỷ phổ biến đến mức nào?",
        title: "Tự kỷ ngày càng được nhận diện trong gia đình và cộng đồng",
        paragraphs: [
          "Việc xác định tự kỷ đã tăng theo thời gian khi nhận thức, sàng lọc, tiếp cận đánh giá và hiểu biết chuyên môn được cải thiện. Nhiều gia đình đang học rằng khác biệt phát triển sớm đáng được thảo luận, không nên bỏ qua.",
          "Ước tính tỷ lệ mắc là con số cấp dân số. Chúng không dự đoán tương lai của từng trẻ, nhưng nhắc cộng đồng rằng hỗ trợ tự kỷ, hòa nhập và tiếp cận chăm sóc rất quan trọng.",
        ],
        pillars: ["Nhận thức", "Sàng lọc sớm", "Hỗ trợ hòa nhập"],
      },
      spectrum: {
        eyebrow: "Trên phổ",
        title: "Hiểu tự kỷ trên phổ",
        intro:
          "Tự kỷ có thể gồm cả điểm mạnh và thách thức. Một số trẻ có trí nhớ tốt, học thị giác, nhận dạng mẫu, sở thích sâu, thẳng thắn, sáng tạo hoặc kiên trì. Hỗ trợ nên giảm rào cản đồng thời tôn trọng bản sắc và phẩm giá của trẻ.",
        levels: [
          [
            "Mức 1",
            "Cần hỗ trợ",
            "Trẻ có thể giao tiếp bằng lời và tham gia nhiều môi trường nhưng vẫn cần giúp về linh hoạt, giao tiếp xã hội, tổ chức, chuyển tiếp hoặc độc lập.",
          ],
          [
            "Mức 2",
            "Cần hỗ trợ đáng kể",
            "Trẻ có thể cần hỗ trợ nhất quán hơn về giao tiếp, hành vi, thói quen hằng ngày, tương tác xã hội và thích nghi với thay đổi.",
          ],
          [
            "Mức 3",
            "Cần hỗ trợ rất đáng kể",
            "Trẻ có thể cần hỗ trợ chuyên sâu về giao tiếp, an toàn, sinh hoạt hằng ngày, điều hòa hành vi và tham gia thói quen hằng ngày.",
          ],
        ],
      },
      earlySigns: {
        eyebrow: "Dấu hiệu sớm của tự kỷ",
        title: "Dấu hiệu sớm của tự kỷ",
        paragraphs: [
          "Dấu hiệu sớm có thể xuất hiện ở giao tiếp, vui chơi, tương tác xã hội, phản ứng cảm giác hoặc hành vi. Một dấu hiệu đơn lẻ không chẩn đoán tự kỷ, nhưng các mẫu theo thời gian và bối cảnh có thể báo hiệu cần trò chuyện về phát triển.",
          "Phụ huynh thường nhận thấy khác biệt trong thói quen hằng ngày: bữa ăn, tắm, vui chơi, đi ra cộng đồng, giữ trẻ, mầm non hoặc chuyển tiếp giữa các hoạt động.",
        ],
        cards: [
          [
            "Giao tiếp",
            "Chậm nói, ít cử chỉ, hạn chế chỉ tay, lặp lại từ hoặc khó dùng giao tiếp cho nhu cầu hằng ngày.",
          ],
          [
            "Tương tác xã hội",
            "Ít phản hồi khi gọi tên, ít nụ cười chia sẻ, ít vui chơi qua lại hoặc khó chia sẻ sự chú ý với người chăm sóc.",
          ],
          [
            "Hành vi vui chơi",
            "Hạn chế vui chơi giả vờ, mẫu vui chơi lặp lại, xếp đồ chơi thành hàng hoặc đau khổ mạnh khi thói quen vui chơi thay đổi.",
          ],
          [
            "Mẫu cảm giác",
            "Phản ứng mạnh với âm thanh, kết cấu, ánh sáng, chuyển động hoặc tìm kiếm thêm kích thích cảm giác qua quay, nhảy hoặc áp lực sâu.",
          ],
        ],
      },
      communication: {
        eyebrow: "Giao tiếp xã hội",
        title: "Khác biệt giao tiếp xã hội",
        paragraphs: [
          "Giao tiếp xã hội gồm chú ý chung, cử chỉ, biểu cảm khuôn mặt, phản hồi khi gọi tên, luân phiên, bắt chước, cho xem đồ vật và nhận biết cảm xúc người khác. Trẻ tự kỷ có thể giao tiếp xã hội theo cách khác hoặc cần hỗ trợ học các kỹ năng này.",
          "Một số trẻ thích người nhưng khó bắt đầu tương tác. Trẻ khác tương tác tốt nhất qua vận động, nhạc, đồ chơi ưa thích, thói quen trực quan hoặc vui chơi một-một yên tĩnh. Hỗ trợ nên gặp trẻ ở nơi trẻ đang.",
        ],
        verbalTitle: "Khác biệt giao tiếp bằng lời và phi ngôn ngữ",
        cards: [
          [
            "Khác biệt giao tiếp bằng lời",
            "Một số trẻ dùng ít từ hơn mong đợi, lặp lại từ hoặc cụm từ, khó trả lời câu hỏi hoặc chủ yếu dùng ngôn ngữ để yêu cầu vật ưa thích.",
          ],
          [
            "Khác biệt giao tiếp phi ngôn ngữ",
            "Một số trẻ ít chỉ tay, dùng ít cử chỉ, tránh cho xem đồ vật hoặc khó phối hợp ánh mắt, biểu cảm khuôn mặt và ngôn ngữ cơ thể.",
          ],
          [
            "Giao tiếp chức năng",
            "Hỗ trợ thường tập trung giúp trẻ nhờ giúp đỡ, xin nghỉ, lựa chọn, chia sẻ sở thích và giao tiếp an toàn trong thói quen hằng ngày.",
          ],
        ],
      },
      sensoryBehavior: {
        eyebrow: "Cảm giác, hành vi và điều hòa",
        title: "Hành vi lặp lại, sở thích hạn chế, xử lý cảm giác và điều hòa",
        intro:
          "Hành vi là giao tiếp. Sự lặp lại, sở thích mạnh, tìm kiếm cảm giác, tránh cảm giác và phản ứng cảm xúc có thể giúp trẻ đối phó, giao tiếp, học hoặc quản lý thế giới cảm thấy quá tải.",
        cards: [
          [
            "Hành vi lặp lại",
            "Cử động lặp lại, âm thanh lặp, xếp đồ vật, quay vật hoặc lặp thói quen có thể giúp trẻ điều hòa hoặc hiểu môi trường.",
          ],
          [
            "Sở thích hạn chế",
            "Trẻ có thể có sở thích sâu với đồ vật, chủ đề, video, số, chữ cái, phương tiện hoặc thói quen cụ thể. Những sở thích này có thể trở thành điểm mạnh khi được hỗ trợ tôn trọng.",
          ],
          [
            "Điều hòa cảm xúc",
            "Chuyển tiếp, bị từ chối, thất vọng giao tiếp, quá tải cảm giác, mệt mỏi hoặc không chắc chắn có thể dẫn đến đau khổ. Hỗ trợ nên dạy kỹ năng đối phó và giao tiếp thay thế.",
          ],
          [
            "Chức năng điều hành",
            "Lập kế hoạch, chuyển sự chú ý, chờ đợi, làm theo chỉ dẫn nhiều bước và tổ chức nhiệm vụ có thể khó và cần hỗ trợ trực quan hoặc thói quen có cấu trúc.",
          ],
        ],
        lifeCards: [
          [
            "Kỹ năng sinh hoạt hằng ngày",
            "Vệ sinh, mặc quần áo, ăn uống, đánh răng, rửa tay, thói quen ngủ và kỹ năng an toàn có thể cần dạy từng bước và thực hành nhất quán.",
          ],
          [
            "Thách thức ở trường",
            "Học theo nhóm, chuyển tiếp, vui chơi với bạn, chờ đợi, tiếng ồn lớp học và thay đổi thói quen có thể khó nếu không có hỗ trợ cá nhân hóa.",
          ],
          [
            "Tự kỷ và đời sống gia đình",
            "Gia đình có thể điều hướng lịch hẹn, họp trường, mối quan tâm hành vi, câu hỏi bảo hiểm, thói quen anh chị em và quyết định về dịch vụ. Hỗ trợ nên bao gồm người chăm sóc.",
          ],
        ],
      },
      causesMyths: {
        causesTitle: "Nguyên nhân gây tự kỷ?",
        causesText:
          "Tự kỷ không có một nguyên nhân duy nhất. Nghiên cứu cho thấy tự kỷ liên quan đến khác biệt phát triển não bộ chịu ảnh hưởng của di truyền và các yếu tố sinh học hoặc môi trường khác trước hoặc quanh thời điểm sinh. Gia đình nên tránh giải thích dựa trên đổ lỗi.",
        eyebrow: "Nguyên nhân, di truyền, môi trường",
        title: "Di truyền, ảnh hưởng môi trường và hiểu lầm phổ biến",
        genetics:
          "Yếu tố di truyền có thể góp phần khả năng tự kỷ, và tự kỷ có thể chạy trong gia đình. Di truyền phức tạp và không có nghĩa phụ huynh gây ra tình trạng này.",
        geneticsLabel: "Di truyền và tự kỷ:",
        environment:
          "Các nhà nghiên cứu nghiên cứu nhiều yếu tố trước sinh và phát triển sớm. Những ảnh hưởng này phức tạp và nên được thảo luận với chuyên gia y tế bằng thông tin dựa trên bằng chứng.",
        environmentLabel: "Ảnh hưởng môi trường:",
        mythFacts: [
          [
            "Hiểu lầm: Tự kỷ trông giống nhau với mọi trẻ.",
            "Sự thật: Tự kỷ là phổ. Trẻ có thể có điểm mạnh, thách thức, phong cách giao tiếp, nhu cầu cảm giác và mức hỗ trợ khác nhau.",
          ],
          [
            "Hiểu lầm: Công cụ sàng lọc chẩn đoán tự kỷ.",
            "Sự thật: Công cụ sàng lọc có thể xác định mối quan tâm có thể, nhưng chẩn đoán cần đánh giá chuyên môn bởi clinician có đủ năng lực.",
          ],
          [
            "Hiểu lầm: Tự kỷ do cách nuôi dạy.",
            "Sự thật: Tự kỷ là tình trạng phát triển thần kinh. Phong cách nuôi dạy không gây tự kỷ.",
          ],
          [
            "Hiểu lầm: Trẻ không thể tiến bộ.",
            "Sự thật: Với hỗ trợ cá nhân hóa, nhiều trẻ xây dựng kỹ năng giao tiếp, sinh hoạt hằng ngày, xã hội và học tập có ý nghĩa.",
          ],
        ],
      },
      diagnosis: {
        eyebrow: "Lộ trình đánh giá",
        title: "Tự kỷ được chẩn đoán như thế nào",
        intro:
          "Chẩn đoán nên do chuyên gia có đủ năng lực thực hiện. Gia đình có thể đi qua sàng lọc, đánh giá phát triển và đánh giá chẩn đoán chính thức tùy tuổi, triệu chứng, hồ sơ và khuyến nghị lâm sàng.",
        steps: [
          [
            "Công cụ sàng lọc",
            "Công cụ như M-CHAT-R có thể giúp xác định liệu theo dõi thêm có thể hữu ích. Chúng không phải công cụ chẩn đoán và nên được thảo luận với bác sĩ nhi hoặc chuyên gia có đủ năng lực.",
          ],
          [
            "Đánh giá phát triển",
            "Clinician có thể xem xét tiền sử phát triển, mối quan tâm phụ huynh, giao tiếp, vui chơi, mẫu cảm giác, kỹ năng thích nghi và hành vi qua các bối cảnh.",
          ],
          [
            "Đánh giá chẩn đoán chính thức",
            "Đánh giá chính thức có thể gồm công cụ chuẩn hóa, quan sát, phỏng vấn người chăm sóc, tiền sử y khoa và xem xét hồ sơ trường học hoặc trị liệu.",
          ],
        ],
        stepPrefix: "Bước",
      },
      abaSupport: {
        eyebrow: "Hỗ trợ liệu pháp ABA",
        title: "Liệu pháp ABA là gì và có thể giúp như thế nào?",
        paragraphs: [
          "Phân tích Hành vi Ứng dụng dùng khoa học học tập và hành vi để dạy kỹ năng có ý nghĩa và giảm rào cản cản trở an toàn, độc lập, giao tiếp và tham gia. Kế hoạch ABA tốt được cá nhân hóa, đạo đức, tận tâm và lấy gia đình làm trung tâm.",
          "Lợi ích có thể gồm giao tiếp mạnh hơn, hành vi thay thế an toàn hơn, kỹ năng sinh hoạt hằng ngày, tương tác xã hội, sẵn sàng đi học và thói quen gia đình tự tin hơn.",
        ],
        services: [
          [
            "Trị liệu tại phòng khám",
            "Môi trường có cấu trúc có thể hỗ trợ sẵn sàng đi học, thực hành giao tiếp, cơ hội xã hội, phát triển vui chơi và thói quen trị liệu nhất quán.",
          ],
          [
            "Trị liệu tại nhà",
            "Buổi tại nhà có thể giúp trẻ thực hành kỹ năng trong thói quen gia đình thực như bữa ăn, chuyển tiếp, giờ ngủ, mặc quần áo và vui chơi.",
          ],
          [
            "Đào tạo phụ huynh",
            "Huấn luyện người chăm sóc giúp gia đình dùng chiến lược nhất quán và tự tin giữa các buổi trị liệu.",
          ],
          [
            "Dịch vụ hỗ trợ trường học",
            "Với sự cho phép phù hợp, đội chăm sóc có thể phối hợp với trường để hỗ trợ thói quen lớp học, giao tiếp, an toàn và khái quát hóa.",
          ],
        ],
      },
      milestones: {
        eyebrow: "Cột mốc phát triển theo tuổi",
        title: "Cột mốc phát triển theo tuổi",
        intro:
          "Cột mốc là hướng dẫn chung, không phải quy tắc cứng. Nếu trẻ bỏ lỡ cột mốc, mất kỹ năng hoặc có khác biệt dai dẳng về giao tiếp, vui chơi, tương tác xã hội hoặc thói quen hằng ngày, gia đình nên trao đổi với bác sĩ nhi.",
        ages: [
          [
            "18 tháng",
            "Cột mốc phát triển 18 tháng",
            [
              "Chỉ để thể hiện sự quan tâm",
              "Dùng vài từ",
              "Bắt chước hành động đơn giản",
              "Nhìn người chăm sóc để được an ủi",
            ],
          ],
          [
            "2 tuổi",
            "Cột mốc phát triển 2 tuổi",
            [
              "Dùng cụm hai từ",
              "Làm theo chỉ dẫn đơn giản",
              "Bắt đầu vui chơi giả vờ",
              "Quan tâm đến trẻ khác",
            ],
          ],
          [
            "3 tuổi",
            "Cột mốc phát triển 3 tuổi",
            [
              "Dùng câu ngắn",
              "Luân phiên với sự giúp đỡ",
              "Vui chơi tưởng tượng đơn giản",
              "Tách khỏi người chăm sóc dễ hơn",
            ],
          ],
          [
            "4 tuổi",
            "Cột mốc phát triển 4 tuổi",
            [
              "Tham gia vui chơi tưởng tượng",
              "Trả lời câu hỏi đơn giản",
              "Vui chơi với bạn đồng trang lứa",
              "Làm theo thói quen nhiều bước",
            ],
          ],
          [
            "5 tuổi",
            "Cột mốc phát triển 5 tuổi",
            [
              "Tham gia học tập có cấu trúc",
              "Giao tiếp nhu cầu rõ ràng",
              "Thể hiện độc lập ngày càng tăng",
              "Dùng giải quyết vấn đề xã hội với hỗ trợ",
            ],
          ],
        ],
      },
      faqOne: {
        eyebrow: "Phần FAQ 1",
        title: "Câu hỏi thường gặp về tự kỷ",
        items: [
          [
            "Tự kỷ có phải chẩn đoán y khoa không?",
            "Rối loạn phổ tự kỷ là chẩn đoán phát triển do chuyên gia có đủ năng lực đưa ra. Chẩn đoán thường xem xét tiền sử phát triển, quan sát trực tiếp, phỏng vấn người chăm sóc, giao tiếp, hành vi, chức năng thích nghi và triệu chứng qua các bối cảnh.",
          ],
          [
            "Trẻ có thể tự kỷ mà vẫn giao tiếp bằng mắt không?",
            "Có. Tự kỷ không giống nhau với mọi trẻ. Một số trẻ tự kỷ giao tiếp bằng mắt thường xuyên, một số không nhất quán, và một số thấy khó chịu hoặc mất tập trung.",
          ],
          [
            "Tự kỷ có thể được nhận thấy trước hai tuổi không?",
            "Một số khác biệt phát triển có thể được nhận thấy ở sơ sinh hoặc tuổi mới biết đi, trong khi dấu hiệu khác rõ hơn sau này. Gia đình nên thảo luận mối quan tâm với bác sĩ nhi bất cứ khi nào phát sinh.",
          ],
          [
            "Kết quả sàng lọc có xác nhận tự kỷ không?",
            "Không. Công cụ sàng lọc có thể xác định mối quan tâm có thể nhưng không thể chẩn đoán tự kỷ. Kết quả nên được xem xét với bác sĩ nhi hoặc chuyên gia có đủ năng lực.",
          ],
        ],
      },
      parentResources: {
        eyebrow: "Tài nguyên phụ huynh bổ sung",
        title: "Tài nguyên phụ huynh cho bước tiếp theo",
        intro:
          "Gia đình không phải tự mình tìm hiểu hỗ trợ tự kỷ. Các bước hữu ích gồm ghi lại mối quan tâm phát triển, yêu cầu sàng lọc, thu thập hồ sơ, liên hệ bảo hiểm, khám phá lựa chọn đánh giá và tìm hiểu hỗ trợ trị liệu.",
        checklist: [
          "Hỏi bác sĩ nhi về sàng lọc",
          "Thu thập hồ sơ trường học và trị liệu",
          "Ghi lại ví dụ về mối quan tâm",
          "Khám phá sàng lọc M-CHAT-R hoặc CAST",
          "Xem xét quyền lợi bảo hiểm",
          "Yêu cầu hỗ trợ lấy gia đình làm trung tâm",
        ],
      },
      faqTwo: {
        eyebrow: "Phần FAQ 2",
        title: "Câu hỏi về hỗ trợ và dịch vụ",
        items: [
          [
            "Phụ huynh nên làm gì đầu tiên nếu lo ngại?",
            "Ghi lại ví dụ về những gì bạn nhận thấy, hỏi bác sĩ nhi về sàng lọc phát triển, thu thập hồ sơ trường học hoặc trị liệu nếu có, và yêu cầu hướng dẫn đánh giá khi mối quan tâm tiếp tục.",
          ],
          [
            "Liệu pháp ABA có thể hỗ trợ cuộc sống hằng ngày như thế nào?",
            "Liệu pháp ABA có thể giúp trẻ xây dựng giao tiếp, kỹ năng sinh hoạt hằng ngày, tương tác xã hội, vui chơi, an toàn, điều hòa cảm xúc và độc lập qua mục tiêu cá nhân hóa.",
          ],
          [
            "Eden ABA Therapy có chẩn đoán tự kỷ không?",
            "Eden ABA Therapy có thể giúp gia đình hiểu sàng lọc, intake, tài liệu và bước tiếp theo. Chẩn đoán chính thức nên do chuyên gia chẩn đoán có đủ năng lực thực hiện.",
          ],
          [
            "Phụ huynh có thể tham gia trị liệu không?",
            "Có. Đào tạo phụ huynh là phần quan trọng của hỗ trợ hiệu quả vì trẻ dùng kỹ năng tại nhà, trường, phòng khám và cộng đồng.",
          ],
        ],
      },
      cta: {
        eyebrow: "Bắt đầu hỗ trợ tự kỷ hôm nay",
        title: "Nhận hướng dẫn rõ ràng cho bước tiếp theo của con bạn.",
        text: "Eden ABA Therapy có thể giúp gia đình hiểu sàng lọc tự kỷ, lựa chọn liệu pháp ABA, đào tạo phụ huynh, xem xét bảo hiểm và lập kế hoạch dịch vụ tại Bắc Virginia.",
        screeningSupport: "Hỗ trợ sàng lọc tự kỷ",
        startABA: "Bắt đầu liệu pháp ABA",
      },
    },
  });
}
