"use client";

import { useAuthStore } from "@/stores/auth.store";
import { addFavoriteMoim, isFavoriteMoim, removeFavoriteMoim } from "@/utils/favorite.util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FavoriteButtonProps = {
  moimId: number;
};

const FavoriteButton = ({ moimId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useAuthStore(state => state.user);
  const userId = user?.id.toString();
  const router = useRouter();

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
      toast("로그인이 필요합니다. 로그인할까요?", {
        action: {
          label: "이동",
          onClick: () => router.push("/login"),
        },
      });
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
