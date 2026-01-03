"use client";

import { addFavoriteMoim, isFavoriteMoim, removeFavoriteMoim } from "@/utils/favorite.util";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoginModalStore } from "@/stores/loginModal.store";
import { useUserProfileQuery } from "@/hooks/queries/useUserQuery";

type FavoriteButtonProps = {
  moimId: number;
};

const FavoriteButton = ({ moimId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { setOpen: setIsLoginModalOpen } = useLoginModalStore();
  const { data: user, isLoading, refetch } = useUserProfileQuery();

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      const distinguishFavorite = () => {
        setIsFavorite(isFavoriteMoim(moimId, userId));
      };

      distinguishFavorite();
    }
  }, [moimId, userId]);

  const handleFavoriteClick = async () => {
    const { error } = await refetch();

    const code =
      typeof error === "object" && error !== null && "code" in error
        ? (error as { code?: unknown }).code
        : undefined;

    if (code === "INVALID_TOKEN" || code === "UNAUTHORIZED") {
      setIsLoginModalOpen(true, code);
      return;
    }

    const next = !isFavorite;
    setIsFavorite(next);

    if (next) {
      addFavoriteMoim(moimId, userId);
    } else {
      removeFavoriteMoim(moimId, userId);
    }
  };

  if (isLoading)
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 sm:h-12 sm:w-12" />
    );

  return (
    <>
      <button
        onMouseDown={() => {
          void handleFavoriteClick();
        }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 hover:cursor-pointer sm:h-12 sm:w-12"
      >
        <Image
          src={isFavorite ? "/icons/favorite/full_heart.svg" : "/icons/favorite/empty_heart.svg"}
          alt={isFavorite ? "좋아요" : "좋아요 취소"}
          width={20}
          height={20}
          className={`${isFavorite && "heart-pop"} sm:h-6 sm:w-6`}
        />
      </button>
    </>
  );
};

export default FavoriteButton;
