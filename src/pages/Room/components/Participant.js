const Participant = ({ profileImage, nickname, equipment, statusColor }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      <div
        style={{
          width: "400px",
          backgroundColor: "#FAFAFA",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={profileImage}
            alt="앨범 커버"
            style={{
              float: "left",
              marginRight: "20px",
              width: "80px",
              height: "80px",
              borderRadius: "15px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
          <div>
            <h3 style={{ marginTop: "10px" }}>{nickname}</h3>
            <p style={{ marginTop: "20px", color: "#BBBBBB" }}>{equipment}</p>
          </div>

          <button
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: statusColor,
              border: "none",
              borderRadius: "50%",
              marginTop: "10px",
              marginLeft: "150px",
              position: "absolute",
              top: "1px",
              left: "225px",
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Participant;
