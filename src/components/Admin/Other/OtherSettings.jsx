import React, { useEffect, useState } from 'react';
import Category from './Category';
import axios from 'axios';
import { adminApi } from '../../../store/Api';
import CategoryTable from './CategoryTable';

function OtherSettings() {
  // const [editedName, setEditedName] = useState('');
  const [categories, setCategories] = useState([]);
  // const [editing, setEditing] = useState(false);

  // const handleEdit = () => {
  //   setEditing(true);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${adminApi}get-categories`, {
          withCredentials: true,
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <div style={{ marginTop: '100px', marginLeft: '100px' }}>

        <div style={{display:"flex",justifyContent:"space-between"}}>
        <h4 style={{ marginBottom: '20px' }}>CATEGORIES</h4>
        <Category />
        </div>

        <div>

       
          <CategoryTable categories={categories} />
         
        

        </div>
      </div>
    </div>
  );
}

export default OtherSettings;
