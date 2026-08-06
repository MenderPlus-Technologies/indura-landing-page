"use client";

import Image from "next/image";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";

const INDURA_LOGO =
  "https://res.cloudinary.com/dcxdrsgjs/image/upload/v1762925839/Group_phh0r8.svg";

interface CampaignCoverImageProps {
  title: string;
  coverImage?: string | null;
}

export function CampaignCoverImage({
  title,
  coverImage,
}: CampaignCoverImageProps) {
  const [imageError, setImageError] = useState(false);
  const hasCoverImage = Boolean(coverImage) && !imageError;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7fffd] sm:aspect-[16/9]">
      {hasCoverImage ? (
        <Image
          src={coverImage!}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 720px"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-linear-to-br from-[#e6f7f5] via-[#f7fffd] to-[#dff5f1] px-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm sm:h-24 sm:w-24">
            <Image
              src={INDURA_LOGO}
              alt="Indura"
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-[#666d80]">
            <HeartHandshake className="h-4 w-4 text-[#009688]" />
            <span>Fund Me campaign</span>
          </div>
        </div>
      )}
    </div>
  );
}
