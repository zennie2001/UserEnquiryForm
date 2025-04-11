import React, { useEffect, useState } from 'react'
import {Textarea , Button, Checkbox, Label, TextInput, Table } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import EnquiryList from './Enquiry/EnquiryList';



function Enquiry() {
   let [enquiryList, setEnquiryList]= useState([])
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

        if(formData._id){
          //update
          axios.put(`http://localhost:8050/api/website/enquiry/update/${formData._id}`, formData)
          .then((res)=>{
            toast.success('Enquiry Updated successfully')
            setFormData({
              name:'',
              email:'',
              phone:'',
              message:'',
              _id:''
            })
           getAllenquiry()
          })

        }else{
          axios.post(`http://localhost:8050/api/website/enquiry/insert`,formData).then((res)=>{
            console.log(res.data)
            toast.success("Enquiry Saved Successfully!")
  
            setFormData({
              name:'',
              email:'',
              phone:'',
              message:'',
              _id:''
            })
           getAllenquiry()
          })

        }

       
      }

      

      let getValue=(e)=>{
        let inputName = e.target.name
        let inputValue = e.target.value
        
        let oldData={...formData}
        
        oldData[inputName] = inputValue
        setFormData(oldData)

      }


      let getAllenquiry = ()=>{
        axios.get(`http://localhost:8050/api/website/enquiry/view`)
        .then((res)=>{
          return res.data
        }).then((finalData)=>{
          if(finalData.status){
            setEnquiryList(finalData.enquiryList)
          }
        })
      }
      

      
      useEffect(()=>{
        getAllenquiry()
      }, [])


  return (
    <div>
        <ToastContainer/>
        <h1 className='text-[40px] text-center py-6 font-bold'>User Enquiry</h1>

        <div className='grid grid-cols-[30%_auto] gap-10'>

          <div className='bg-gray-200 p-4'> 

                 <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
                 {formData._id}
   
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
                     <Button type="submit" className='w-[100%]'>
                      {formData._id ? "Update" : "Submit"}
                     </Button>
                   </div>
                 </form>
               </div>
           









            <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} Swal={Swal} setFormData={setFormData}/>

        </div>
    </div>
  )
}

export default Enquiry