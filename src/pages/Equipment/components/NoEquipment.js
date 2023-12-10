import Reac from "react";

const NoEquipment = () => {
  return <div><h2
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
<p
  style={{
    position: "absolute",
    left: "668px",
    top: "736px",
    fontSize: "24px",
    fontWeight: "500",
    textAlign: "left",
    color: "#000",
  }}
>
  현재 연결된 장비가 없습니다.
</p>
<img
  src="./img/연결장비없음.png"
  style={{
    width: "153px",
    height: "155px",
    position: "absolute",
    left: "418.5px",
    top: "672.5px",
    objectFit: "cover",
  }}
/></div>;
}

export default NoEquipment;