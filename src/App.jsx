import './App.css';
import React, {useState,Fragment} from 'react';
import {AiOutlineDoubleLeft,AiOutlineDoubleRight ,
AiOutlineLeft,AiOutlineRight} from "react-icons/ai";
import Post from './AdminUi.json';
import EditRow from './components/EditRow';
import ReadOnlyRow from './components/ReadOnlyRow';


function App() {
  const[search,setSearch] = useState("");
const[page,setPage] = useState(0);
const[editContactId,setEditContactId] = useState(null);
const[contacts,setContacts] = useState(Post);
const[addUser,setAddUser] = useState({id:"",name:"",email:"",role:"" });
const[editFormData,setEditFormData] = useState({id:"",name:"",email:"",role:"" });
const index =[];
const {id,name,email,role} =addUser;

var a = +page;
let b= (+a + 10);

//add data
const addUserData =(e)=>{
  e.preventDefault();
  const fieldName =e.target.getAttribute('name');
  const fieldValue =e.target.value;
  const newUser ={...addUser};
  newUser[fieldName] =fieldValue;
  setAddUser(newUser);
}

//submit add  data
const submitUserData =(e)=>{
e.preventDefault();
 if(addUser.id !=='' && addUser.name!==""&& addUser.email!=="" && addUser.role !=="" ){
  const newContact ={
    id: addUser.id,
    name: addUser.name,
    email:addUser.email,
    role: addUser.role
  };
const newContacts =[...contacts,newContact];
setContacts(newContacts);
setAddUser({id:"",name:"",email:"",role:"" });
 }else{
  alert("fields can't be empty");
 }
}

  //edit this  row
  const editThisRow =(e,contact)=>{
    e.preventDefault();
   setEditContactId(contact.id)

   const fromValues ={
    id: contact.id,
    name: contact.name,
    email: contact.email,
    role: contact.role
   }
   setEditFormData(fromValues);
  }

  //handle edit row data
  const handleEditFormChange = (e,contact)=>{
    e.preventDefault();

  const fieldName =e.target.getAttribute('name');
  const fieldValue =e.target.value;

  const newFormData = {...editFormData};
  newFormData[fieldName] =fieldValue;

  setEditFormData(newFormData);

  }

// handle edit form data
const handleEditFormSubmit  =(e)=>{
  e.preventDefault();

  const editedContact ={
    id:editFormData.id,
    name: editFormData.name,
    email:editFormData.email,
    role:editFormData.role,
  }
   const newContacts =[...contacts];
   const index = contacts.findIndex((contact)=>
     (contact.id === editContactId)
   )
   newContacts[index] = editedContact;
   setContacts(newContacts);
   setEditContactId(null);
}

// cancel edit
const handleCancel =()=>{
  setEditContactId(null);
}

//delete this row
const handleDeleteClick =(contactId)=>{
  alert("are you sure?");
  const newContacts =[...contacts];
  const index = contacts.findIndex((contact)=>
  contact.id === contactId );
  newContacts.splice(index,1);
  setContacts(newContacts);
  
}

//previous page
const previousPage =()=>{
  if(a !==0){
    a=a-10;
  setPage(a);
  }
}

//next page
const nextPage =()=>{
  if(a !== 40){
    a=a+10;
    setPage(a);
  }
}

   //select row
   const selectRow = (contactId)=>{
   const idx = contacts.findIndex((contact)=>
  contact.id === contactId )
  if(!index.includes(idx)){
  index.push(idx);
  index.sort();
  }
  }

//delete all selected row
const deleteSelectedRow =()=>{
alert("are you sure?")
  const newContacts =[...contacts];
  if(index.length !==0){
  for(let i=0;i<index.length;i++){
    newContacts.splice(index[i]-i,1);
   setContacts(newContacts);
  } }else{
    alert("please select at least one !")
  }
}

  return (
    <div className="app">
  
    <div className='header'>
      <div className="admin">Administrator </div> 
       <div className='headinput'>
         {/* <div className='searchfield'> */}
           <input className='searchbar input' 
           onChange={(e)=>{setSearch(e.target.value)}}
            placeholder='search by name / email / role' type="text" />
            {/* </div> */}
       </div>
   </div>
    

    <div className="main">
         <form>
         <table className='table'>
           <thead className='thead' >
            <tr>
         <th className='a' >S.N </th>
         <th className='b d'>Name</th>
         <th className='b d'>Eamil</th> 
         <th className='b d' >Role</th>
         <th className='c' >Actions</th>
        </tr>
       </thead>
       <tbody className='tbody'>
         
         {contacts.filter((contact)=>{
        if( search ===""){
          return "Not Found";
        }else if(search !==""){
          return (contact.name.includes(search) || contact.email.includes(search) ||
           contact.role.includes(search) || contact.id.includes(search)
           ) } 
      }).slice(a,b).map((contact,index)=>( 
        <Fragment key={index}>
        {editContactId === contact.id ?( 
        <EditRow editFormData ={editFormData} 
        handleEditFormChange={handleEditFormChange} 
        handleEditFormSubmit ={ handleEditFormSubmit}
        handleCancel ={handleCancel} />): 
        ( <ReadOnlyRow contact ={contact} 
          contants={contacts}
          selectRow={selectRow} 
          editThisRow ={editThisRow}  handleDeleteClick={handleDeleteClick} /> )}
          </Fragment>
      ))
            }
            </tbody>
       </table>
       </form>
    </div>

    <div className="adduser">
      <form className="adduser_form" >
       <div className='adduser_form_entry one'>
         <div>
          <label htmlFor="id" className='idlable' required/> 
          <b className='bold'>Id:</b>
          <input className='input x' placeholder='enter id' name='id' type='digit'
          value={id}  onChange={addUserData} required/> 
         </div>
        
         <div>
           <label htmlFor="name" /> 
           <b className='bold'>Name:</b>
          <input className='input y' placeholder='enter name'
            onChange={addUserData} type='text'
           name='name'  value={name}  required/> 
          </div>
         </div>
          
         <div className='adduser_form_entry two'>
          <div>
           <label htmlFor="email"/> 
           <b className='bold'>Email:</b>
         <input className='input y w' placeholder='enter email' 
          onChange={addUserData} type='email'
           name='email' value={email}  required/>
           </div>

           <div>
           <label htmlFor="role"  style={{marginLeft:'20px'}}/>
           <b className='bold'>Role:</b>
         <input className='input y' placeholder='enter role'
           onChange={addUserData} type='text'
           name='role' value={role}  required/>
           </div>
           </div>

           <div>
         <button  className="btn z" onClick={submitUserData} >Add User</button> 
         </div>

         </form>
       </div>

    <div className="footer1">
    <div className='footer'>
      <div className="footerLeft">
       <button className="delete" onClick={deleteSelectedRow}>Delete Selected</button>
      </div>

 <div className="footerRight">
 <button className='icon' onClick={()=>setPage(0)} > < AiOutlineDoubleLeft /> </button>
 <button className='icon' onClick={previousPage} >  <AiOutlineLeft /></button>
 <button className='icon' value={0} onClick={(e)=>setPage(e.target.value)} >1</button>
 <button className='icon' value={10}  onClick={(e)=>setPage(e.target.value)}>2 </button>
 <button className='icon' value={20} onClick={(e)=>setPage(e.target.value)} >3</button>
 <button className='icon' value={30}  onClick={(e)=>setPage(e.target.value)} >4</button>
 <button className='icon' value={40} onClick={(e)=>setPage(e.target.value)}>5</button> 
 <button className='icon' onClick={nextPage} > <AiOutlineRight /> </button> 
 <button className='icon'onClick={()=>setPage(40)} ><AiOutlineDoubleRight /> </button>
 </div>

 </div>
   </div>

   </div>
  );
}

export default App;
