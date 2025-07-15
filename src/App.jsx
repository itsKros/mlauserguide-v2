// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './components/Pages/Home/Home.jsx';

// Getting Started
import GettingStarted from './components/Pages/GettingStarted/GettingStarted.jsx';
import CreatorsDashboard from './components/Pages/GettingStarted/CreatorsDashboard/CreatorsDashboard.jsx';
import ProfileInfo from './components/Pages/GettingStarted/CreatorsDashboard/ProfileInfo.jsx';
import Email from './components/Pages/GettingStarted/CreatorsDashboard/Email.jsx';
import Password from './components/Pages/GettingStarted/CreatorsDashboard/Password.jsx';
import Billing from './components/Pages/GettingStarted/CreatorsDashboard/Billing.jsx';
import MarketingResources from './components/Pages/GettingStarted/MarketingResources.jsx';
import AIAndyCoach from './components/Pages/GettingStarted/AIAndyCoach.jsx';

// Create a Course or Ebook
import CourseEbook from './components/Pages/CourseEbook/CourseEbook.jsx';
import StepByStep from './components/Pages/CourseEbook/StepByStep.jsx';
import CreateCourse from './components/Pages/CourseEbook/CreateCourse.jsx';
import CreateFiction from './components/Pages/CourseEbook/CreateFiction.jsx';
import CreateNonFiction from './components/Pages/CourseEbook/CreateNonFiction.jsx';
import DocumentUpload from './components/Pages/CourseEbook/DocumentUpload.jsx';
import FastCourseCreation from './components/Pages/CourseEbook/FastCourseCreation.jsx';

// Additional Features
import AdditionalFeatures from './components/Pages/AdditionalFeatures/AdditionalFeatures.jsx';
import EditorWindow from './components/Pages/AdditionalFeatures/EditorWindow.jsx';
import SharePreview from './components/Pages/AdditionalFeatures/SharePreview.jsx';
import AdminPanel from './components/Pages/AdditionalFeatures/AdminPanel.jsx';
import AddVideos from './components/Pages/AdditionalFeatures/AddVideos.jsx';
import AddAudiobooks from './components/Pages/AdditionalFeatures/AddAudiobooks.jsx';
import AddCoverImages from './components/Pages/AdditionalFeatures/AddCoverImages.jsx';
import CreateQuizzes from './components/Pages/AdditionalFeatures/CreateQuizzes.jsx';
import MediaManagement from './components/Pages/AdditionalFeatures/MediaManagement.jsx';
import EmailCampaigns from './components/Pages/AdditionalFeatures/EmailCampaigns.jsx';

// Customer Support
import CustomerSupport from './components/Pages/CustomerSupport/CustomerSupport.jsx';
import LogComplaint from './components/Pages/CustomerSupport/LogComplaint.jsx';
import OneOnOneCall from './components/Pages/CustomerSupport/OneOnOneCall.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Getting Started */}
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="getting-started/creators-dashboard" element={<CreatorsDashboard />} />
        <Route path="getting-started/creators-dashboard/profile-information" element={<ProfileInfo />} />
        <Route path="getting-started/creators-dashboard/email" element={<Email />} />
        <Route path="getting-started/creators-dashboard/password" element={<Password />} />
        <Route path="getting-started/creators-dashboard/billing" element={<Billing />} />
        <Route path="getting-started/marketing-resources" element={<MarketingResources />} />
        <Route path="getting-started/ai-andy-coach" element={<AIAndyCoach />} />

        {/* Create a Course or Ebook */}
        <Route path="course-ebook" element={<CourseEbook />} />
        <Route path="course-ebook/step-by-step" element={<StepByStep />} />
        <Route path="course-ebook/step-by-step/create-course" element={<CreateCourse />} />
        <Route path="course-ebook/step-by-step/create-fiction" element={<CreateFiction />} />
        <Route path="course-ebook/step-by-step/create-nonfiction" element={<CreateNonFiction />} />
        <Route path="course-ebook/document-upload" element={<DocumentUpload />} />
        <Route path="course-ebook/fast-course-creation" element={<FastCourseCreation />} />

        {/* Additional Features */}
        <Route path="additional-features" element={<AdditionalFeatures />} />
        <Route path="additional-features/editor-window" element={<EditorWindow />} />
        <Route path="additional-features/share-preview" element={<SharePreview />} />
        <Route path="additional-features/admin-panel" element={<AdminPanel />} />
        <Route path="additional-features/add-videos" element={<AddVideos />} />
        <Route path="additional-features/add-audiobooks" element={<AddAudiobooks />} />
        <Route path="additional-features/add-cover-images" element={<AddCoverImages />} />
        <Route path="additional-features/create-quizzes" element={<CreateQuizzes />} />
        <Route path="additional-features/media-management" element={<MediaManagement />} />
        <Route path="additional-features/email-campaigns" element={<EmailCampaigns />} />

        {/* Customer Support */}
        <Route path="customer-support" element={<CustomerSupport />} />
        <Route path="customer-support/log-complaint" element={<LogComplaint />} />
        <Route path="customer-support/1-on-1-call" element={<OneOnOneCall />} />
      </Route>
    </Routes>
  );
}
