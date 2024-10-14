import React from 'react'
import {AiOutlineDelete} from "react-icons/ai"
import { FaEdit} from "react-icons/fa";

function ReadOnlyRow({contact ,editThisRow,handleDeleteClick,selectRow}) {
  return (
    <tr key={contact.id} className='body_row'>
    <td className='a hello '>{contact.id}
   <input onClick={()=>{selectRow(contact.id)}} className='box'
    type="checkbox" name="check"/>
   </td>
   <td className='b hello'>{contact.name}</td>
   <td className='b hello'> {contact.email} </td>
   <td className='e hello'>{contact.role}</td>
   <td className='c hello'>
    <FaEdit className="edit" onClick={(e)=>{editThisRow(e,contact)}} />
 <AiOutlineDelete  className="delr" 
 onClick={(e)=>handleDeleteClick(contact.id)}/>
    </td>
    </tr>
  )
}

export default ReadOnlyRow;
