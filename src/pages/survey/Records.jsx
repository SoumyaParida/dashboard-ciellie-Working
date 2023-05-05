import React from 'react'
import { useNavigate } from "react-router-dom";

const Records = ({data}) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate('/surveys/view', { state: { id: id} });
  };
    
  return ( 


       
    <table id="datatable" className="table table-striped">
    <thead>
      <tr>
        <th>Address</th>
        <th>Propertytype</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th className="sorting_desc_disabled sorting_asc_disabled text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
    {data.map((columns) => (
      <tr key={columns.id}>
        <td>{columns.address}</td>
        <td>{columns.propertyType}</td>
        <td>{columns.date}</td>
        <td>{columns.time}</td>
        <td>{columns.status}</td>
        <td className="text-right">
          <button onClick={() => handleView(columns.id)}>View</button>
          
        </td>
      </tr>
    ))}
    </tbody>
    <tfoot>
      <tr>
        <th>Address</th>
        <th>Propertytype</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th className="disabled-sorting text-right">Actions</th>
      </tr>
    </tfoot>
  </table>

  ) 
}

export default Records  