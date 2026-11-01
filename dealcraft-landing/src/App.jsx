import React from 'react';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SpekFeaturesSection from './components/SpekFeaturesSection';
import TableAndDrawerSection from './components/TableAndDrawerSection';
import ProjectListSection from './components/ProjectListSection';
import MembersDirectorySection from './components/MembersDirectorySection';
import TeamDashboardSection from './components/TeamDashboardSection';
import ArchitectureSection from './components/ArchitectureSection';
import SpekCaseStudySection from './components/SpekCaseStudySection';
import FooterSection from './components/FooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* 1. Top Announcement Bar & Clean White Navbar (Black CTA button) */}
      <TopNav />

      {/* 2. Hero Section: Editorial Serif Headline, 1080p Desktop Video, Logo Cloud */}
      <Hero />

      {/* 3. The Problem Section: Pure White Canvas, Two-Tone Editorial Serif, Architectural Wireframe Cards */}
      <ProblemSection />

      {/* 4. Spek Line-Box Features: Interactive Timeline & Calendar */}
      <SpekFeaturesSection />

      {/* 5. Authentic Component 07 & 08: Table Spreadsheet Grid & Task Details Drawer & Kanban Board */}
      <TableAndDrawerSection />

      {/* 6. Authentic Component 04: Project Tasks List View */}
      <ProjectListSection />

      {/* 7. Authentic Component 05: Members & Teams Directory */}
      <MembersDirectorySection />

      {/* 8. Authentic Component 06: Team Detail Dashboard */}
      <TeamDashboardSection />

      {/* 9. Local-First NVMe & SQLite Benchmark Section */}
      <ArchitectureSection />

      {/* 10. Spek-Style Case Study Grid */}
      <SpekCaseStudySection />

      {/* 11. Agency Footer */}
      <FooterSection />
    </div>
  );
}
