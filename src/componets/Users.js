import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";

function Users({ fileUrl }) {
  const [user, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
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
  // console.log(fileUrl);

  // userData?.map((u) => console.log(u.user));
  // console.log(userData);
  return (
    <div className="overflow-x-auto mx-2 md:mx-20">
      <div className="flex justify-center my-8">
        <input
          type="text"
          placeholder="Search User"
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
        {userData ? (
          <tbody>
            {userData
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
                    <Document file={fileUrl}>
                      <Page pageNumber={1} />
                    </Document>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

export default Users;