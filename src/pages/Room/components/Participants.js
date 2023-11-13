import Participant from "./Participant";

const Participants = () => {
  return (
    <>
      <Participant
        profileImage="./img/프로필1.jpg"
        nickname="푸른고양이82"
        equipment="키보드"
        statusColor="#39d446"
      />
      <Participant
        profileImage="./img/프로필2.jpg"
        nickname="푸른길거리"
        equipment="AR Piano"
        statusColor="#FE4949"
      />
    </>
  );
};

export default Participants;
