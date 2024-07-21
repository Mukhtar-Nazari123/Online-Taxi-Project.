import React from 'react';
import "./passengers.css";
import SearchBar from './SearchBar';

function Passengers() {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row g-3 my-2'>
          <div className='col-xl-3 col-md-6 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-3'>500</h3>
                <p className='fs-5'>Passengers</p>
              </div>
              <i className='bi bi-people p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-xl-3 col-md-6 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-3'>500</h3>
                <p className='fs-5'>Passengers</p>
              </div>
              <i className='bi bi-people p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-xl-3 col-md-6 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-3'>10%</h3>
                <p className='fs-5'>Increase</p>
              </div>
              <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-xl-3 col-md-6 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-3'>500</h3>
                <p className='fs-5'>Passengers</p>
              </div>
              <i className='bi bi-people p-3 fs-1'></i>
            </div>
          </div>
        </div>
      </div>

      <div>
      <div className='container-fluid'>
      <SearchBar/>
      </div>
      <div className='container-fluid'>
      <div className="table-responsive">
      <table className="passengerTable table caption-top table-hover fs-4">
        <caption className='text-white fs-3'>Passengers</caption>
        <thead>
          <tr>  
            <th className='th' scope="col">Id</th>
            <th className='th' scope="col">First</th>
            <th className='th' scope="col">Last</th>
            <th className='th' scope="col">Username</th>
            <th className='th' scope="col">Email</th>
            <th className='th' scope="col">Phone</th>
            <th className='update' scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>aliAhmad123</td>
            <td>qwerrrrrrr@gmail.com</td>
            <td>0778765987</td>
            <td className='d-flex justify-content-center'>
              <button className='btn btn-success me-1' type='button'>Edit</button>
              <button className='btn btn-danger' type='button'>Delete</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>aliAhmad123</td>
            <td>qwerrtffrrt@gmail.com</td>
            <td>0778765987</td>
            <td className='d-flex justify-content-center'>
              <button className='btn btn-success me-1' type='button'>Edit</button>
              <button className='btn btn-danger' type='button'>Delete</button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>gater</td>
            <td>aliAhmad123</td>
            <td>qwerrtdfrer@gmail.com</td>
            <td>0778765987</td>
            <td className='d-flex justify-content-center'>
              <button className='btn btn-success me-1' type='button'>Edit</button>
              <button className='btn btn-danger' type='button'>Delete</button>
            </td>
          </tr>
         </tbody>
        </table>
      </div>
      </div>
      </div>

    </div>
  )
}

export default Passengers