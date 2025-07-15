// Sidebar.jsx
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  House,
  Rocket,
  Layers,
  Book,
  Headphones,
  Bot,
  Image,
  Mail,
  Server,
  Star,
  HelpCircle,
} from "lucide-react";

// Sidebar navigation structure
const navData = [
  {
    label: "Home",
    path: "/",
    icon: House,
  },
  {
    label: "Getting Started",
    path: "/getting-started",
    icon: Rocket,
    sub: [
      {
        label: "Creator’s Dashboard",
        path: "/getting-started/creators-dashboard",
        sub: [
          { label: "Profile Information", path: "/getting-started/creators-dashboard/profile-information" },
          { label: "Email", path: "/getting-started/creators-dashboard/email" },
          { label: "Password", path: "/getting-started/creators-dashboard/password" },
          { label: "Billing", path: "/getting-started/creators-dashboard/billing" },
        ],
      },
      { label: "Marketing Resources", path: "/getting-started/marketing-resources" },
      { label: "AI Andy Coach", path: "/getting-started/ai-andy-coach" },
    ],
  },
  {
    label: "Create a Course or Ebook",
    path: "/course-ebook",
    icon: Layers,
    sub: [
      {
        label: "Step-by-Step Guided Creation",
        path: "/course-ebook/step-by-step",
        sub: [
          { label: "Create a Course / Training", path: "/course-ebook/step-by-step/create-course" },
          { label: "Create Fiction", path: "/course-ebook/step-by-step/create-fiction" },
          { label: "Create Non-Fiction Book", path: "/course-ebook/step-by-step/create-nonfiction" },
        ],
      },
      { label: "Document Upload", path: "/course-ebook/document-upload" },
      { label: "Fast Course Creation", path: "/course-ebook/fast-course-creation" },
    ],
  },
  {
    label: "Additional Features",
    path: "/additional-features",
    icon: Book,
    sub: [
      { label: "Editor Window", path: "/additional-features/editor-window" },
      { label: "Share Preview", path: "/additional-features/share-preview" },
      { label: "Admin Panel", path: "/additional-features/admin-panel" },
      { label: "Add Videos", path: "/additional-features/add-videos" },
      { label: "Add Audiobooks", path: "/additional-features/add-audiobooks" },
      { label: "Add Cover Images", path: "/additional-features/add-cover-images" },
      { label: "Create Quizzes", path: "/additional-features/create-quizzes" },
      { label: "Media Management", path: "/additional-features/media-management" },
      { label: "Email Campaigns", path: "/additional-features/email-campaigns" },
    ],
  },
  {
    label: "Customer Support",
    path: "/customer-support",
    icon: HelpCircle,
    sub: [
      { label: "Log a Complaint", path: "/customer-support/log-complaint" },
      { label: "1-on-1 Call", path: "/customer-support/1-on-1-call" },
    ],
  },
];

export default function Sidebar({ collapsed, setCollapsed, isMobile }) {
  const { pathname } = useLocation();
  const sidebarRef = useRef(null);
  const [openMap, setOpenMap] = useState({});

  // Expand relevant section on load
  useEffect(() => {
    const expandForPath = (items, path, map = {}) => {
      items.forEach(item => {
        if (path.startsWith(item.path)) {
          map[item.path] = true;
          if (item.sub) expandForPath(item.sub, path, map);
        }
      });
      return map;
    };
    setOpenMap(expandForPath(navData, pathname));
  }, [pathname]);

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  // Auto-scroll active link into view on mobile
  useEffect(() => {
    if (isMobile && sidebarRef.current) {
      const active = sidebarRef.current.querySelector(".bg-\\[\\#7b1fa2\\]");
      if (active) active.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [pathname, isMobile]);

  // Toggle section
  const toggle = (key) =>
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));

  const renderItems = (items, depth = 0) =>
    items.map(({ label, path, sub, icon: Icon }) => (
      <div key={path}>
        <NavLink
          to={path}
          onClick={(e) => {
            if (sub) {
              e.preventDefault();
              toggle(path);
            }
            if (isMobile) setCollapsed(true);
          }}
          className={({ isActive }) =>
            `flex items-center gap-2 my-1 px-3 py-2 rounded text-sm ${
              isActive
                ? "bg-[#7b1fa2] text-white"
                : "text-[#7b1fa2] hover:bg-gray-100"
            }`
          }
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{label}</span>
        </NavLink>

        {sub && openMap[path] && (
          <div className="pl-2">
            {renderItems(sub, depth + 1)}
          </div>
        )}
      </div>
    ));

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`bg-white fixed top-[60px] bottom-0 left-0 z-40 border-r border-gray-200 transition-all duration-300 ${
          isMobile
            ? collapsed
              ? "w-0 p-0 overflow-hidden"
              : "w-[250px] p-4"
            : collapsed
            ? "w-[60px] p-4"
            : "w-[250px] p-4"
        } overflow-y-auto flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            {!collapsed && <span className="font-semibold text-[#7b1fa2]">Navigation</span>}
            {!isMobile && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-500 hover:text-[#7b1fa2] transition"
              >
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </button>
            )}
          </div>
          {!collapsed && renderItems(navData)}
        </div>
        <div className="mt-auto" />
      </aside>

      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 top-[60px] bg-black/40 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
