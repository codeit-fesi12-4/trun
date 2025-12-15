"use client";

import { useAuthStore } from "@/stores/auth.store";
import { addFavoriteMoim, isFavoriteMoim, removeFavoriteMoim } from "@/utils/favorite.util";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConfirmationJoinModal from "@/components/modules/moim-detail/ConfirmationJoinModal";

type FavoriteButtonProps = {
  moimId: number;
};

const FavoriteButton = ({ moimId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);

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
    if (!userId) {
      setOpen(true);
      return;
    }

    setIsFavorite((prev: boolean) => {
      const next = !prev;
      if (next) {
        addFavoriteMoim(moimId, userId);
      } else {
        removeFavoriteMoim(moimId, userId);
      }
      return next;
    });
  };
  return (
    <>
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
      <ConfirmationJoinModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default FavoriteButton;
