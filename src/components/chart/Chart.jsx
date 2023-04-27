import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import moment from 'moment';

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

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

  const { currentUser, dispatch } = useContext(AuthContext);

  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
    
  console.log("startOfMonth", startOfMonth);
  console.log("endOfMonth", endOfMonth);

  

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
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "scheduled"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if ((doc.data().date > "2023-01-01") && (doc.data().date < "2023-01-31")){
          counterJan = counterJan + 1;
        } else if ((doc.data().date > "2023-02-01") && (doc.data().date < "2023-02-28")){
          counterFeb = counterFeb + 1 ;
        } else if ((doc.data().date > "2023-03-01") && (doc.data().date < "2023-03-31")){
          counterMar = counterMar + 1 ;
        } else if ((doc.data().date > "2023-04-01") && (doc.data().date < "2023-04-30")){
          counterApr = counterApr + 1 ;
        } else if ((doc.data().date > "2023-05-01") && (doc.data().date < "2023-05-31")){
          counterMay = counterMay + 1 ;
        } else if ((doc.data().date > "2023-06-01") && (doc.data().date < "2023-06-30")){
          counterJun = counterJun + 1 ;
        } else if ((doc.data().date > "2023-07-01") && (doc.data().date < "2023-07-31")){
          counterJul = counterJul + 1 ;
        } else if ((doc.data().date > "2023-08-01") && (doc.data().date < "2023-08-31")){
          counterAug = counterAug + 1 ;
        } else if ((doc.data().date > "2023-09-01") && (doc.data().date < "2023-09-30")){
          counterSep = counterSep + 1 ;
        } else if ((doc.data().date > "2023-10-01") && (doc.data().date < "2023-10-31")){
          counterOct = counterOct + 1 ;
        } else if ((doc.data().date > "2023-11-01") && (doc.data().date < "2023-11-30")){
          counterNov = counterNov + 1 ;
        } else if ((doc.data().date > "2023-12-01") && (doc.data().date < "2023-12-31")){
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
  },[])

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
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
