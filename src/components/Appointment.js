import trashIcon from "./trash-icon.svg";
import flagIcon from "./flag-icon.svg";
import { useContext } from "react";
import { AppContext } from "../App";
import { AppUpdateContext } from "../App";

import { useNavigate } from "react-router-dom";
// import EditAppointment from "../views/EditAppointment"; --------

function Appointment({ appointment }) {
  const { appointments } = useContext(AppContext)
  const { updateAppointments } = useContext(AppUpdateContext)

  const deleteAppointment = async (id) => {
    // await fetch(`http://localhost:5000/appointments/${id}`, {
    await fetch(`https://my-json-server.typicode.com/jmiguelcastellanosj/appt-mngr/appointments/${id}`, {
      method: "DELETE"
    })
    updateAppointments(appointments.filter( (appt) => appt.id !== id ))
  }


  // Cacho para editar la appointment
  // const { appToEdit } = useContext(AppContext) ---------
  const { updateAppToEdit } = useContext(AppUpdateContext)
  const navigateTo = useNavigate();
  const triggerEdit = () => {
    // console.log(appointment.id, typeof(appointment.id))
    updateAppToEdit(appointment.id)
    
    navigateTo("/ap-m/edit")
  }
  //

  return (
    <div className="apptBg apptAnim" style={{
      // background: "orange",
      margin: "5px",
      padding: "5px"
    }} onDoubleClick={triggerEdit} >
      <h3 style={titleStyle}>
        {appointment.title}{" "}
        <img id="trashIcon" src={trashIcon} alt="delete button" style={iconStyle} onClick={() => deleteAppointment(appointment.id)} />
      </h3>
      <p>{appointment.details}</p>
      <p style={bottomParagraphStyle}>
        {
          new Date(
            `${appointment.date[2]}-${appointment.date[0]}-${appointment.date[1]}`
            ).toDateString()
        }{" at "}
        {
          `${appointment.date[3]}:${appointment.date[4]}${appointment.date[5]}`
        }
        {
          appointment.important && (<img src={flagIcon} alt="important appointment icon" style={{...iconStyle, marginBottom: "10px", cursor: ""}} />)
        }
      </p>
    </div>
  );
}

const titleStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: ".4rem .4rem 0 .4rem"
}

const iconStyle = {
  display: "inline-block",
  height: "1.5rem",
  cursor: "pointer"
}

const bottomParagraphStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "'Nanum Gothic', sans-serif",
  fontSize: ".8rem",
  alignItems: "center"
}

export default Appointment;
