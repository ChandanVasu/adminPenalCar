"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import AddListing from "@/components/block/addList"

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [backdrop, setBackdrop] = useState('blur');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="flex justify-between mb-3 px-3 w-full"> 
         <h1 className="font-semibold text-lg px-2 poppins">Listing Page</h1>   
        <Button  
          variant="shadow" 
          color="black" 
          onPress={handleOpen}
          className="capitalize bg-black text-white">
          Add Listing +
        </Button>
        </div>

      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 poppins">Add New Listing</ModalHeader>
            <ModalBody>
              <AddListing></AddListing>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
