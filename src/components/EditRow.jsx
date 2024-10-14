import React from 'react';
import { AiOutlineSave } from "react-icons/ai";
import {FcCancel } from "react-icons/fc";

function EditRow({editFormData, handleEditFormChange,
    handleEditFormSubmit,handleCancel}) {
  return (
    <tr className='duringedit'>
    <td> <input className='input row1' type="text" 
    name='id' value={editFormData.id}
     placeholder='edit id' onChange={handleEditFormChange} /> </td>
    <td> <input className='input row2' type="text" 
    name='name' value={editFormData.name}
     placeholder='edit this name' onChange={handleEditFormChange} /> </td>
    <td> <input className='input row2' type="text"
     name='email' value={editFormData.email}
     placeholder='edit  this email' onChange={handleEditFormChange} /> </td>
    <td> <input className='input row2' type="text"
     name='role' value={editFormData.role}
     placeholder='edit this role' onChange={handleEditFormChange} /> </td>
    <td className='row1'> 
    <AiOutlineSave fontSize='20px' className='edit'
    onClick={ handleEditFormSubmit} /> 
     <FcCancel fontSize='20px' className='delr'
     onClick={handleCancel} /></td>
   </tr>

  )
}

export default EditRow;
