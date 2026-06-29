import type { SiteLanguage } from "@/hooks/useSiteLanguage";
import type { AiIntakeActionId } from "./types";

type AiIntakeActionCopy = {
  label: string;
  description: string;
};

type AiIntakeCopy = {
  actionsAriaLabel: string;
  assistantTitle: string;
  statusLabel: string;
  avatarLabel: string;
  placeholderLabel: string;
  badgeLive: string;
  badgeUnavailable: string;
  badgeAvailable: string;
  badgePreview: string;
  mute: string;
  unmute: string;
  startChat: string;
  endChat: string;
  tryAgain: string;
  usePreview: string;
  idleIntro: string;
  preparing: string;
  connecting: string;
  ready: string;
  sessionEnded: string;
  startFailed: string;
  timeout: string;
  unavailable: string;
  greeting: readonly string[];
  actions: Record<AiIntakeActionId, AiIntakeActionCopy>;
};

const EN_COPY: AiIntakeCopy = {
  actionsAriaLabel: "AI intake assistant actions",
  assistantTitle: "Eden AI Intake Assistant",
  statusLabel: "Eden AI Intake Assistant",
  avatarLabel: "Eden AI intake assistant avatar",
  placeholderLabel: "Katya · Eden AI Intake Assistant",
  badgeLive: "Live",
  badgeUnavailable: "Unavailable",
  badgeAvailable: "Available Now",
  badgePreview: "Preview Mode",
  mute: "Mute avatar audio",
  unmute: "Unmute avatar audio",
  startChat: "Start AI Chat",
  endChat: "End Chat",
  tryAgain: "Try Again",
  usePreview: "Use Preview",
  idleIntro: "Tap Start AI Chat to begin your intake conversation.",
  preparing: "Preparing your Eden AI intake assistant...",
  connecting: "Connecting to Eden. This may take a few seconds...",
  ready: "Eden is ready. You can speak when the avatar is listening.",
  sessionEnded: "Session ended. Tap Start AI Chat to begin again.",
  startFailed: "LiveAvatar could not start. Please try again.",
  timeout: "Connection timed out. LiveAvatar may be unavailable right now.",
  unavailable: "LiveAvatar is unavailable right now. Please try again.",
  greeting: [
    "Hello!",
    "I'm Eden,",
    "your AI Intake Assistant.",
    "",
    "I'm here to answer questions about ABA therapy,",
    "insurance,",
    "appointments,",
    "and getting started.",
    "",
    "How can I help today?",
  ],
  actions: {
    "ask-question": {
      label: "Ask a Question",
      description: "Chat with Eden about ABA, services, and next steps.",
    },
    "check-insurance": {
      label: "Check Insurance",
      description: "Learn how Eden may help verify benefits.",
    },
    schedule: {
      label: "Schedule Appointment",
      description: "Explore scheduling options when appropriate.",
    },
    "start-intake": {
      label: "Start Intake",
      description: "Begin the family intake journey with confidence.",
    },
    "provider-referral": {
      label: "Provider Referral",
      description: "Professional referral guidance for care partners.",
    },
    "speak-with-person": {
      label: "Speak with a Person",
      description: "Request a live Eden intake coordinator.",
    },
  },
};

const VI_COPY: AiIntakeCopy = {
  actionsAriaLabel: "Các thao tác trợ lý tiếp nhận AI",
  assistantTitle: "Trợ lý Tiếp nhận AI Eden",
  statusLabel: "Trợ lý Tiếp nhận AI Eden",
  avatarLabel: "Ảnh đại diện trợ lý tiếp nhận AI Eden",
  placeholderLabel: "Katya · Trợ lý Tiếp nhận AI Eden",
  badgeLive: "Trực tiếp",
  badgeUnavailable: "Không khả dụng",
  badgeAvailable: "Sẵn sàng",
  badgePreview: "Chế độ xem trước",
  mute: "Tắt tiếng avatar",
  unmute: "Bật tiếng avatar",
  startChat: "Bắt đầu trò chuyện AI",
  endChat: "Kết thúc trò chuyện",
  tryAgain: "Thử lại",
  usePreview: "Dùng bản xem trước",
  idleIntro: "Nhấn Bắt đầu trò chuyện AI để bắt đầu buổi tiếp nhận.",
  preparing: "Đang chuẩn bị trợ lý tiếp nhận AI Eden...",
  connecting: "Đang kết nối với Eden. Quá trình này có thể mất vài giây...",
  ready: "Eden đã sẵn sàng. Bạn có thể nói khi avatar đang lắng nghe.",
  sessionEnded: "Phiên đã kết thúc. Nhấn Bắt đầu trò chuyện AI để bắt đầu lại.",
  startFailed: "LiveAvatar không thể khởi động. Vui lòng thử lại.",
  timeout: "Kết nối quá thời gian chờ. LiveAvatar có thể tạm thời không khả dụng.",
  unavailable: "LiveAvatar hiện không khả dụng. Vui lòng thử lại.",
  greeting: [
    "Xin chào!",
    "Tôi là Eden,",
    "trợ lý tiếp nhận AI của bạn.",
    "",
    "Tôi ở đây để trả lời các câu hỏi về liệu pháp ABA,",
    "bảo hiểm,",
    "lịch hẹn,",
    "và cách bắt đầu.",
    "",
    "Tôi có thể giúp gì cho bạn hôm nay?",
  ],
  actions: {
    "ask-question": {
      label: "Đặt câu hỏi",
      description: "Trò chuyện với Eden về ABA, dịch vụ và các bước tiếp theo.",
    },
    "check-insurance": {
      label: "Kiểm tra bảo hiểm",
      description: "Tìm hiểu cách Eden có thể hỗ trợ xác minh quyền lợi.",
    },
    schedule: {
      label: "Đặt lịch hẹn",
      description: "Khám phá các lựa chọn đặt lịch khi phù hợp.",
    },
    "start-intake": {
      label: "Bắt đầu tiếp nhận",
      description: "Bắt đầu hành trình tiếp nhận gia đình một cách tự tin.",
    },
    "provider-referral": {
      label: "Giới thiệu từ nhà cung cấp",
      description: "Hướng dẫn giới thiệu chuyên nghiệp cho đối tác chăm sóc.",
    },
    "speak-with-person": {
      label: "Nói chuyện với nhân viên",
      description: "Yêu cầu điều phối viên tiếp nhận Eden trực tiếp.",
    },
  },
};

const COPY_BY_LANGUAGE: Record<SiteLanguage, AiIntakeCopy> = {
  en: EN_COPY,
  vi: VI_COPY,
};

export function getAiIntakeCopy(language: SiteLanguage): AiIntakeCopy {
  return COPY_BY_LANGUAGE[language] ?? EN_COPY;
}
