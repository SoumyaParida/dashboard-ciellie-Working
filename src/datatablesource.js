export const userColumns = [
  { field: "id", headerName: "ID", width: 350 },
  {
    field: "user",
    headerName: "User",
    width: 70,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 100,
  },

  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
];

export const surveyColumns = [
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
          </div>
        
        );
      }
    },
  { field: "id", headerName: "ID", width: 350 },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "propertyType",
    headerName: "PropertyType",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "time",
    headerName: "Time",
    width: 100,
  },
  
  {
    field: "message",
    headerName: "Message",
    width: 300,
  }
];
