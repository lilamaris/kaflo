import * as React from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Square,
  Type,
  Image,
  Layout,
  FormInput,
  List,
  BarChart3,
  Mail,
  Calendar,
  MapPin,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Search,
  Menu,
  Bell,
  User,
  Settings,
  Home,
  ShoppingCart,
  CreditCard,
  FileText,
  Video,
  Music,
  Camera,
  Phone,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Check,
  X,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// 컴포넌트 타입 정의
interface DraggableComponent {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  defaultSize: { width: number; height: number };
  color: string;
}

// 목업 컴포넌트 데이터
const draggableComponents: DraggableComponent[] = [
  // 기본 레이아웃
  {
    id: "container",
    name: "컨테이너",
    category: "레이아웃",
    icon: Layout,
    description: "다른 컴포넌트들을 담는 컨테이너",
    defaultSize: { width: 6, height: 4 },
    color: "bg-blue-500",
  },
  {
    id: "grid",
    name: "그리드",
    category: "레이아웃",
    icon: Square,
    description: "그리드 레이아웃 컨테이너",
    defaultSize: { width: 8, height: 6 },
    color: "bg-blue-600",
  },
  {
    id: "flex",
    name: "플렉스",
    category: "레이아웃",
    icon: Layout,
    description: "플렉스 레이아웃 컨테이너",
    defaultSize: { width: 6, height: 3 },
    color: "bg-blue-700",
  },

  // 텍스트 컴포넌트
  {
    id: "heading",
    name: "제목",
    category: "텍스트",
    icon: Type,
    description: "H1, H2, H3 제목 텍스트",
    defaultSize: { width: 4, height: 1 },
    color: "bg-green-500",
  },
  {
    id: "paragraph",
    name: "문단",
    category: "텍스트",
    icon: Type,
    description: "일반 문단 텍스트",
    defaultSize: { width: 6, height: 2 },
    color: "bg-green-600",
  },
  {
    id: "label",
    name: "라벨",
    category: "텍스트",
    icon: Type,
    description: "폼 라벨 텍스트",
    defaultSize: { width: 2, height: 1 },
    color: "bg-green-700",
  },

  // 폼 컴포넌트
  {
    id: "input",
    name: "입력창",
    category: "폼",
    icon: FormInput,
    description: "텍스트 입력 필드",
    defaultSize: { width: 4, height: 1 },
    color: "bg-purple-500",
  },
  {
    id: "button",
    name: "버튼",
    category: "폼",
    icon: Square,
    description: "클릭 가능한 버튼",
    defaultSize: { width: 2, height: 1 },
    color: "bg-purple-600",
  },
  {
    id: "textarea",
    name: "텍스트영역",
    category: "폼",
    icon: FormInput,
    description: "여러 줄 텍스트 입력",
    defaultSize: { width: 4, height: 3 },
    color: "bg-purple-700",
  },
  {
    id: "checkbox",
    name: "체크박스",
    category: "폼",
    icon: Check,
    description: "체크박스 입력",
    defaultSize: { width: 1, height: 1 },
    color: "bg-purple-800",
  },

  // 미디어 컴포넌트
  {
    id: "image",
    name: "이미지",
    category: "미디어",
    icon: Image,
    description: "이미지 표시",
    defaultSize: { width: 4, height: 3 },
    color: "bg-orange-500",
  },
  {
    id: "video",
    name: "비디오",
    category: "미디어",
    icon: Video,
    description: "비디오 플레이어",
    defaultSize: { width: 6, height: 4 },
    color: "bg-orange-600",
  },
  {
    id: "audio",
    name: "오디오",
    category: "미디어",
    icon: Music,
    description: "오디오 플레이어",
    defaultSize: { width: 4, height: 1 },
    color: "bg-orange-700",
  },

  // 네비게이션
  {
    id: "navbar",
    name: "네비게이션",
    category: "네비게이션",
    icon: Menu,
    description: "상단 네비게이션 바",
    defaultSize: { width: 12, height: 1 },
    color: "bg-indigo-500",
  },
  {
    id: "sidebar",
    name: "사이드바",
    category: "네비게이션",
    icon: Menu,
    description: "측면 네비게이션",
    defaultSize: { width: 3, height: 8 },
    color: "bg-indigo-600",
  },
  {
    id: "breadcrumb",
    name: "브레드크럼",
    category: "네비게이션",
    icon: ChevronRight,
    description: "페이지 경로 표시",
    defaultSize: { width: 6, height: 1 },
    color: "bg-indigo-700",
  },

  // 데이터 표시
  {
    id: "table",
    name: "테이블",
    category: "데이터",
    icon: List,
    description: "데이터 테이블",
    defaultSize: { width: 8, height: 6 },
    color: "bg-teal-500",
  },
  {
    id: "list",
    name: "리스트",
    category: "데이터",
    icon: List,
    description: "항목 리스트",
    defaultSize: { width: 4, height: 4 },
    color: "bg-teal-600",
  },
  {
    id: "card",
    name: "카드",
    category: "데이터",
    icon: Square,
    description: "정보 카드",
    defaultSize: { width: 3, height: 4 },
    color: "bg-teal-700",
  },
  {
    id: "chart",
    name: "차트",
    category: "데이터",
    icon: BarChart3,
    description: "데이터 차트",
    defaultSize: { width: 6, height: 4 },
    color: "bg-teal-800",
  },

  // 상호작용
  {
    id: "modal",
    name: "모달",
    category: "상호작용",
    icon: Square,
    description: "팝업 모달",
    defaultSize: { width: 6, height: 5 },
    color: "bg-pink-500",
  },
  {
    id: "tooltip",
    name: "툴팁",
    category: "상호작용",
    icon: MessageCircle,
    description: "정보 툴팁",
    defaultSize: { width: 2, height: 1 },
    color: "bg-pink-600",
  },
  {
    id: "dropdown",
    name: "드롭다운",
    category: "상호작용",
    icon: ChevronDown,
    description: "드롭다운 메뉴",
    defaultSize: { width: 3, height: 1 },
    color: "bg-pink-700",
  },

  // 아이콘 및 버튼
  {
    id: "icon-button",
    name: "아이콘 버튼",
    category: "아이콘",
    icon: Star,
    description: "아이콘 버튼",
    defaultSize: { width: 1, height: 1 },
    color: "bg-yellow-500",
  },
  {
    id: "social-share",
    name: "공유 버튼",
    category: "아이콘",
    icon: Share2,
    description: "소셜 공유 버튼",
    defaultSize: { width: 2, height: 1 },
    color: "bg-yellow-600",
  },
  {
    id: "like-button",
    name: "좋아요",
    category: "아이콘",
    icon: Heart,
    description: "좋아요 버튼",
    defaultSize: { width: 1, height: 1 },
    color: "bg-red-500",
  },
  {
    id: "download-button",
    name: "다운로드",
    category: "아이콘",
    icon: Download,
    description: "다운로드 버튼",
    defaultSize: { width: 2, height: 1 },
    color: "bg-yellow-700",
  },
];

