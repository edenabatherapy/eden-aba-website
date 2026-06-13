/** Part 3: abaTherapy page translations */

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

export function applyAbaTherapyPage(vi) {
  deepMerge(vi.pages, {
    abaTherapy: {
      breadcrumb: "Dịch vụ › Liệu pháp ABA",
      title: "Liệu pháp ABA tại Eden ABA Therapy",
      heroIntro:
        "Eden ABA Therapy cung cấp hỗ trợ Phân tích Hành vi Ứng dụng dựa trên bằng chứng cho trẻ được chẩn đoán rối loạn phổ tự kỷ. Chương trình tập trung giao tiếp, độc lập, tương tác xã hội, an toàn, sẵn sàng học tập và tiến bộ lấy gia đình làm trung tâm.",
      getStarted: "Bắt đầu",
      findCenter: "Tìm trung tâm",
      heroImageAlt: "Hỗ trợ liệu pháp ABA cho trẻ",
      therapyTypesTitle: "Eden cung cấp nhiều loại liệu pháp ABA cho tự kỷ:",
      therapyCards: [
        [
          "Trị liệu tại trung tâm",
          "Trị liệu có cấu trúc trong môi trường lâm sàng hỗ trợ nơi trẻ thực hành giao tiếp, vui chơi, sẵn sàng đi học, kỹ năng xã hội và độc lập.",
          "Có sẵn qua xem xét intake Eden ABA Therapy.",
        ],
        [
          "Eden ABA Academy",
          "Khái niệm chương trình tập trung học tập cho trẻ cần thói quen, kỹ năng sẵn sàng, thực hành với bạn, hỗ trợ giao tiếp và giám sát lâm sàng nhất quán.",
          "Phù hợp nhất sau đánh giá và tư vấn gia đình.",
        ],
        [
          "ABA tại nhà",
          "Hỗ trợ tại nhà giúp trẻ thực hành kỹ năng trong thói quen hằng ngày như bữa ăn, giờ ngủ, chuyển tiếp, vui chơi, an toàn và giao tiếp với người chăm sóc.",
          "Phục vụ gia đình khắp Bắc Virginia khi có sẵn.",
        ],
      ],
      sidebarTitle: "Danh mục",
      sidebarLinks: [
        ["Liệu pháp ABA là gì?", "what-is-aba-therapy"],
        ["Hành vi mục tiêu trong ABA là gì?", "target-behaviors"],
        ["Liệu pháp ABA giúp như thế nào?", "how-aba-helps"],
        ["Dấu hiệu ABA có thể giúp", "signs-child-may-benefit"],
        ["ABA theo nhóm tuổi", "aba-by-age-group"],
        ["Phát triển giao tiếp", "communication-development-aba"],
        ["Đạt mục tiêu thực tế", "practical-goals"],
        ["Đo lường tiến bộ", "aba-progress-measured"],
        ["Một ngày ABA điển hình", "typical-day"],
        ["90 ngày đầu", "first-90-days-aba"],
        ["Phụ huynh tham gia ABA như thế nào?", "parent-involvement"],
        ["Thành công tại nhà và trường", "home-school-success"],
        ["Liệu pháp ABA có hiệu quả không?", "effectiveness"],
        ["Hiểu lầm vs sự thật", "aba-myths-facts"],
        ["Quy trình đánh giá ABA", "aba-assessment-process"],
        ["Liệu pháp ABA tốn bao nhiêu?", "cost"],
        ["Câu hỏi phụ huynh", "questions-before-aba"],
      ],
      sectionImageAlt: "Phần giáo dục liệu pháp ABA",
      whatIsAba: {
        title: "Liệu pháp ABA là gì?",
        paragraphs: [
          "Phân tích Hành vi Ứng dụng, thường gọi là ABA, là trị liệu dựa trên nghiên cứu dùng khoa học học tập và hành vi để giúp trẻ xây dựng kỹ năng có ý nghĩa cho cuộc sống hằng ngày. ABA xem xét điều gì xảy ra trước và sau hành vi để clinician hiểu vì sao hành vi xảy ra và dạy cách giao tiếp, tham gia an toàn và hiệu quả hơn.",
          "Tại Eden ABA Therapy, mục tiêu được cá nhân hóa và lấy gia đình làm trung tâm. BCBA xem xét điểm mạnh, nhu cầu, phong cách giao tiếp, thói quen, mối quan tâm an toàn và hồ sơ học tập của con bạn trước khi tạo kế hoạch điều trị.",
        ],
      },
      targetBehaviors: {
        title: "Hành vi mục tiêu trong ABA là gì?",
        text: "Hành vi mục tiêu là kỹ năng cần xây dựng hoặc hành vi cần giảm. Một số mục tiêu tập trung nhờ giúp đỡ, giao tiếp bằng mắt khi phù hợp, làm theo chỉ dẫn, chờ đợi, chịu chuyển tiếp hoặc vui chơi với bạn. Mục tiêu khác tập trung giảm hung hăng, tự làm hại, bỏ chạy, tantrum nghiêm trọng hoặc hành vi không an toàn.",
        callout:
          "Mục đích không phải thay đổi con bạn là ai. Mục đích là dạy kỹ năng hữu ích, hỗ trợ an toàn và giúp con bạn giao tiếp nhu cầu thành công hơn.",
      },
      howAbaHelps: {
        title: "Liệu pháp ABA giúp như thế nào?",
        intro:
          "Liệu pháp ABA giúp trẻ phát triển kỹ năng chức năng dùng được tại nhà, trường và cộng đồng. Gia đình cũng nhận hướng dẫn hỗ trợ khái quát hóa qua thói quen hằng ngày và người khác nhau.",
        skillCards: [
          [
            "Kỹ năng giao tiếp",
            "Phát triển yêu cầu, trả lời, làm theo chỉ dẫn, cử chỉ, dùng AAC và ngôn ngữ nói khi phù hợp.",
          ],
          [
            "Kỹ năng sẵn sàng đi học",
            "Xây dựng bắt chước, ghép, chờ đợi, chuyển tiếp, thói quen nhóm, chú ý và hành vi học để học.",
          ],
          [
            "Hỗ trợ hành vi",
            "Dạy kỹ năng thay thế an toàn hơn và giảm mẫu không an toàn như hung hăng, bỏ chạy, tự làm hại hoặc tantrum nghiêm trọng.",
          ],
          [
            "Kỹ năng xã hội",
            "Hỗ trợ luân phiên, vui chơi chung, chào hỏi, tương tác bạn bè, hội thoại và xây dựng mối quan hệ.",
          ],
        ],
      },
      signsBenefit: {
        title: "Dấu hiệu con bạn có thể được lợi từ liệu pháp ABA",
        intro:
          "Gia đình thường hỏi khi nào liệu pháp ABA phù hợp. Trẻ có thể được lợi khi giao tiếp, an toàn, thói quen hằng ngày, sẵn sàng đi học hoặc tham gia xã hội khó đến mức ảnh hưởng cuộc sống hằng ngày. Những dấu hiệu này không thay thế đánh giá lâm sàng, nhưng có thể giúp phụ huynh quyết định khi nào xin hướng dẫn.",
        cards: [
          [
            "Khó giao tiếp nhu cầu",
            "Con bạn có thể thất vọng khi không thể nhờ giúp đỡ, xin nghỉ, lựa chọn hoặc nói với người chăm sóc điều mình cần.",
          ],
          [
            "Lo ngại an toàn hoặc hành vi",
            "ABA có thể giúp khi trẻ có hành vi bỏ chạy, hung hăng, tự làm hại, tantrum nghiêm trọng hoặc mẫu không an toàn khác cần hỗ trợ cẩn thận.",
          ],
          [
            "Chuyển tiếp và thói quen khó",
            "Một số trẻ cần hỗ trợ chuyển giữa hoạt động, chịu chờ đợi, làm theo thói quen hoặc đối phó khi kế hoạch thay đổi.",
          ],
          [
            "Vui chơi hoặc tương tác xã hội hạn chế",
            "ABA có thể giúp xây dựng chú ý chung, bắt chước, vui chơi với bạn, luân phiên, chào hỏi và tham gia linh hoạt với người khác.",
          ],
        ],
        nextStepTitle: "Bước hữu ích tiếp theo",
        nextStepText:
          "Nếu các mẫu này quen thuộc, Eden ABA Therapy có thể giúp gia đình hiểu intake, tài liệu, xem xét bảo hiểm và lập kế hoạch đánh giá.",
        startABA: "Bắt đầu liệu pháp ABA",
        learnAutism: "Tìm hiểu thêm về tự kỷ",
      },
      byAgeGroup: {
        title: "Liệu pháp ABA theo nhóm tuổi",
        intro:
          "Mục tiêu liệu pháp ABA nên thay đổi khi trẻ lớn lên. Trẻ nhỏ hơn có thể tập trung giao tiếp và vui chơi nền tảng, trong khi trẻ lớn hơn có thể làm việc tham gia trường học, độc lập, tự vận động và kỹ năng sống.",
        cards: [
          [
            "Trẻ nhỏ",
            "Mục tiêu ABA sớm có thể tập trung chú ý chung, bắt chước, vui chơi, giao tiếp sớm, phản hồi khi gọi tên và thói quen hằng ngày đơn giản.",
          ],
          [
            "Mầm non",
            "Hỗ trợ độ tuổi mầm non có thể nhắm sẵn sàng đi học, vui chơi với bạn, chuyển tiếp, giao tiếp chức năng và độc lập trong thói quen.",
          ],
          [
            "Trẻ độ tuổi đi học",
            "ABA độ tuổi đi học có thể giúp tham gia lớp học, điều hòa cảm xúc, giải quyết vấn đề xã hội, thói quen bài tập và tự quản lý.",
          ],
          [
            "Trẻ lớn hơn",
            "Mục tiêu có thể mở rộng hướng tự vận động, nhận thức an toàn, kỹ năng cộng đồng, độc lập và thói quen sinh hoạt hằng ngày.",
          ],
        ],
      },
      communication: {
        title: "Phát triển giao tiếp qua ABA",
        intro:
          "Mục tiêu giao tiếp trong ABA không giới hạn lời nói. Trẻ có thể học nhờ giúp đỡ, xin nghỉ, lựa chọn, dùng cử chỉ, làm theo chỉ dẫn, dùng AAC hoặc giao tiếp cảm xúc an toàn hơn. Mục tiêu là giao tiếp chức năng giảm thất vọng và cải thiện tham gia cuộc sống hằng ngày.",
        goals: [
          "Yêu cầu và lựa chọn",
          "Nhờ giúp đỡ hoặc xin nghỉ",
          "Làm theo chỉ dẫn",
          "Dùng AAC hoặc hình ảnh",
          "Chào hỏi và luân phiên",
          "Giao tiếp cảm xúc",
        ],
      },
      practicalGoals: {
        title: "Đạt mục tiêu thực tế với liệu pháp ABA",
        intro:
          "Không có hai đứa trẻ giống nhau. Kế hoạch ABA mạnh dùng mục tiêu đo lường được quan trọng trong đời thực và phản ánh ưu tiên gia đình bạn.",
        examples: [
          "Tăng giao tiếp chức năng để nhờ giúp đỡ, xin nghỉ, đồ chơi, sự chú ý hoặc vật ưa thích.",
          "Làm theo thói quen hằng ngày như rửa tay, mặc quần áo, dọn dẹp, chờ đợi và chuyển tiếp.",
          "Xây dựng hành vi thay thế an toàn cho hung hăng, bỏ chạy, phá hoại tài sản hoặc tantrum nghiêm trọng.",
          "Thực hành tương tác xã hội như luân phiên, chú ý chung, vui chơi với bạn và chào hỏi.",
          "Cải thiện sẵn sàng đi học qua ghép, bắt chước, ngồi theo thói quen ngắn và tham gia nhóm.",
        ],
      },
      progress: {
        title: "Tiến bộ ABA được đo lường như thế nào",
        intro:
          "Liệu pháp ABA dùng dữ liệu để hiểu chiến lược có giúp không. Tiến bộ không chỉ dựa trên ấn tượng; BCBA xem xét mẫu theo thời gian và điều chỉnh kế hoạch điều trị khi con bạn cần mức hỗ trợ khác.",
        cards: [
          [
            "Dữ liệu nền",
            "Đội ngũ ghi lại kỹ năng và mẫu hành vi hiện tại trước để so sánh tiến bộ theo thời gian.",
          ],
          [
            "Dữ liệu buổi",
            "Nhà trị liệu thu thập thông tin trong dạy học, vui chơi, thói quen và hoạt động hỗ trợ hành vi.",
          ],
          [
            "Thành thạo mục tiêu",
            "Kỹ năng được coi là thành thạo chỉ khi được dùng đủ nhất quán để có ý nghĩa cho cuộc sống hằng ngày.",
          ],
          [
            "Cập nhật điều trị",
            "BCBA xem xét dữ liệu và cập nhật mục tiêu khi con bạn cần nhiều hỗ trợ hơn, chiến lược khác hoặc thử thách mới.",
          ],
        ],
        tableHeaders: ["Đánh giá ban đầu", "Xem xét tiến bộ liên tục"],
        initialItems: [
          "Mức kỹ năng nền",
          "Phỏng vấn gia đình",
          "Quan sát thói quen",
          "Mẫu hành vi ban đầu",
        ],
        ongoingItems: [
          "Xu hướng dữ liệu buổi",
          "Thành thạo mục tiêu",
          "Phản hồi phụ huynh",
          "Cập nhật điều trị BCBA",
        ],
      },
      typicalDay: {
        title: "Một ngày liệu pháp ABA điển hình trông như thế nào?",
        intro:
          "Một ngày điển hình có thể gồm vui chơi, thực hành có cấu trúc, dạy trong môi trường tự nhiên, cập nhật phụ huynh, theo dõi tiến bộ và lập kế hoạch an toàn. Mỗi buổi được điều chỉnh theo nhu cầu con bạn.",
        steps: [
          [
            "Bước 1",
            "Chào đón ấm áp và kiểm tra",
            "Gia đình chia sẻ cập nhật, ưu tiên và thay đổi từ nhà hoặc trường trước khi buổi bắt đầu.",
          ],
          [
            "Bước 2",
            "Kết nối qua vui chơi",
            "Nhà trị liệu xây dựng mối quan hệ qua đồ chơi ưa thích, vận động, bài hát, trò chơi và sở thích do trẻ dẫn dắt.",
          ],
          [
            "Bước 3",
            "Thực hành kỹ năng",
            "Mục tiêu được thực hành theo bước nhỏ đạt được, hỗ trợ giảm dần khi trẻ độc lập hơn.",
          ],
          [
            "Bước 4",
            "Dạy trong môi trường tự nhiên",
            "Kỹ năng được thực hành trong thói quen thực, vui chơi, giao tiếp, chuyển tiếp và cơ hội xã hội.",
          ],
          [
            "Bước 5",
            "Huấn luyện người chăm sóc",
            "Phụ huynh học chiến lược thực tế dùng tại nhà, cộng đồng và thói quen hằng ngày.",
          ],
          [
            "Bước 6",
            "Xem xét tiến bộ",
            "BCBA xem xét dữ liệu, ăn mừng tiến bộ và cập nhật kế hoạch điều trị khi nhu cầu con bạn thay đổi.",
          ],
        ],
      },
      firstNinetyDays: {
        title: "Phụ huynh có thể mong đợi gì trong 90 ngày đầu",
        intro:
          "Những tháng đầu liệu pháp ABA thường tập trung tìm hiểu nhu cầu con bạn, xây dựng tin cậy, dạy mục tiêu sớm và giúp người chăm sóc hiểu điều gì đang diễn ra trong điều trị.",
        phases: [
          [
            "Ngày 1–30",
            "Đánh giá, mối quan hệ và nền",
            "Đội ngũ tập trung làm quen con bạn, xác định động lực, thu thập dữ liệu nền và hoàn thiện ưu tiên sớm.",
          ],
          [
            "Ngày 31–60",
            "Bắt đầu dạy kỹ năng",
            "Mục tiêu trị liệu trở nên tích cực hơn, huấn luyện phụ huynh bắt đầu và BCBA xem xét phản ứng sớm với chiến lược dạy.",
          ],
          [
            "Ngày 61–90",
            "Tinh chỉnh và xem xét tiến bộ",
            "Đội ngũ xem xét dữ liệu, điều chỉnh mục tiêu, mở rộng khái quát hóa và thảo luận điều gì hiệu quả tại nhà và trường.",
          ],
        ],
      },
      parentInvolvement: {
        title: "Phụ huynh tham gia liệu pháp ABA như thế nào?",
        intro:
          "Gia đình đóng vai trò quan trọng trong mọi chương trình ABA thành công. Hướng dẫn phụ huynh giúp người chăm sóc hiểu chiến lược, thực hành kỹ năng trong thói quen hằng ngày và hỗ trợ tiến bộ ngoài buổi trị liệu.",
        bullets: [
          "Đặt mục tiêu cá nhân hóa phản ánh nhu cầu nhà, trường và cộng đồng",
          "Học chiến lược dựa trên bằng chứng cho chuyển tiếp, an toàn, giao tiếp và thói quen",
          "Phối hợp chăm sóc với bác sĩ, trường, trị liệu ngôn ngữ, trị liệu hoạt động và nhà cung cấp khác khi phù hợp",
          "Xây dựng sự nhất quán để trẻ dùng kỹ năng với người và địa điểm khác nhau",
        ],
      },
      homeSchool: {
        title: "ABA hỗ trợ thành công tại nhà và trường như thế nào",
        intro:
          "Chương trình ABA mạnh dạy kỹ năng theo cách mang vào thói quen thực. Mục tiêu là trẻ dùng giao tiếp, độc lập, an toàn và kỹ năng xã hội với người và bối cảnh khác nhau.",
        home: {
          title: "Thói quen tại nhà",
          text: "ABA có thể hỗ trợ bữa ăn, vệ sinh, vệ sinh cá nhân, giờ ngủ, việc nhà, chuyển tiếp, vui chơi với anh chị em và giao tiếp an toàn trong thói quen gia đình hằng ngày.",
        },
        school: {
          title: "Sẵn sàng đi học",
          text: "ABA có thể giúp trẻ thực hành chờ đợi, học theo nhóm, làm theo chỉ dẫn, tương tác bạn bè, chuyển tiếp và tham gia lớp học.",
        },
        findCenter: "Tìm trung tâm gần bạn",
        scheduleEvaluation: "Lên lịch đánh giá tự kỷ",
      },
      effectiveness: {
        title: "Liệu pháp ABA có hiệu quả không?",
        intro:
          "ABA được dùng rộng rãi hỗ trợ trẻ tự kỷ vì dùng mục tiêu cá nhân hóa, dữ liệu tiến bộ liên tục, sự tham gia phụ huynh và chiến lược dạy dựa trên bằng chứng. Kết quả tốt nhất xảy ra khi điều trị được cá nhân hóa, tận tâm, nhất quán và xem xét thường xuyên.",
        methods: [
          [
            "Dạy thử rời rạc (DTT)",
            "DTT chia kỹ năng mới thành bước nhỏ với gợi ý rõ, thực hành, phản hồi và củng cố.",
          ],
          [
            "Dạy trong môi trường tự nhiên (NET)",
            "NET dùng vui chơi, thói quen và sở thích trẻ để dạy kỹ năng trong tình huống đời thực.",
          ],
        ],
      },
      mythsFacts: {
        title: "Hiểu lầm phổ biến vs sự thật về liệu pháp ABA",
        intro:
          "Phụ huynh xứng đáng hiểu rõ, hiện đại về liệu pháp ABA. Những thẻ hiểu lầm-sự thật nhanh giúp gia đình biết ABA đạo đức, cá nhân hóa nên trông như thế nào.",
        items: [
          [
            "ABA chỉ là học bàn.",
            "ABA hiện đại có thể dựa trên vui chơi, tự nhiên, thói quen và xoay quanh sở thích trẻ.",
          ],
          [
            "ABA giống nhau với mọi trẻ.",
            "ABA đạo đức được cá nhân hóa xoay quanh điểm mạnh, nhu cầu, phong cách giao tiếp, ưu tiên gia đình và văn hóa của trẻ.",
          ],
          [
            "ABA chỉ giảm hành vi vấn đề.",
            "Nhiều mục tiêu tập trung giao tiếp, độc lập, an toàn, tham gia xã hội, vui chơi và kỹ năng sinh hoạt hằng ngày.",
          ],
          [
            "Phụ huynh không tham gia ABA.",
            "Hợp tác người chăm sóc là thiết yếu vì trẻ cần dùng kỹ năng ngoài buổi trị liệu.",
          ],
        ],
        mythPrefix: "Hiểu lầm:",
        factPrefix: "Sự thật:",
      },
      assessment: {
        title: "Hiểu quy trình đánh giá ABA",
        intro:
          "Trước khi trị liệu bắt đầu, BCBA tìm hiểu điểm mạnh, nhu cầu, giao tiếp, thói quen, mối quan tâm an toàn, tiền sử trường học và ưu tiên gia đình của con bạn. Đánh giá trở thành nền tảng lập kế hoạch điều trị.",
        steps: [
          [
            "1",
            "Phỏng vấn gia đình",
            "Phụ huynh chia sẻ mối quan tâm, thói quen, điểm mạnh, ưu tiên, nhu cầu an toàn và mục tiêu tại nhà, trường và cộng đồng.",
          ],
          [
            "2",
            "Quan sát trực tiếp",
            "Clinician quan sát giao tiếp, vui chơi, chuyển tiếp, sẵn sàng học và mẫu hành vi.",
          ],
          [
            "3",
            "Xem xét kỹ năng",
            "Đội ngũ đánh giá giao tiếp, kỹ năng thích nghi, thói quen hằng ngày, tương tác xã hội và độc lập.",
          ],
          [
            "4",
            "Phát triển kế hoạch",
            "Phát hiện được dùng tạo mục tiêu đo lường được, cường độ dịch vụ đề xuất và hướng dẫn gia đình.",
          ],
        ],
      },
      treatmentPlans: {
        title: "BCBA tạo kế hoạch điều trị cá nhân hóa như thế nào",
        intro:
          "BCBA dùng kết quả đánh giá, ý kiến gia đình, quan sát, ưu tiên phát triển và dữ liệu tạo kế hoạch cụ thể, đo lường được và có ý nghĩa. Kế hoạch nên giải thích điều gì sẽ được dạy, tiến bộ đo lường thế nào và người chăm sóc được hỗ trợ ra sao.",
        checklist: [
          "Ưu tiên gia đình",
          "Mức kỹ năng hiện tại",
          "Nhu cầu hành vi và an toàn",
          "Hồ sơ giao tiếp",
          "Thói quen nhà và trường",
          "Lịch xem xét tiến bộ",
        ],
      },
      earlyIntervention: {
        title: "Lợi ích dài hạn của can thiệp sớm",
        intro:
          "Hỗ trợ sớm có thể giúp gia đình hiểu nhu cầu phát triển sớm hơn và xây dựng kỹ năng nền tảng trong những năm học tập quan trọng. Liệu pháp ABA có thể hỗ trợ giao tiếp, thói quen hằng ngày, an toàn, vui chơi, tham gia xã hội và sẵn sàng đi học khi mục tiêu được cá nhân hóa và xem xét thường xuyên.",
        callout:
          "Hỗ trợ sớm không phải vội vàng với trẻ. Đó là cung cấp công cụ thực tế sớm hơn cho trẻ và gia đình.",
      },
      cost: {
        title: "Liệu pháp ABA tốn bao nhiêu?",
        intro:
          "Chi phí liệu pháp ABA phụ thuộc phạm vi bảo hiểm, yêu cầu ủy quyền, khấu trừ, đồng thanh toán, đồng chi trả, tính cần thiết y khoa, trạng thái mạng nhà cung cấp và số giờ trị liệu được phê duyệt. Eden ABA Therapy có thể giúp thu thập thông tin bảo hiểm, xem xét quyền lợi và giải thích bước tiếp theo trước khi dịch vụ bắt đầu.",
        getStarted: "Bắt đầu",
        checkInsurance: "Kiểm tra phạm vi bảo hiểm của tôi",
      },
      parentQuestions: {
        title: "Câu hỏi phụ huynh nên hỏi trước khi bắt đầu liệu pháp ABA",
        intro:
          "Chọn nhà cung cấp ABA là quyết định quan trọng. Những câu hỏi này giúp gia đình so sánh chương trình, hiểu giám sát và cảm thấy sẵn sàng trước khi bắt đầu dịch vụ.",
        items: [
          [
            "Tiến bộ được đo lường như thế nào?",
            "Hỏi dữ liệu được thu thập, xem xét và chia sẻ với phụ huynh ra sao.",
          ],
          [
            "Mục tiêu được cập nhật bao lâu một lần?",
            "Chương trình tốt nên xem xét mục tiêu thường xuyên và điều chỉnh theo dữ liệu và ưu tiên gia đình.",
          ],
          [
            "Phụ huynh sẽ được huấn luyện như thế nào?",
            "Hỏi đào tạo phụ huynh trông như thế nào, tần suất và chiến lược được thực hành tại nhà ra sao.",
          ],
          [
            "Ai giám sát trị liệu?",
            "Hỏi BCBA quan sát buổi, xem xét dữ liệu điều trị và hỗ trợ đội trị liệu bao lâu một lần.",
          ],
          [
            "Đội trường học và nhà cung cấp tham gia như thế nào?",
            "Hỏi giao tiếp có thể diễn ra với giáo viên, trị liệu ngôn ngữ, OT, bác sĩ và nhà cung cấp khác khi phù hợp.",
          ],
        ],
      },
      successFactors: {
        title: "Yếu tố thành công cải thiện kết quả ABA",
        intro:
          "Tiến bộ có ý nghĩa có khả năng cao hơn khi trị liệu nhất quán, cá nhân hóa, hợp tác và gắn với thói quen gia đình thực.",
        items: [
          "Tham dự nhất quán",
          "Phụ huynh tham gia tích cực",
          "Mục tiêu đo lường rõ ràng",
          "Giám sát BCBA",
          "Phối hợp với trường và nhà cung cấp",
          "Xem xét dữ liệu thường xuyên",
          "Dạy tận tâm",
          "Khái quát hóa qua bối cảnh",
        ],
      },
      additionalFaqs: {
        title: "Câu hỏi thường gặp về bắt đầu ABA",
        items: [
          [
            "Con tôi cần bao nhiêu giờ liệu pháp ABA?",
            "Giờ đề xuất phụ thuộc kết quả đánh giá, tính cần thiết y khoa, mục tiêu gia đình, lịch trường, tuổi, mối quan tâm an toàn và yêu cầu ủy quyền bảo hiểm.",
          ],
          [
            "Liệu pháp ABA có thể giúp giao tiếp không?",
            "Có. ABA có thể hỗ trợ giao tiếp chức năng như nhờ giúp đỡ, lựa chọn, xin nghỉ, làm theo chỉ dẫn, dùng AAC và giảm thất vọng liên quan khó khăn giao tiếp.",
          ],
          [
            "ABA có hỗ trợ sẵn sàng đi học không?",
            "ABA có thể giúp trẻ thực hành chờ đợi, chuyển tiếp, làm theo hướng dẫn, tương tác bạn bè, thói quen nhóm và kỹ năng học để học hỗ trợ tham gia lớp học.",
          ],
          [
            "BCBA làm gì?",
            "BCBA hoàn thành đánh giá, thiết kế kế hoạch điều trị, giám sát trị liệu, xem xét dữ liệu, cập nhật mục tiêu và hỗ trợ đào tạo phụ huynh.",
          ],
          [
            "Tôi nên mang gì đến buổi ABA đầu tiên?",
            "Tài liệu hữu ích gồm báo cáo chẩn đoán, thẻ bảo hiểm, ghi chú bác sĩ nhi, IEP hoặc hồ sơ trường, báo cáo trị liệu trước và danh sách mối quan tâm lớn nhất của gia đình.",
          ],
        ],
      },
      relatedResources: {
        title: "Tài nguyên liệu pháp ABA liên quan",
        intro:
          "Dùng các trang liên quan để tiếp tục học, kiểm tra phạm vi bảo hiểm, tìm trung tâm hoặc bắt đầu quy trình intake.",
        cards: [
          [
            "Đánh giá tự kỷ",
            "Hiểu sàng lọc, hướng dẫn chẩn đoán và bước tiếp theo.",
            "Lên lịch đánh giá tự kỷ",
          ],
          [
            "Tự kỷ là gì?",
            "Tìm hiểu dấu hiệu tự kỷ, chẩn đoán, mức hỗ trợ và tài nguyên gia đình.",
            "Đọc hướng dẫn tự kỷ",
          ],
          [
            "Công cụ sàng lọc M-CHAT-R",
            "Dùng công cụ sàng lọc cho trẻ nhỏ thân thiện với phụ huynh và xem khoảng điểm.",
            "Bắt đầu sàng lọc",
          ],
          [
            "Phạm vi bảo hiểm",
            "Xem hỗ trợ bảo hiểm Virginia, ủy quyền và hướng dẫn quyền lợi.",
            "Kiểm tra phạm vi bảo hiểm",
          ],
          [
            "Địa điểm",
            "Tìm khu vực phục vụ và thông tin trung tâm Eden ABA Therapy.",
            "Tìm trung tâm gần bạn",
          ],
          [
            "Bắt đầu Intake",
            "Chia sẻ thông tin gia đình và bắt đầu bước tiếp theo.",
            "Bắt đầu",
          ],
        ],
      },
    },
  });
}
