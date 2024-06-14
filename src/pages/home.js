import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/home-data')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.city.toLowerCase() === searchQuery.toLowerCase());
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand mx-auto" href="#">MSME DOST</a>
      </nav>
      <div className="container mt-5">
        <h1 className="text-center mb-4">OUR Listings</h1>
        <div className="d-flex justify-content-center mb-4">
          <input 
            type="text" 
            placeholder="Enter city" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="form-control w-50"
          />
          <button onClick={handleSearch} className="btn btn-primary ml-2">
            Search
          </button>
        </div>
        <div className="row">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card h-100">
                  <img 
                    src={`http://localhost:2000/${item.logo}`} 
                    className="card-img-top" 
                    alt="Logo" 
                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                  />
                  <div className="card-body" style={{ backgroundColor: '#e9ecef' }}>
                    <h5 className="card-title">{item.businessName.toUpperCase()}</h5>
                    <p className="card-text">Discount available: {item.disc} %</p>
                    {item.desc && (
  <p className="card-text">
    <span style={{ color: 'red' }}>*{item.desc}</span>
  </p>
)}
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Category: {item.category}</li>
                    <li className="list-group-item">City: {item.city}</li>
                    <li className="list-group-item">Owner name: {item.name}</li>
                  </ul>
                  <div className="card-body">
                    <a href={item.link} className="btn btn-primary">Website</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h3>No result found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
