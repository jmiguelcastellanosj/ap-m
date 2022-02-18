import { createContext, useState } from "react";
import Dashboard from "./views/Dashboard";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddAppointmentForm from "./views/AddAppointmentForm";
import EditAppointment from "./views/EditAppointment";

export const AppContext = createContext();
export const AppUpdateContext = createContext();

function App() {
  const [appointments, setAppointments] = useState([])
  const updateAppointments = (apptList) => {
    setAppointments(apptList)
  }

  const [appToEdit, setAppToEdit] = useState(0)
  const updateAppToEdit = (appId) => {
    setAppToEdit(appId)
  }
  
  return (
    <div style={sutairu}>
      <AppContext.Provider value={{ appointments, appToEdit }}>
        <AppUpdateContext.Provider value={{ updateAppointments, updateAppToEdit }}>
          <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<AddAppointmentForm />} />
                <Route path="/edit" element={<EditAppointment />} />
            </Routes>
          </Router>
        </AppUpdateContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

const sutairu = {
  // backgroundColor: "#000000"

}

export default App;
