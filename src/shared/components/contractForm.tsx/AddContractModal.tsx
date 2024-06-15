import { Api } from 'Utils/api';
import React, { useEffect, useState } from 'react';
import { BiCheck, BiFolder } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

interface PropTypes {
  isOpen: boolean;
  closeModal: () => void;
  companyId: any;
  getContract: () => void;
}

const AddContract = ({ isOpen, closeModal, companyId, getContract }: PropTypes) => {
  const initialItems = [
    { id: 1, name: 'name' },
    { id: 2, name: 'project' },
    { id: 3, name: 'job_no' },
    { id: 4, name: 'company' },
    { id: 5, name: 'current_date' },
    { id: 6, name: 'date_of_loss' },
    { id: 7, name: 'company_address' },
    { id: 8, name: 'policy_holder_name' },
    { id: 9, name: 'claim_number' },
    { id: 10, name: 'input' },
    { id: 11, name: 'checkbox' },
  ];

  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    requireSignature: false,
  });
  const [selectedItems, setSelectedItems] = useState<{ id: number; name: string } | {}>({});
  const [textareaContent, setTextareaContent] = useState('');

  // contract parameters
  const handleItemClick = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = { ...prevSelectedItems };
      if (updatedItems[item.id]) {
        delete updatedItems[item.id];
      } else {
        updatedItems[item.id] = item;
      }
      return updatedItems;
    });
  };

  useEffect(() => {
    const formattedContent = Object.values(selectedItems)
      .map((item: any) => `~~~${item.name}~~~`)
      .join('\n');
    setTextareaContent(formattedContent);
  }, [selectedItems]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  // add contract fn
  const OnSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      company_id: companyId,
      name: formData.name,
      has_signature: true,
      template: textareaContent,
      replacement_tags: '',
      status: 'active',
    };

    try {
      setLoader(true);

      await Api.post('contract-forms', newData);
      setLoader(false);
      closeModal();
      getContract();
      alert('Contract Successfully Added');
      setFormData({
        name: '',
        requireSignature: false,
      });
      setSelectedItems({});
    } catch (error) {
      alert('Contract Addition failed');
      setLoader(false);
      throw error;
    }
  };

  return (
    <section
      className={`fixed flex z-[1000000] justify-center items-center top-0 lg:flex lg:justify-center lg:items-center inset-x-0 h-screen w-full  transition-all ease-in-out duration-400 ${
        isOpen ? 'translate-x-0' : 'translate-x-[-200%]'
      } `}
    >
      <div className={`inset fixed  bg-[#000000] bg-opacity-30 h-screen w-full  z-[1002] `}></div>

      <div className="w-full max-w-[90%] max-h-[96vh] !overflow-y-auto transform  rounded bg-white text-black text-left align-middle shadow-xl py-2 transition-all relative z-[1003]">
        <div className="w-full justify-between items-center flex py-5 p-6 ">
          <div className="flex items-center gap-5">
            <BiFolder className="w-7 h-7  text-gray-500" />
            <h3 className="text-xl font-semibold">Add Contract Form</h3>
          </div>
          <MdClose className="w-7 h-7  text-gray-500 cursor-pointer" onClick={closeModal} />
        </div>
        <form className="py-7 px-5 flex flex-col gap-7" action="" onSubmit={OnSubmit}>
          <div>
            <h4 className="capitalize mb-1 text-lg text-purple-950 font-medium">form name</h4>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full text-base pl-4 h-[44px] border-[hsl(0,0%,91%)] focus-visible:outline-none border rounded focus:outline-none focus:ring-0"
              placeholder="Authorization Form"
            />
          </div>
          <div className="flex gap-3 items-center">
            <h4 className="capitalize mb-1 text-lg text-purple-950 font-medium">Require Signature</h4>
            <input
              type="checkbox"
              name="requireSignature"
              checked={formData.requireSignature}
              onChange={handleChange}
              className="w-7 h-7 border  rounded focus:outline-none focus:ring-0"
              placeholder="Authorization Form"
            />
          </div>
          <div>
            <h4 className="capitalize mb-1 text-lg text-purple-950 font-medium">Contract Template</h4>
            <section className="flex items-start mt-2 ">
              <div className="flex flex-col gap-[2px] border border-[hsl(0,0%,70%)] p-2 pb-10 rounded-md max-w-[250px] w-[250px] min-h-[300px]">
                {initialItems.map((item) => (
                  <div className="flex gap-1 items-center" key={item.id}>
                    {Object.values(selectedItems).length > 0 &&
                    Object.values(selectedItems).find((elem: any) => elem.id === item.id) ? (
                      <BiCheck className="text-[#9A00FF] w-5 h-5" />
                    ) : (
                      <p className="w-5 h-5" />
                    )}
                    <button
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className="cursor-pointer text-base list-none"
                    >
                      ~~~{item.name}~~~
                    </button>
                  </div>
                ))}
              </div>
              <textarea
                readOnly
                value={textareaContent}
                className="w-full p-4 border text-base ocus:outline-none focus:ring-0 border-[hsl(0,0%,91%)] focus-visible:outline-none h-[500px] rounded-md  whitespace-pre-wrap"
                name=""
                id=""
              ></textarea>
            </section>
            <div className="flex w-full justify-center pb-6">
              <button
                type="submit"
                className="bg-[#9A00FF] text-white text-base w-[200px] h-[40px] rounded-md flex items-center justify-center my-7"
              >
                {loader ? <ClipLoader color="purple" size={10} /> : <span>Add Contract</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddContract;
