import React, { useState } from 'react';

export default function InteractiveTeamDashboard() {
  const [height, setHeight] = useState(520);

  const handleLoad = (e) => {
    try {
      const doc = e.target.contentWindow?.document;
      if (doc) {
        const page = doc.querySelector('.page');
        const h = page ? page.getBoundingClientRect().height : doc.body.scrollHeight;
        if (h > 100) setHeight(Math.ceil(h));
      }
    } catch (_) {}
  };

  return (
    <iframe
      src="/components/team-detail.html"
      onLoad={handleLoad}
      style={{ height: `${height}px` }}
      className="w-full rounded-none border border-neutral-800 shadow-2xl bg-[#141413] transition-[height] duration-150"
      title="Interactive Team Dashboard"
    />
  );
}
