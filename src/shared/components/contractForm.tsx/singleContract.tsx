import React, { useState } from 'react';
import { Api } from 'Utils/api';
import { FiTrash } from 'react-icons/fi';
import DeleteContractModal from './DeleteContract';

interface PropTypes {
  contract: any;
  getContract: () => void;
}

const SingleContract = ({ contract, getContract }: PropTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const DeleteContractFn = async () => {
    try {
      setLoader(true);
      await Api.delete(`contract-forms/${contract.id}`);
      setLoader(false);
      closeModal();
      getContract();
      alert('contract sucessfully deleted');
    } catch (error) {
      setLoader(false);
      alert('contract deletion');
      throw error;
    }
  };

  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    if (isNaN(dateObject.getTime())) {
      return 'Invalid Date';
    }

    const options: {
      year: 'numeric' | '2-digit';
      month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
      day: 'numeric' | '2-digit';
    } = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(dateObject);
  }

  return (
    <>
      <DeleteContractModal
        loader={loader}
        isOpen={isOpen}
        closeModal={closeModal}
        DeleteContractFn={DeleteContractFn}
      />
      <div className="flex px-4 lg:px-[50px] justify-between items-center border-b !py-4 border-b-[hsl(0,0%,91%)]">
        <h2 className="capitalize text-purple-950 font-semibold w-[40%] text-lg">{contract.name}</h2>
        <h2 className="capitalize text-purple-950 font-medium w-[35%] text-lg">{formatDate(contract.updated_at)}</h2>
        <h2 className="uppercase text-purple-950 font-medium w-[25%]">
          <FiTrash className="w-7 h-7 stroke-purple-500 cursor-pointer" onClick={() => setIsOpen(true)} />
        </h2>
      </div>
    </>
  );
};

export default SingleContract;
