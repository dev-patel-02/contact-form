import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
     
            <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? "active text-black rounded-lg bg-[#ffffff] mx-2 px-3 py-1 my-4 font-bold text-lg" : "text-pink-400 rounded-lg bg-[#3b436d] mx-2 px-3 py-1 my-4 font-bold text-lg"}
          >
            {page}
          </button>
        
        );
      })}
    </div>
  );
};

export default Pagination;
