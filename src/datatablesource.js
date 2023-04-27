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
    width: 250,
    renderCell: (params) => {
      return (
        
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
          </div>
        
        );
      }
    },
  { field: "address", headerName: "Address", width: 350 },
  
];
