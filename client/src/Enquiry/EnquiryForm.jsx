import React, { useState } from 'react'
import {Textarea , Button, Checkbox, Label, TextInput, Table } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function EnquiryForm() {
  let[formData, setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    message:''
    
  })
    let saveEnquiry = (e) =>{
        
        e.preventDefault()

        // let formData={
        //   name:event.target.name.value,
        //   email:event.target.email.value,
        //   phone:event.target.phone.value,
        //   message:event.target.message.value
        // }

        axios.post(`https://user-enquiry-mern-backend.vercel.app/api/website/enquiry/insert`,formData).then((res)=>{
          console.log(res.data)
          toast.success("Enquiry Saved Successfully!")

          setFormData({
            name:'',
            email:'',
            phone:'',
            message:''
          })
        })
      }

      

      let getValue=(e)=>{
        let inputName = e.target.name
        let inputValue = e.target.value
        
        let oldData={...formData}
        
        oldData[inputName] = inputValue
        setFormData(oldData)

      }
  return (
   
   <div className='bg-gray-200 p-4'> <ToastContainer/>

                 <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
   
                 <form onSubmit={saveEnquiry}>
                   <div className='py-3 '> 
                     <Label value='Your Name'/>
                     <TextInput type='text'value={formData.name} onChange={getValue} name='name' placeholder='Enter your name' required />
                   </div>
   
                   <div className='py-3'> 
                     <Label value='Your Email'/>
                     <TextInput type='email' value={formData.email} onChange={getValue} name='email' placeholder='Enter your email' required />
                   </div>
   
                   <div className='py-3'> 
                     <Label value='Your Phone'/>
                     <TextInput type='text' value={formData.phone} onChange={getValue} name='phone' placeholder='Enter your phone' required />
                   </div>
   
                   <div className='py-3 '>
                     <Label value='Your Message'/>
                     <Textarea name='message' value={formData.message} onChange={getValue} placeholder="Leave a comment..." required rows={4} />
                   </div>
   
                   <div className='py-3 '>
                     <Button type="submit" className='w-[100%]'>Submit</Button>
                   </div>
                 </form>
               </div>
   
  )
}

export default EnquiryForm