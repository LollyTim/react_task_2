import React from 'react';
import { BiFolder } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

interface PropTypes {
  loader: boolean;
  isOpen: boolean;
  closeModal: () => void;
  DeleteContractFn: () => void;
}

const DeleteContractModal = ({ loader, isOpen, closeModal, DeleteContractFn }: PropTypes) => {
  console.log(isOpen);
  return (
    <section
      className={`fixed flex z-[1000] justify-center items-center top-0 lg:flex lg:justify-center lg:items-center inset-x-0 h-screen w-full  transition-all ease-in-out duration-400 ${
        isOpen ? 'translate-x-0' : 'translate-x-[-200%]'
      } `}
    >
      <div className={`inset fixed  bg-[#000000] bg-opacity-30 h-screen w-full  z-[1002] `}></div>

      <div className="w-full max-w-md transform overflow-hidden rounded bg-white text-black text-left align-middle shadow-xl py-2 transition-all relative z-[1003]">
        <div className="w-full justify-between items-center flex border-b py-5 p-6 border-b-[hsl(0,0%,91%)]">
          <BiFolder className="w-7 h-7  text-gray-500" />
          <h3 className="text-xl font-semibold">Delete Contract Form</h3>
          <MdClose className="w-7 h-7  text-gray-500 cursor-pointer" onClick={closeModal} />
        </div>
        <p className="font-medium text-lg text-center py-5 pb-7">Are you sure you want to delete this form</p>
        <div className="w-full flex items-center gap-6 justify-center pb-3">
          <button
            className="border max-w-[50%] w-[150px] flex text-base justify-center items-center h-[40px] transition duration-300   border-red-700 text-red-600 font-medium bg-transparent rounded"
            onClick={DeleteContractFn}
          >
            {loader ? <ClipLoader color="purple" size={10} /> : <span>Delete</span>}
          </button>
          <button
            className="border max-w-[50%]  w-[150px] h-[40px] text-base flex justify-center items-center  duration-300 transition  border-purple-700 text-purple-700 font-medium bg-transparent rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteContractModal;
