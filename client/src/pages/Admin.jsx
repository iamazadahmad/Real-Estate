import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('/api/consult');
        setConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };

    fetchConsultations();
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '18px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }} className='text-slate-700 font-bold  lg:text-2xl text-center'>Consultations</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Mobile</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Time</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => {
            const createdAt = new Date(consultation.createdAt);
            return (
              <tr key={consultation._id}>
                <td style={tdStyle}>{consultation.name}</td>
                <td style={tdStyle}>{consultation.address}</td>
                <td style={tdStyle}>{consultation.email}</td>
                <td style={tdStyle}>{consultation.mobile}</td>
                <td style={tdStyle}>{createdAt.toLocaleDateString()}</td>
                <td style={tdStyle}>{createdAt.toLocaleTimeString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
