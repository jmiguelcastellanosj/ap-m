import { useEffect, useContext} from "react";
import { AppUpdateContext } from "../App";
import AppointmentList from "../components/AppointmentList";
import Header from "../components/Header";

function Dashboard() {
  const {updateAppointments} = useContext(AppUpdateContext)

  const fetchAppointmentList = async () => {
    const res = await fetch("http://localhost:5000/appointments");
    // const res = await fetch("https://my-json-server.typicode.com/jmiguelcastellanosj/appt-mngr/appointments");
    const data = await res.json();

    return data;
  }

  useEffect(() => {
    const getAppointments = async () => {
      const appointmentsFromServer = await fetchAppointmentList();
      updateAppointments(appointmentsFromServer);
    }

    getAppointments();
  }, []);
  
  return (
    <div style={dashboardStyle}>
      <Header />
      <AppointmentList />
    </div>
  );
}

const dashboardStyle = {
  maxWidth: "31.25rem",
  overflow: "auto",
  minHeight: "18.75rem",
  border: "1px solid steelblue",
  margin: "1.875rem auto",
  padding: ".5rem",
  boxSizing: "border-box",
}

export default Dashboard;
