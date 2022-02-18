import Appointment from "./Appointment";
import { AppContext } from "../App";
import { useContext } from "react";

function AppointmentList() {

  const {appointments} = useContext(AppContext)

  return appointments.map(appt => (
          <Appointment key={appt.id} appointment={appt} />     
  ));
}

export default AppointmentList;
