import React, { useState, useEffect } from 'react';
import './App.css';
import fetchData from './apiService';
import Pagination from './Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchDataWithPagination = async (page) => {
    try {
      const result = await fetchData(page);
      console.log('API Response:', result);

      if (result && result.data && Array.isArray(result.data)) {
        setData(result.data);
      }

      if (result && result.total_pages) {
        setTotalPages(result.total_pages);
      }

      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataWithPagination(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    fetchDataWithPagination(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">API Pagination </h1>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;





