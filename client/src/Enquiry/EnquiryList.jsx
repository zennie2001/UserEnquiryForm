import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function EnquiryList({data, getAllenquiry , Swal, setFormData}) {

  let deleteRow=(delid)=>{
    
    Swal.fire({
      title: "Do you want to delete the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result)=>{

      if (result.isConfirmed) {
        axios.delete(`https://user-enquiry-mern-backend.vercel.app/api/website/enquiry/delete/${delid}`)
        .then((res)=>{
          toast.success('Enquiry Deleted successfully')
          getAllenquiry()
        })

        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    })   
  }


  let editRow= (editId)=>{
      axios.get(`https://user-enquiry-mern-backend.vercel.app/api/website/enquiry/single/${editId}`)
      .then((res)=>{
          let data= res.data
          setFormData(data.enquiryRow)
      })
  }
  
  return (
                <div className=' bg-gray-200 p-4'>
                  
                  <h2 className='text-[20px] mb-4 font-bold text-center'>Enquiry List</h2>
                  
                  <div className='overflow-x-auto'>
                  <Table>
                    <Table.Head>
                    <Table.HeadCell>S.N.</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Phone</Table.HeadCell>
                    <Table.HeadCell>Message</Table.HeadCell>
                    <Table.HeadCell> Edit </Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>

                  
                    <Table.Body className='divide-y'>
                     
                      {
                        data.length>=1?
                        data.map((item, index)=>{
                          return(
                                <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{index+1}</Table.Cell>
                                  <Table.Cell>{item.name}</Table.Cell>
                                  <Table.Cell>{item.email}</Table.Cell>
                                  <Table.Cell>{item.phone}</Table.Cell>
                                  <Table.Cell>{item.message}</Table.Cell>
                                  <Table.Cell>
                                  <a href='#' onClick={()=>editRow(item._id)} className='font-medium text-cyan-600 hover:underline'>Edit</a>
                                  </Table.Cell>
                
                                  <Table.Cell>
                                      <button onClick={()=>deleteRow(item._id)} className='bg-red-500 text-white rounded-md px-4 py-1'>Delete</button>
                                  </Table.Cell>
                
                                </Table.Row>
                          )
                        }):

                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                          <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>No data found</Table.Cell>
                        </Table.Row>
                        
                      }
                  
                    
    
                    </Table.Body>
                  </Table>
    
                  </div>
                </div>
  )
}

export default EnquiryList