// 카테고리별로 그룹화
const groupedComponents = draggableComponents.reduce((acc, component) => {
  if (!acc[component.category]) {
    acc[component.category] = [];
  }
  acc[component.category].push(component);
  return acc;
}, {} as Record<string, DraggableComponent[]>);

// 드래그 시작 핸들러 (목업)
const handleDragStart = (e: React.DragEvent, component: DraggableComponent) => {
  e.dataTransfer.setData("application/json", JSON.stringify(component));
  e.dataTransfer.effectAllowed = "copy";
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="p-4">
        <div className="space-y-6">
          {Object.entries(groupedComponents).map(([category, components]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {components.map((component) => {
                  const IconComponent = component.icon;
                  return (
                    <div
                      key={component.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component)}
                      className={cn(
                        "group relative p-3 rounded-lg border border-border bg-card",
                        "hover:border-primary/50 hover:bg-accent/50 transition-all duration-200",
                        "cursor-grab active:cursor-grabbing",
                        "flex flex-col items-center text-center space-y-2"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center",
                          component.color,
                          "text-white group-hover:scale-110 transition-transform"
                        )}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-foreground">
                          {component.name}
                        </p>
                        <p className="text-xs text-muted-foreground leading-tight">
                          {component.description}
                        </p>
                      </div>
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-xs text-muted-foreground bg-background/80 px-1 rounded">
                          {component.defaultSize.width}×
                          {component.defaultSize.height}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
