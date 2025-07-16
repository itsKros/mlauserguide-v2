// Sidebar.jsx
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../../sidebar.css';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Rocket,
  Book,
  Layers,
  HelpCircle,
  Star,
} from "lucide-react";

const navData = [
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
    icon: Book,
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
    icon: Layers,
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
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setCollapsed(isNowMobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  useEffect(() => {
    const expandMatchingSections = (items) => {
      for (const item of items) {
        if (pathname.startsWith(item.path)) {
          setOpenSections(prev => ({ ...prev, [item.path]: true }));
          if (item.sub) expandMatchingSections(item.sub);
        }
      }
    };
    expandMatchingSections(navData);
  }, [pathname]);

  useEffect(() => {
    if (isMobile && sidebarRef.current) {
      const activeLink = sidebarRef.current.querySelector(".bg-\\[\\#7b1fa2\\]");
      if (activeLink) {
        activeLink.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [pathname, isMobile]);

  const toggleSection = (path) => {
    setOpenSections(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderItems = (items, level = 0) => (
    <div className={`nav-level nav-level-${level}`}>
      {items.map(({ label, path, icon: Icon, sub }) => {
        const isOpen = openSections[path];
        const isExactActive = pathname === path;

        return (
          <div key={path} className="mb-1">
            <div
              className={`flex items-center justify-between gap-2 rounded cursor-pointer ${
                isExactActive
                  ? "bg-[#7b1fa2] text-white"
                  : "text-[#7b1fa2] hover:bg-gray-100"
              }`}
            >
              <NavLink
              to={path}
              className={`flex items-center gap-2 px-3 py-2 flex-grow ${
                isExactActive ? "text-white" : "text-[#7b1fa2] hover:bg-gray-100"
              }`}
              onClick={() => {
                if (isMobile) setCollapsed(true);
              }}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{label}</span>
            </NavLink>

              {sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(path);
                  }}
                  className="ml-1"
                  aria-label="Toggle submenu"
                >
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {sub && isOpen && (
              <div className="ml-2">{renderItems(sub, level + 1)}</div>
            )}
          </div>
        );
      })}
    </div>
  );


  return (
    <>
      <aside
        ref={sidebarRef}
        className={`bg-white fixed top-[60px] bottom-0 left-0 z-40 border-r border-gray-200 transition-all duration-300
          ${
            isMobile
              ? collapsed
                ? "w-0 p-0 overflow-hidden"
                : "w-[260px] p-4"
              : collapsed
              ? "w-[60px] p-4"
              : "w-[300px] p-4"
          }
          overflow-y-auto flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            {!collapsed && (
              <span className="font-semibold text-[#7b1fa2]">Navigation</span>
            )}
            {!isMobile && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-500 hover:text-[#7b1fa2] transition-transform duration-300 cursor-pointer"
                aria-label="Collapse sidebar"
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
          className="fixed inset-0 top-[60px] bg-black/40 z-30 transition-opacity duration-300"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
