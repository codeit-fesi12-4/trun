import { PARTICIPANTS } from "@/constants/moimFakeData";
import Image from "next/image";

const MoimDetailParticipantList = () => {
  const participants = PARTICIPANTS;
  const isTooMany = participants.length > 4;

  const visibleParticipants = participants.slice(0, 4);

  return (
    <div>
      <ul className="relative flex">
        {visibleParticipants.map((p, idx) => (
          <li key={p.userId} className={idx === 0 ? "" : "-ml-2.5"}>
            <div className="h-[29px] w-[29px] overflow-hidden rounded-full">
              <Image
                src={p.User.image}
                alt={`${p.User.name}의 프로필사진`}
                width={29}
                height={29}
              />
            </div>
          </li>
        ))}
        {isTooMany && (
          <div className="-ml-2.5 flex h-[29px] w-[29px] items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-800">
            +{participants.length - 4}
          </div>
        )}
      </ul>
    </div>
  );
};

export default MoimDetailParticipantList;
