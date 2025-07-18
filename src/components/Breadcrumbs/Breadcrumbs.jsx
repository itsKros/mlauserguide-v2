// Breadcrumb.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

function formatBreadcrumb(text) {
  const customTitles = {
    'ai-andy-coach': 'AI Andy Coach',
    'course-ebook': 'Course or Ebook',
    'step-by-step': 'Step-by-Step',
    'creators-dashboard': "Creator’s Dashboard",
    '1-on-1-call': '1-on-1 Call',
    'profile-information': 'Profile Information'
  };
  return customTitles[text] || text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Breadcrumbs({ textSize = 'text-base sm:text-lg' }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav
      className={`mt-4 mb-6 text-gray-700 flex items-center flex-wrap space-x-1 overflow-x-auto whitespace-nowrap scrollbar-hide ${textSize}`}
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="hover:bg-gray-100 px-2 py-1 rounded text-[#7b1fa2] font-semibold"
      >
        Home
      </Link>

      {pathnames.map((segment, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-5 h-5 text-gray-400 mx-1 flex-shrink-0" />
            <Link
              to={to}
              className={`hover:bg-gray-100 px-2 py-1 rounded text-[#7b1fa2] font-semibold ${
                isLast ? 'pointer-events-none opacity-70' : ''
              }`}
              aria-current={isLast ? 'page' : undefined}
            >
              {formatBreadcrumb(segment)}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
