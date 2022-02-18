import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../App";
import { AppUpdateContext } from "../App";

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


function EditAppointment() {
  const leadingZeros = (num) => {
    return num <= 9 ? "0"+num : num;
  }

  const { appointments } = useContext(AppContext)
  const {updateAppointments} = useContext(AppUpdateContext)

  const { appToEdit } = useContext(AppContext)
  const { updateAppToEdit } = useContext(AppUpdateContext)

  // console.log(appToEdit, typeof(appToEdit),"it works!!!")

  //fetch appointment (SINGULAR)
  const fetchAppointment = async (id) => {
    // const res = await fetch(`http://localhost:5000/appointments/${id}`);
    const res = await fetch(`https://my-json-server.typicode.com/jmiguelcastellanosj/ap-m/appointments/${id}`);
    const data = await res.json();

    return data;
  }

  ///////////////
  // let appointmentData
  // fetch(`http://localhost:5000/appointments/${appToEdit}`)
  // .then(res => res.json())
  // .then(data => {
  //   console.log("data", data)
  //   appointmentData = data
  //   console.log("appointmentData", appointmentData)
  //   setTitle(appointmentData.title)
  // })
  ///////////////

  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [important, setImportant] = useState(false)
  
  const [cal, setCal] = useState(new Date())
  const [hr, setHr] = useState("01")
  const [mn, setMn] = useState("00")
  const [ampm, setAmpm] = useState("am")

  useEffect(() => {
    (async function fetchStuff() {
      // const res = await fetch(`http://localhost:5000/appointments/${appToEdit}`)
      const res = await fetch(`https://my-json-server.typicode.com/jmiguelcastellanosj/ap-m/appointments/${appToEdit}`)
      const data = await res.json()
      // console.log("fetchStuff",data)
      // console.log(data.date[0], data.date[1], data.date[2]) //m d a
      // console.log(new Date(`${data.date[0]}-${data.date[1]}-${data.date[2]}`).toDateString())
  
      setTitle(data.title)
      setDetails(data.details)
      setImportant(data.important)
      setCal(new Date(`${data.date[0]}-${data.date[1]}-${data.date[2]}`))
      setHr(data.date[3])
      setMn(data.date[4])
      setAmpm(data.date[5])
    })()
  }, [])
  
  const updateAppt = async (appt) => {
    // await fetch(`http://localhost:5000/appointments/${appToEdit}`,
    await fetch(`https://my-json-server.typicode.com/jmiguelcastellanosj/ap-m/appointments/${appToEdit}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(appt)
      }
    )
  }

  const navigateTo = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault()
    if(!title) {
      alert("An appointment must have at least a title")
      return;
    }

    updateAppt({title, details, important, "date":
    [
      cal.getMonth()+1,
      cal.getDate(),
      cal.getFullYear(),
      hr,mn,ampm
    ]})

    navigateTo("/")
  }
  
  return (
    <div className="apptBg" style={formStyle}>
      <header style={headerStyle}>
          <h2>edit appointment form</h2>
          <Link to="/" style={{textDecoration: "none", color: "lightgray"}}><div className={"textAnim"}>cancel</div></Link>
      </header>
      
      <form onSubmit={onSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" placeholder="Appointment title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          <label>Details: </label>
          <input type="text" placeholder="Details" value={details} onChange={(event) => setDetails(event.target.value)} />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Calendar onClickDay={setCal} value={cal} />
        </div>

        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} >
          <div style={{ flexBasis: "40%" }} >
            <label>hour: </label>
            <input type="number" placeholder="hh" min="1" max="12" onChange={(event) => setHr(leadingZeros(event.target.value))} />
          </div>
          <div style={{ flexBasis: "40%" }}>
            <label>minute: </label>
            <input type="number" placeholder="mm" min="00" max="59" onChange={(event) => setMn(leadingZeros(event.target.value))} />
          </div>

          <div style={{ flexBasis: "20%" }}>
            <div>
              <label htmlFor="am">am: </label>
              <input type="radio" value="am" id="am" onChange={ (event) => { setAmpm(event.target.value) } } name="ampm" />
            </div>
            <div>
              <label htmlFor="pm">pm: </label>
              <input type="radio" value="pm" id="pm" onChange={ (event) => { setAmpm(event.target.value) } } name="ampm" />
            </div>
          </div>
        </div>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <label>Mark as important: </label>
            <input type="checkbox" checked={important} onChange={event => setImportant(event.currentTarget.checked)} />
          </div>
          <input type="submit" value="Apply change" />

      </form>

      <br /><hr /><br />
      <p>{title}</p>
      <p>{details}</p>
      <p>{important.toString()}</p>
      <p>{cal.toDateString()}</p>
      <p>{hr}{":"}{mn}{ampm}</p>
    </div>
  )
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "black",
  padding: "5px 30px",
  color: "white",
  textDecoration: "none"
}

const formStyle = {
  maxWidth: "31.25rem",
  overflow: "auto",
  minHeight: "18.75rem",
  border: "1px solid steelblue",
  margin: "1.875rem auto",
  padding: ".5rem",
  boxSizing: "border-box",
  backgroundColor: "orange"
}

export default EditAppointment