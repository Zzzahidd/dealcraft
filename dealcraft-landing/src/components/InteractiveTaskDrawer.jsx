import React, { useState } from 'react';

export default function InteractiveTaskDrawer() {
  const [height, setHeight] = useState(640);

  const handleLoad = (e) => {
    try {
      const doc = e.target.contentWindow?.document;
      if (doc) {
        const wrap = doc.querySelector('.drawer-preview-wrap') || doc.querySelector('.drawer') || doc.querySelector('.page');
        const h = wrap ? wrap.getBoundingClientRect().height : doc.body.scrollHeight;
        if (h > 100) setHeight(Math.ceil(h));
      }
    } catch (_) {}
  };

  return (
    <iframe
      src="/components/task-drawer.html"
      onLoad={handleLoad}
      style={{ height: `${height}px` }}
      className="w-full rounded-none border border-neutral-800 shadow-2xl bg-[#141413] transition-[height] duration-150"
      title="Interactive Task Details Drawer"
    />
  );
}
