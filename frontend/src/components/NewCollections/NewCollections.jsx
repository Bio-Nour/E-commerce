import './NewCollections.css'
// import new_collections from '../../assets/new_collections' ///commmented after endpoint  finished
import Item from '../Item/Item'
import { useEffect, useState } from 'react'

const NewCollections = () => {

  const [new_collections , setNew_collections] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/newcollections')
     .then(response => response.json())
     .then(data => setNew_collections(data))
  }, [])
  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className='new-collections-item'>
          {new_collections.map((item, index)=>{
            return <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
          })}
        </div>
      
    </div>
  )
}

export default NewCollections
