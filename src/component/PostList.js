import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/fetchPost";
import { PaginationButtonList } from "./PaginationButtonList";
import { Post } from "./Post";

const PostList = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
        fetchPosts(page, 5)
          .then((res) => res.json())
          .then((jsonData) => {
            setData(jsonData);
          });
      };
    loadData();
  },[page]);

  useEffect(() => {
    const loadDatas = async () => {
        fetchPosts(page, 5)
          .then((res) => res.json())
          .then((jsonData) => {
            setData(jsonData);
          });
      };

    setData(null);
    loadDatas();
  },[page]);

  const clickHandler = (val) => {
    setPage(val);
  };

  return (
    <>
      {data == null ? (
        <div id="loader" className="loader">
          loading
        </div>
      ) : (
        data.map((ele) => {
          return <Post ele={ele} key={ele.id} />;
        })
      )}
      <PaginationButtonList page={page} clickHandler={clickHandler} />
    </>
  );
};

export { PostList };