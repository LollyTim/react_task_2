import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import React, { memo, useEffect, useState } from 'react';
import { Api } from 'Utils/api';
import { ClipLoader } from 'react-spinners';
import { areEqual } from 'Utils/equalityChecks';
import { BiFile, BiPlus } from 'react-icons/bi';
import AddContractModal from './AddContractModal';
import SingleContract from './singleContract';

interface Props { }

const ContractForm = ({ }: Props) => {
  const user: UserModel = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  const closeModal = () => {
    setIsOpen(false);
  };

  const getContract = async () => {
    try {
      setLoader(true);
      const post = await Api.get(`companies/${user.companies[0].id}/contract-forms`);
      setLoader(false);
      setContracts(post?.data?.data);
      setError('');
    } catch (error) {
      console.log(error);
      setLoader(false);
      setError('error');
      alert('fetch contract failed');
      throw error;
    }
  };

  useEffect(() => {
    getContract();
  }, []);

  return (
    <div id="ContractForm" className="container-fluid">
      <div className="row">
        <div className="text-4xl ">
          <>
            <AddContractModal
              isOpen={isOpen}
              closeModal={closeModal}
              getContract={getContract}
              companyId={user.companies[0].id}
            />
            <section className=" p-6">
              <div className="bg-white w-full min-h-[calc(100vh-150px)]">
                <button className="w-[200px] flex gap-1 justify-center items-center h-[40px]  text-base font-semibold text-white bg-purple-600  rounded-b-lg">
                  <BiFile className="text-white w-5 h-5" />
                  <span> Contract Forms</span>
                </button>
                <div className="w-full mt-8 px-4">
                  <div className="flex gap-6 items-center ">
                    <h2 className="font-bold text-[32px]">Form Templates</h2>
                    <button
                      className=" font-medium  text-[#9A00FF]  border-2 transition duration-300 border-[#9A00FF]  bg-transparent rounded-[26px] w-[120px] flex justify-center gap-1  items-center h-[40px] cursor-pointer text-base"
                      onClick={() => setIsOpen(true)}
                    >
                      <span>Add</span>
                      <BiPlus className="w-4 h-4 text-purple-800" />
                    </button>
                  </div>
                  <section className="mt-10">
                    <div className="flex  px-4 lg:px-[50px]  justify-between items-center border-b pb-5 border-b-[hsl(0,0%,91%)]">
                      <h2 className="uppercase text-purple-950 font-medium w-[40%] text-base">Template name</h2>
                      <h2 className="uppercase text-purple-950 font-medium w-[35%] text-base">Date created</h2>
                      <h2 className="uppercase text-purple-950 font-medium w-[25%]"></h2>
                    </div>
                    <div className="flex flex-col gap-3">
                      {contracts.length > 0 && !loader
                        ? contracts.map((contract) => (
                          <SingleContract getContract={getContract} key={contract.id} contract={contract} />
                        ))
                        : null}
                      {loader ? <ClipLoader color="purple" className="m-" size={16} /> : null}
                      {contracts.length <= 0 && !loader && error.length && (
                        <span className="m-5">Error loading contracts</span>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </>
        </div>
      </div>
    </div>
  );
};

const ContractFormMemo = memo(ContractForm, areEqual);

export { ContractFormMemo as ContractForm };
