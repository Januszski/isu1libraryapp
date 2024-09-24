import { useState } from "react";
import { AlertCircle, Send } from "lucide-react";

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    complaint: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      message: formData.complaint,
      subject: formData.subject,
      sender_name: formData.name,
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/uploadComplaint`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.error || "Something went wrong");
    }

    setSubmitted(true);
    setFormData({ name: "", subject: "", complaint: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className='min-h-screen bg-zinc-900 text-zinc-300 font-mono p-4 flex flex-col'>
      <header className='mb-8'>
        <h1 className='text-2xl font-bold text-red-500 mb-2'>
          INMATE FEEDBACK TERMINAL
        </h1>
        <p className='text-sm text-zinc-500'>SYSTEM VERSION 2.1.4</p>
      </header>

      <main className='flex-grow'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='bg-zinc-800 p-4 rounded-sm'>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-zinc-400'
            >
              INMATE NAME:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full bg-zinc-700 text-zinc-300 border border-zinc-600 rounded-sm p-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter your full name'
              required
            />
          </div>

          <div className='bg-zinc-800 p-4 rounded-sm'>
            <label
              htmlFor='subject'
              className='block mb-2 text-sm font-medium text-zinc-400'
            >
              COMPLAINT SUBJECT:
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              className='w-full bg-zinc-700 text-zinc-300 border border-zinc-600 rounded-sm p-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter complaint subject'
              required
            />
          </div>

          <div className='bg-zinc-800 p-4 rounded-sm'>
            <label
              htmlFor='complaint'
              className='block mb-2 text-sm font-medium text-zinc-400'
            >
              COMPLAINT DETAILS:
            </label>
            <textarea
              id='complaint'
              name='complaint'
              value={formData.complaint}
              onChange={handleChange}
              className='w-full bg-zinc-700 text-zinc-300 border border-zinc-600 rounded-sm p-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
              rows={6}
              placeholder='Type your complaint here...'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-red-900 hover:bg-red-800 text-zinc-300 py-2 px-4 rounded-sm flex items-center justify-center'
          >
            <Send className='mr-2 h-4 w-4' /> SUBMIT COMPLAINT
          </button>
        </form>

        {submitted && (
          <div className='mt-4 bg-zinc-800 border border-zinc-700 p-4 rounded-sm flex items-center'>
            <AlertCircle className='text-yellow-500 mr-2' />
            <span>Complaint submitted. Expect no response.</span>
          </div>
        )}
      </main>

      <footer className='mt-8 text-center text-xs text-zinc-600'>
        <p>CONFINEMENT CORP | ALL ACTIVITIES MONITORED</p>
        <p>MISUSE OF THIS SYSTEM IS PUNISHABLE BY SOLITARY CONFINEMENT</p>
      </footer>
    </div>
  );
}
