import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Datatable = () => {
  const [data, setData] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const docRef = doc(db, "profiles", currentUser.uid);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        //const docRef_profile = doc(db, "users", currentUser.uid);
        //const docSnap_profile = await getDoc(docRef_profile);
        console.log("Document data:", docSnap.data());
        list.push({ id: docSnap.id, ...docSnap.data()});
        //setData
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      setData(list);
    }
    fetchData()
  },[])
  console.log(data);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Profile
        <Link to="/users/new" className="link">
          Edit
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
