import React from 'react';

const ContactForm = () => {
  return (
    <div name='contact' className='w-full h-screen bg-[#267491] flex justify-center items-center p-4'>
      <form method='POST' action='https://getform.io/f/bpjmmpxb' className='flex flex-col max-w-[600px] w-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-red-600 text-gray-300'>
            Contact
          </p>
          <p className='text-gray-300 py-4'>
            Submit the form below to leave me a message
          </p>
        </div>
        <input className='p-2 outline-none bg-[#ccd6f6]' type='text' placeholder='Name' name='name' />
        <input className='my-4 outline-none p-4 bg-[#ccd6f6]' type='email' placeholder='Your email' name='email' />
        <textarea className='p-2 outline-none bg-[#ccd6f6]' name='message' rows='10' placeholder='Write your message here'></textarea>
        <button className='text-gray-300 border-2 hover:bg-red-600 hover:border-red-600 px-4 py-3 my-8 mx-auto flex items-center'>
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
