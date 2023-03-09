import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Users() {
  const [formData, setFormData] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    axios.get("http://localhost:5000/contact").then(function (response) {
      // handle success
      setFormData(response);
    });
  }, []);
  const data = formData.data;

  //------------------------->>DOWNLOAD<<---------------------

  //------------------>>PAGINATION FoRMULA<<------------------
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="overflow-x-auto mx-2 md:mx-20">
      <div className="flex justify-center my-8">
        <div className="flex">
          <label className="mb-1 ml-2 font-bold md:text-xl py-1 " for="">
            Search:
          </label>
          <input
            type="text"
            placeholder="Search by name"
            aria-label="Search"
            onChange={(e) => setSearchUser(e.target.value)}
            className="py-2 px-4 rounded-lg mx-2 w-full max-w-xs bg-[#3b436d] text-gray-200 outline-none"
          />
        </div>
      </div>
      <h1 className="font-bold text-lg pt-2 pb-4 text-center">Contact Request Information</h1>

      <table className="table w-full rounded-lg px-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Documets</th>
          </tr>
        </thead>
        {currentPosts ? (
          <tbody>
            {currentPosts
              ?.filter((value) => {
                if (searchUser === "") {
                  return value;
                } else if (
                  value?.firstName
                    .toLowerCase()
                    .includes(searchUser.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              ?.map((d, i) => (
                <tr key={i}>
                  <td>
                    {d?.firstName} {d?.lastName}
                  </td>
                  <td>{d?.subject}</td>
                  <td>
                    <a
                      className="py-1 bg-[#9cd2ff] rounded-lg text-black px-2"
                      href={`../upload/${d?.fileName}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Document
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : null}
      </table>
      <div className="flex justify-center py-4">
        <Pagination
          totalPosts={data?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Users;
