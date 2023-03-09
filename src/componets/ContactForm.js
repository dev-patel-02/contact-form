import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";

//----------------Validation shemas ---------------
const schema = yup.object().shape({
  firstName: yup.string().min(2).max(25).required("Please enter First name"),
  lastName: yup.string().min(2).max(25).required("Please enter Last name"),
  mobileNumber: yup.number().required("Please enter Number"),
  subject: yup.string().required("Please enter Subject"),
  message1: yup.string().max(300).required("Please enter Message"),
  file: yup
    .mixed()
    .required("File is required")
    .test("fileFormat", "JPEG , PNG or PDF only", (value) => {
      if (!value) {
        return false;
      }
      const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
      return allowedFormats.includes(value.type);
    }),
});

function ContactForm() {
  const [errors, setErrors] = useState({});
  const [errorsFromBackend, setErrorsFromBackend] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    subject: "",
    message1: "",
    file: {},
  });

  //<---------Form Submit-------------->

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(data, { abortEarly: false });
      console.log(true);
      const response = await axios.post(
        "http://localhost:5000/api/uploads",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast("Submitted Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      setErrorsFromBackend(err.message);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };
  return (
    <div className="bg-[#2c3463] container md:mx-auto p-4 md:p-8 md:m-4 md:my-10 rounded-md text-white shadow-2xl flex flex-col md:justify-center md:flex-row">
      <div className="md:flex md:justify-between">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="flex justify-center"
        >
          <div>
            <h1 className="text-xl md:text-4xl font-bold text-[#9cd2ff] py-4 px-4">
              Let us know <br /> more about you !
            </h1>
            <div className="flex flex-col md:flex-row px-4">
              <div className="my-1">
                <label className="mb-1 block ml-2 text-gray-200">
                  First Name
                </label>
                <input
                  className="py-2 rounded-md w-full shadow-sm outline-none px-4 bg-[#3b436d]"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className="text-red-500">{errors.firstName}</div>
                )}
              </div>
              <div className="my-1 md:mx-4">
                <label className="mb-1 block ml-2 text-gray-200" for="">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="py-2 rounded-md w-full shadow-sm outline-none px-4 bg-[#3b436d]"
                  value={data.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="text-red-500">{errors.lastName}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row px-4">
              <div className="my-1">
                <label className="mb-1 block ml-2 text-gray-200" for="">
                  Mobile Number
                </label>
                <input
                  type="phone"
                  name="mobileNumber"
                  placeholder="Moblie Number"
                  className="bg-[#3b436d] w-full py-2 rounded-md shadow-sm outline-none px-4"
                  value={data.mobileNumber}
                  onChange={handleChange}
                />
                {errors.mobileNumber && (
                  <div className="text-red-500">{errors.mobileNumber}</div>
                )}
              </div>
              <div className="my-1 md:mx-4">
                <label className="mb-1 block ml-2 text-gray-200" for="">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="py-2 rounded-md w-full shadow-sm outline-none px-4 bg-[#3b436d]"
                  value={data.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <div className="text-red-500">{errors.subject}</div>
                )}
              </div>
            </div>
            <div className="my-1 px-4">
              <label className="mb-1 block ml-2 text-gray-200" for="">
                Enter Your Message
              </label>
              <textarea
                type="text"
                name="message1"
                placeholder="Enter your Message"
                className=" bg-[#3b436d] md:w-[440px] w-full py-2 rounded-md shadow-sm outline-none px-4 h-36 resize-none"
                value={data.message1}
                onChange={handleChange}
              />
              {errors.message1 && (
                <div className="text-red-500">{errors.message1}</div>
              )}
            </div>
            <div className="my-2 px-4 md:mr-4 ">
              <label className="mb-1 block ml-2 text-gray-200">
                Attached Document:
              </label>
              <input
                type="file"
                name="file"
                required
                className="py-2 w-[290px] md:w-full bg-[#3b436d] rounded-md shadow-sm px-4 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
                onChange={handleFileChange}
              />
              {errors.file && <div className="text-red-500">{errors.file}</div>}
            </div>
            {/* <p className="py-1 text-red-500 text-xs text-center">
              {errorsFromBackend}
            </p> */}
            <div className="flex justify-center items-center mt-4 mb-2">
              <button
                className="px-6 py-1 font-bold text-[#3b436d] bg-[#9cd2ff] rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center md:mx-20 my-8 md:my-0">
          <div className="text-gray-200 border border-gray-400 p-4 rounded-lg">
            <h2 className="text-[#9cd2ff] font-bold text-2xl md:text-4xl">
              Contact Information
            </h2>
            <div className="flex justify-center">
              <div className="py-5">
                <p>Halishahar, Noyabazar, Pc Road</p>
                <p>Chattogram , Bangladesh</p>
                <p>Cell Us : +008 -053434 -1854</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
