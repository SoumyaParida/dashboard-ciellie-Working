import React from 'react'
import { useNavigate } from "react-router-dom";

const SurveyRecords = ({data}) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate('/surveys/test', { state: { id: id} });
  };
    
  return ( 


       
    <table id="datatable" class="table table-striped">
    <thead>
      <tr>
        <th>Address</th>
        <th>Propertytype</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th class="sorting_desc_disabled sorting_asc_disabled text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
    {data.map((columns) => (
      <tr>
        <td>{columns.address}</td>
        <td>{columns.propertyType}</td>
        <td>{columns.date}</td>
        <td>{columns.time}</td>
        <td>{columns.status}</td>
        <td class="text-right">
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
        <th class="disabled-sorting text-right">Actions</th>
      </tr>
    </tfoot>
  </table>

  ) 
}

export default SurveyRecords  