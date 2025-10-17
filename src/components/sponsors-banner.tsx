import React, { useState } from 'react';

export default function SponsorsBanner() {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-neutral-100 text-sm text-neutral-500">
        Sponsors banner coming soon
      </div>
    );
  }
  return (
    <img
      src="/images/sponsors-banner.png"
      alt="Sponsors"
      className="w-full h-auto"
      onError={() => setError(true)}
    />
  );
}