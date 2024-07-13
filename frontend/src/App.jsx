import React, { useState } from 'react';
import axios from 'axios';
import Crud from './../component/crud';
const App = () => {
  const [values, setValues] = useState({
    name: '',
    number: '',
    address: '',  
    state: '',
    city: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  const submit = async () => {
    if (values.name === '' || values.number === '' || values.address === '' || values.state === '' || values.city === '') {
      alert('Please fill in all fields');
    } else {
      try {
        await axios.post('http://localhost:1000/api/v1/post', values);
        alert('Data saved successfully');
        setValues({
          name: '',
          number: '',
          address: '',  
          state: '',
          city: '',
        });
      } catch (error) {
        alert('Failed to save data');
        console.error(error);
      }
    }
  };

  return (
    <>
    <div className='flex justify-center items-center h-screen w-full bg-blue-900'>
      <div className='text-center p-2 box-shadow-xl rounded-lg border-2 border-white'>
        <h1 className='text-3xl text-white font-bold'>Contact Form</h1>
        <hr className='text-white font-bold' />
        <form className='grid grid-cols-2 gap-4 '>
          <div className='col-span-2'>
            <h5 className='text-white text-left pb-2'>Enter your name</h5>
            <input type="text" placeholder='Enter your name' name='name' value={values.name} onChange={change} className='p-2 border w-full outline-none'/>
          </div>
          <div className='col-span-2'>
            <h5 className='text-white text-left pb-2'>Enter your phone</h5>
            <input type="text" placeholder='Enter your phone' name='number' value={values.number} onChange={change} className='p-2 border w-full outline-none'/>
          </div>
          <div className='col-span-2'>
            <h5 className='text-white text-left pb-2'>Enter your Address</h5>
            <textarea placeholder='Enter your address' name='address' value={values.address} onChange={change} className='p-2 border w-full'></textarea>
          </div>
          <div className='col-span-2'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h5 className='text-white text-left pb-2'>State </h5>
                <input type="text" placeholder='Enter your state' name='state' value={values.state} onChange={change} className='p-2 border'/>
              </div>
              <div>
                <h5 className='text-white text-left pb-2'>City</h5>
                <input type="text" placeholder='Enter your city' name='city' value={values.city} onChange={change} className='p-2 border'/>
              </div>
              <button type="button" className='bg-blue-500 text-white p-2 rounded' onClick={submit}>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    {/* <div className='ml-5'>
      <Crud />
      
    </div> */}
    </>
  );
}

export default App;
