import Reac from "react";

const ConnectKeyboard = () => {
  return (
    <div>
      <h2
        style={{
          marginLeft: "360px",
          marginTop: "50px",
          fontSize: "24px",
        }}
      >
        현재 연결된 장비
      </h2>
      <div
        style={{
          width: "892px",
          height: "280px",
          position: "absolute",
          left: "359.5px",
          top: "609.5px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
        }}
      ></div>
      <img
        src="../img/장비_키보드.png"
        style={{
          width: "168px",
          height: "121px",
          position: "absolute",
          left: "443.5px",
          top: "689.5px",
          objectFit: "cover",
        }}
      />
      <p
        style={{
          position: "absolute",
          left: "700px",
          top: "736px",
          fontSize: "24px",
          fontWeight: "500",
          textAlign: "left",
          color: "#000",
        }}
      >
        키보드가 연결되었습니다.
      </p>
    </div>
  );
};

export default ConnectKeyboard;
