"use client";

import { ComingSoon, PageHeader } from "@/components/ui";

export default function SocialPublishingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Publishing"
        title="Connect Instagram, Facebook, TikTok"
        description="Out of scope for this scaffold. You’ll review in Hearth first, then push — never the other way around."
      />
      <ComingSoon
        title="No live posting in Phase 1"
        description="We stored PUBLISHED as a content status for copy only. There are no tokens, no schedulers, and no surprise posts."
      />
    </div>
  );
}
