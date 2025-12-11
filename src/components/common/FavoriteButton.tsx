"use client";

import { useAuthStore } from "@/stores/auth.store";
import { addFavoriteMoim, isFavoriteMoim, removeFavoriteMoim } from "@/utils/favorite.util";
import Image from "next/image";
import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  moimId: number;
};

const FavoriteButton = ({ moimId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useAuthStore(state => state.user);
  const userId = user?.id.toString();

  useEffect(() => {
    if (userId) {
      const distinguishFavorite = () => {
        setIsFavorite(isFavoriteMoim(moimId, userId));
      };

      distinguishFavorite();
    }
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
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 sm:h-12 sm:w-12"
    >
      <Image
        src={isFavorite ? "/icons/full_heart.svg" : "/icons/empty_heart.svg"}
        alt={isFavorite ? "좋아요" : "좋아요 취소"}
        width={20}
        height={20}
        className={`${isFavorite && "heart-pop"} sm:h-6 sm:w-6`}
      />
    </button>
  );
};

export default FavoriteButton;
