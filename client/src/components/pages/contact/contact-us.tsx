import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add logic to submit the form data to your backend or handle it as needed
    // For demonstration purposes, we'll just set the submitted state to true
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center p-10">
      <div className="px-4 py-8 w-3/4">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        {submitted ? (
          <p className="text-green-500 mb-4">
            Your message has been submitted. We'll get back to you soon!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border rounded px-3 py-2 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded px-3 py-2 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full border rounded px-3 py-2 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
