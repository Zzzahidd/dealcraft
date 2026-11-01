import React, { useState } from 'react';

export default function InteractiveProjectList() {
  const [height, setHeight] = useState(385);

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
      src="/components/project-tasks.html"
      onLoad={handleLoad}
      style={{ height: `${height}px` }}
      className="w-full rounded-none border border-neutral-800 shadow-2xl bg-[#141413] transition-[height] duration-150"
      title="Interactive Project Tasks"
    />
  );
}
