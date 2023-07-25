import React, { useEffect, useState } from 'react';
import Category from './Category';
import CategoryTable from './CategoryTable';
import { getCategories } from '../../../config/AdminEndpoints';

function OtherSettings() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    async function  invoke(){
        const data=await getCategories()
        if(data){
          setCategories(data.categories);
        }
    }

    invoke();
  }, []); 

  return (
    <div>
      <div style={{ marginTop: '100px', marginLeft: '100px' }}>

        <div style={{display:"flex",justifyContent:"space-between"}}>
        <h4 style={{ marginBottom: '20px' }}>CATEGORIES</h4>
      
        <Category /> {/* add category*/}
       
        </div>

        <div>
          <CategoryTable categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default OtherSettings;
