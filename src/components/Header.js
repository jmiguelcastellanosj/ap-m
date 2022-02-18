import Button from "./Button";
import icon from "./appointment-icon.svg";
import { useNavigate } from "react-router-dom";
// import { AppContext } from "../App";
// import AddAppointmentForm from "../views/AddAppointmentForm";

function Header() {
  const navigateTo = useNavigate();
  const onClick = () => {
    
    navigateTo("/ap-m/add")
  }
  
  return (
    <>
    <header style={headerStyle}>
      <img src={icon} alt="date icon" style={iconStyle} />
      <h1>Appointment Manager</h1>
    </header>
    <Button text={"Add appointment"} onClick={onClick} />
    </>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  // backgroundColor: "pink",
  backgroundColor: "#F7360C",
  alignItems: "center",
  padding: "5px 30px"
}

const iconStyle = {
  display: "inline-block",
  height: "2.5rem"
}

export default Header;
