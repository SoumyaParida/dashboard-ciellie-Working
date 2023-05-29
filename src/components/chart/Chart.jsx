import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import moment from 'moment';

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Chart = ({ aspect, title }) => {
  const [jan, setJan] = useState([]);
  const [feb, setFeb] = useState([]);
  const [mar, setMar] = useState([]);
  const [apr, setApr] = useState([]);
  const [may, setMay] = useState([]);
  const [jun, setJun] = useState([]);
  const [jul, setJul] = useState([]);
  const [aug, setAug] = useState([]);
  const [sep, setSep] = useState([]);
  const [oct, setOct] = useState([]);
  const [nov, setNov] = useState([]);
  const [dec, setDec] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // access the db collection
    
    var counterJan = 0;
    var counterFeb = 0;
    var counterMar = 0;
    var counterApr = 0;
    var counterMay = 0;
    var counterJun = 0;
    var counterJul = 0;
    var counterAug = 0;
    var counterSep = 0;
    var counterOct = 0;
    var counterNov = 0;
    var counterDec = 0;

    const fetchData = async() =>{
      //console.log("currentUser.uid" + currentUser.uid);
      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "scheduled"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        if ((doc.data().date > moment().month("January").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("January").endOf('month').format('YYYY-MM-DD'))){
          counterJan = counterJan + 1;
        } else if ((doc.data().date > moment().month("February").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("February").endOf('month').format('YYYY-MM-DD'))){
          counterFeb = counterFeb + 1 ;
        } else if ((doc.data().date > moment().month("March").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("March").endOf('month').format('YYYY-MM-DD'))){
          counterMar = counterMar + 1 ;
        } else if ((doc.data().date > moment().month("April").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("April").endOf('month').format('YYYY-MM-DD'))){
          counterApr = counterApr + 1 ;
        } else if ((doc.data().date > moment().month("May").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("May").endOf('month').format('YYYY-MM-DD'))){
          counterMay = counterMay + 1 ;
        } else if ((doc.data().date > moment().month("June").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("June").endOf('month').format('YYYY-MM-DD'))){
          counterJun = counterJun + 1 ;
        } else if ((doc.data().date > moment().month("July").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("July").endOf('month').format('YYYY-MM-DD'))){
          counterJul = counterJul + 1 ;
        } else if ((doc.data().date > moment().month("August").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("August").endOf('month').format('YYYY-MM-DD'))){
          counterAug = counterAug + 1 ;
        } else if ((doc.data().date > moment().month("September").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("September").endOf('month').format('YYYY-MM-DD'))){
          counterSep = counterSep + 1 ;
        } else if ((doc.data().date > moment().month("October").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("October").endOf('month').format('YYYY-MM-DD'))){
          counterOct = counterOct + 1 ;
        } else if ((doc.data().date > moment().month("November").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("November").endOf('month').format('YYYY-MM-DD'))){
          counterNov = counterNov + 1 ;
        } else if ((doc.data().date > moment().month("December").startOf('month').format('YYYY-MM-DD')) && (doc.data().date < moment().month("December").endOf('month').format('YYYY-MM-DD'))){
          counterDec = counterDec + 1 ;
        }
        
      });
      setJan(counterJan);
      setFeb(counterFeb);
      setMar(counterMar);
      setApr(counterApr);
      setMay(counterMay);
      setJun(counterJun);
      setJul(counterJul);
      setAug(counterAug);
      setSep(counterSep);
      setOct(counterOct);
      setNov(counterNov);
      setDec(counterDec);
    }
    fetchData()
  });

  const data = [
    { name: "January", Total: jan },
    { name: "February", Total: feb },
    { name: "March", Total: mar },
    { name: "April", Total: apr },
    { name: "May", Total: may },
    { name: "June", Total: jun },
    { name: "July", Total: jul },
    { name: "Augest", Total: aug },
    { name: "September", Total: sep },
    { name: "October", Total: oct },
    { name: "November", Total: nov },
    { name: "December", Total: dec },
  ];

  return (
    <div className="card card-chart">
              <div className="card-header">
                <div className="row">
                  <div className="col-sm-6 text-left">
                    <h5 className="card-category">Total Sites Completed</h5>
                    <h2 className="card-title">Sites Surveyed</h2>
                  </div>
               
                </div>
              </div>
              <div className="card-body">
                <div className="chart-area">
                 
                <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }
        }
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e14eca" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#e14eca" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />

          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#e14eca"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
              </div>
            </div>
          </div>
    
  );
};

export default Chart;
