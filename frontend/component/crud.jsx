import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Crud = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editValues, setEditValues] = useState({
    id: '',
    name: '',
    number: '',
    address: '',  
    state: '',
    city: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/getuser");
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v1/deleteUser/${id}`);
      getData();
    } catch (error) {
      setError(error.message);
    }
  };

  const startEdit = (item) => {
    setEditValues(item);
    setIsEditing(true);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value
    });
  };

  const updateData = async (id) => {
    try {
      await axios.patch(`http://localhost:1000/api/v1/updateUser/${id}`, editValues);
      setIsEditing(false);
      setEditValues({
        id: '',
        name: '',
        number: '',
        address: '',  
        state: '',
        city: '',
      });
      getData();
    } catch (error) {
      setError(error.message);
    }
  };

  const search = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:1000/api/v1/getSingleUser/${searchTerm}`);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <form onSubmit={search} className="mb-4">
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="p-2 border mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Search</button>
      </form>
      <button onClick={getData} className="bg-blue-500 text-white p-2 rounded mb-4">Get All Users</button>
    
      {data.map((item) => (
       <div key={item._id} className="p-4  border rounded bg-white mb-4">
       <h3>Name: {item.name}</h3>
       <h3>Phone: {item.number}</h3>
       <h3>Address: {item.address}</h3>
       <h3>State: {item.state}</h3>
       <h3>City: {item.city}</h3>
       <div className="flex gap-4">
       <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={() => startEdit(item)}>Edit</button>
       <button className="bg-blue-500 text-white p-2 rounded mr-6" onClick={() => deleteData(item._id)}>Delete</button>
       </div>
       
     </div>
     
      ))}

      {isEditing && (
        <div className="p-4 border rounded bg-white mt-4">
          <h2>Edit User</h2>
          <form className='grid grid-cols-2 gap-4'>
            <div className='col-span-2'>
              <h5 className='text-left pb-2'>Enter your name</h5>
              <input type="text" placeholder='Enter your name' name='name' value={editValues.name} onChange={change} className='p-2 border w-full outline-none'/>
            </div>
            <div className='col-span-2'>
              <h5 className='text-left pb-2'>Enter your phone</h5>
              <input type="text" placeholder='Enter your phone' name='number' value={editValues.number} onChange={change} className='p-2 border w-full outline-none'/>
            </div>
            <div className='col-span-2'>
              <h5 className='text-left pb-2'>Enter your Address</h5>
              <textarea placeholder='Enter your address' name='address' value={editValues.address} onChange={change} className='p-2 border w-full'></textarea>
            </div>
            <div className='col-span-2'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h5 className='text-left pb-2'>State </h5>
                  <input type="text" placeholder='Enter your state' name='state' value={editValues.state} onChange={change} className='p-2 border'/>
                </div>
                <div>
                  <h5 className='text-left pb-2'> City</h5>
                  <input type="text" placeholder='Enter your city' name='city' value={editValues.city} onChange={change} className='p-2 border'/>
                </div>
              </div>
            </div>
            <button type="button" className='bg-blue-500 text-white p-2 rounded' onClick={() => updateData(editValues._id)}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Crud;
