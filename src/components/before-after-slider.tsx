"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterProps) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-background bg-muted">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={beforeImage} alt="Before Makeup" />}
        itemTwo={<ReactCompareSliderImage src={afterImage} alt="After Makeup" />}
        style={{
          width: '100%',
          height: '100%',
        }}
        className="object-cover"
      />
    </div>
  );
}
