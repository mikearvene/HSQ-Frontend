import React, { useEffect, useState } from "react";
import AttendanceTable from "./AttendanceTable";
import LoaderTwo from "../../Components/Subcomponents/loader/LoaderTwo";
import { mockData } from "../../mock";

//testing

const MyCalendar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/user/timesheet`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.timeSheet);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoaderTwo />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(data);

  return (
    // mockdata is the one that I used at the moment 
    <div>
      <AttendanceTable data={data} />
    </div>
  );
};

export default MyCalendar;

// export default function MyCalendar(){

//     return(
//         <>
//             <div className="p-3 mt-3" style={{borderStyle:'solid', borderColor:'#516473', borderRadius:'8px', borderWidth:'1px'}}>
//             <h6 className="text-muted">You are in the MyCalendar Page. Please work on me. Kindly refer to this figma link to see how this page is supposed to look like.</h6>
//             <a href="https://www.figma.com/file/yL80hD5gDmu7QpaXHln50L/HSQ-PORTAL?type=design&node-id=0%3A1&mode=design&t=UjTq5WUeOD8XRB1Q-1" target="_blank">Figma link</a>
//             </div>

//         </>
//     )
// }
