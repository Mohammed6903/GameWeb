'use client';

import React, { useEffect } from 'react';

interface GamePageAdProps {
  adSlot: string;
  adFormat: string;
  dataFullWidthResponsive: boolean;
  className?: string;
}

export const GamePageAd: React.FC<GamePageAdProps> = ({
  adSlot,
  adFormat,
  dataFullWidthResponsive,
  className = '',
}) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error('Ad loading error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4863652914816266"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
};