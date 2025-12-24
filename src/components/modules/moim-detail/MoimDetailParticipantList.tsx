"use client";
import { GetParticipantsResponse } from "@/types/moimDetail.type";
import Image from "next/image";

type MoimDetailParticipantListProps = {
  participants: GetParticipantsResponse;
};

const MoimDetailParticipantList = ({ participants }: MoimDetailParticipantListProps) => {
  const isTooMany = participants.length > 4;
  const visibleParticipants = participants.slice(0, 4);

  return (
    <div>
      <ul className="relative flex">
        {visibleParticipants.map((p, idx) => (
          <li key={p.userId} className={idx === 0 ? "" : "-ml-2.5"}>
            <div className="relative h-[29px] w-[29px] overflow-hidden rounded-full">
              <Image
                src={p.User.image ? p.User.image : "/icons/default_profile.svg"}
                alt={`${p.User.name}의 프로필사진`}
                fill
                className="object-cover"
              />
            </div>
          </li>
        ))}
        {isTooMany && (
          <div className="z-10 -ml-2.5 flex h-[29px] w-[29px] items-center justify-center rounded-full bg-white text-xs font-semibold text-gray-600">
            +{participants.length - 4}
          </div>
        )}
      </ul>
    </div>
  );
};

export default MoimDetailParticipantList;
