import React, { ChangeEvent, useEffect, useState } from "react";
import { getArticle } from "../../api/api";
import { Articles, OrderBy, Post } from "../../../types/articleTypes";
import PostFeed from "./PostFeed";
import DropDownMenu from "../components/DropdownMenu";

interface AllPostProps {
  initialArticle: Articles;
}

const AllPost = ({ initialArticle }: AllPostProps) => {
  const [article, setArticle] = useState<Articles | null>(initialArticle);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<OrderBy>("recent");
  const [searchText, setSearchText] = useState("");
  const articleList: Post[] = article ? article.list : [];
  useEffect(() => {
    async function fetchArticle() {
      try {
        const response: Articles = await getArticle(orderBy, 10, searchText);
        if (!response) {
          throw new Error("게시물을 찾을 수 없습니다");
        }
        setArticle(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류 발생");
        }
      }
    }
    fetchArticle();
  }, [orderBy, searchText]);

  const handleSortSelection = (orderBy: OrderBy) => {
    setOrderBy(orderBy);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  console.log(searchText);
  return (
    <>
      <h1>게시글</h1>
      <input value={searchText} onChange={handleInputChange} />
      <DropDownMenu onSortSelection={handleSortSelection} />
      {articleList.map((article) => (
        <PostFeed key={article.id} article={article} />
      ))}
    </>
  );
};

export default AllPost;
