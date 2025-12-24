"use client";

import { useSession } from "next-auth/react";
import { addFavoriteMoim, isFavoriteMoim, removeFavoriteMoim } from "@/utils/favorite.util";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoginModalStore } from "@/stores/loginModal.store";
import { useUserProfileQuery } from "@/hooks/useUserQuery";

type FavoriteButtonProps = {
  moimId: number;
};

const FavoriteButton = ({ moimId }: FavoriteButtonProps) => {
  const { status } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const { setOpen: setIsLoginModalOpen } = useLoginModalStore();
  const { data: user, isLoading } = useUserProfileQuery(status === "authenticated");

  const userId = user?.id;

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
      setIsLoginModalOpen(true);
      return;
    }

    const next = !isFavorite;
    setIsFavorite(next);
    // 렌더링 중 다른 컴포넌트 업데이트 방지
    setTimeout(() => {
      if (next) {
        addFavoriteMoim(moimId, userId);
      } else {
        removeFavoriteMoim(moimId, userId);
      }
    }, 0);
  };

  if (isLoading)
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 sm:h-12 sm:w-12" />
    );

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
    </>
  );
};

export default FavoriteButton;
