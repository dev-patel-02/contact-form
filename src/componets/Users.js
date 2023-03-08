import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Users() {
  const [user, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  useEffect(() => {
    axios
      .get("http://localhost:5000/contact")
      .then(function (response) {
        // handle success
        setUser(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  const userData = user?.data;

  // userData?.map((u) => console.log(u));
  // console.log(userData);

  //------------------------->>DOWNLOAD<<--------------------
  const handleDownload = (id) => {
    axios
      .get("http://localhost:5000/contact")
      .then((res) => {
        const data = res.data;
        const matchFile = data.find((f) => f._id === id);
        const fileName = matchFile.fileName;
        const url = window.URL.createObjectURL(new Blob([fileName]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "receipt.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        ////error
      });
  };

  //------------------>>PAGINATION FoRMULA<<------------------
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = userData?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="overflow-x-auto mx-2 md:mx-20">
      <div className="flex justify-center my-8">
        <input
          type="text"
          placeholder="Search User"
          aria-label="Search"
          onChange={(e) => setSearchUser(e.target.value)}
          className="py-2 px-4 rounded-lg w-full max-w-xs bg-[#3b436d] text-gray-200 outline-none"
        />
      </div>
      <table className="table w-full rounded-lg px-4">
        {/* head */}
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
                  value?.user?.firstName
                    .toLowerCase()
                    .includes(searchUser.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              ?.map((u, i) => (
                <tr key={i}>
                  <td>
                    {u?.user.firstName} {u?.user.lastName}
                  </td>
                  <td>{u?.user.subject}</td>
                  <td>
                    <button
                      onClick={() => handleDownload(u?._id)}
                      className="btn btn-xs"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : null}
      </table>
      <div className="flex justify-center py-4">
        <Pagination
          totalPosts={userData?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Users;
