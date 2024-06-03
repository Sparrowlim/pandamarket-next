import React, { useEffect, useState } from "react";
import { Articles } from "../../../types/articleTypes";
import { getArticle } from "../../api/api";
import PostCard from "./PostCard";
import useBreakPoint from "../../../hooks/useBreakPoint";

interface BestPostsProps {
  initialArticle: Articles;
}

const pageSizeMap = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
};

const BestPosts = ({ initialArticle }: BestPostsProps) => {
  const [article, setArticle] = useState<Articles | null>(initialArticle);
  const [error, setError] = useState<string | null>(null);
  const { device } = useBreakPoint();
  const articleList = article ? article.list : [];

  useEffect(() => {
    async function fetchArticle() {
      const pageSize = pageSizeMap[device];
      if (pageSize === 0) return;
      try {
        const response: Articles = await getArticle("like", pageSize);
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
  }, [device]);

  useEffect(() => {});

  // if (error) {
  //   alert(`오류: ${error}`);
  // }
  return (
    <>
      <h1>베스트 게시글</h1>
      {articleList.map(
        (article) => article && <PostCard key={article.id} article={article} />
      )}
    </>
  );
};

export default BestPosts;
