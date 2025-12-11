"use client";

import { addFavoriteMoim, isFavoriteMoim, removeFavoriteMoim } from "@/utils/favorite.util";
import Image from "next/image";
import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  moimId: number;
  userId: string | null;
};

const FavoriteButton = ({ moimId, userId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const distinguishFavorite = () => {
      setIsFavorite(isFavoriteMoim(moimId, userId));
    };
    distinguishFavorite();
  }, [moimId, userId]);

  const handleFavoriteClick = () => {
    setIsFavorite((prev: boolean) => !prev);
    if (!isFavorite) {
      addFavoriteMoim(moimId, userId);
    } else {
      removeFavoriteMoim(moimId, userId);
    }
  };
  return (
    <button
      onMouseDown={handleFavoriteClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 sm:h-12 sm:w-12 md:h-15 md:w-15"
    >
      <Image
        src={isFavorite ? "/icons/full_heart.svg" : "/icons/empty_heart.svg"}
        alt={isFavorite ? "좋아요" : "좋아요 취소"}
        width={20}
        height={20}
        className={`${isFavorite && "heart-pop"} sm:h-6 sm:w-6 md:h-8 md:w-8`}
      />
    </button>
  );
};

export default FavoriteButton;
