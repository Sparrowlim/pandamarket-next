import React, { useEffect, useState } from "react";
import { Articles } from "../../../types/articleTypes";
import { getArticle } from "../../api/api";
import PostCard from "./PostCard";
import useBreakPoint from "../../../hooks/useBreakPoint";

export async function getStaticProps() {
  const response: Articles = await getArticle("like", 3);
  return {
    props: {
      initialArticle: response,
    },
  };
}
interface BestPostsProps {
  initialArticle: Articles;
}

const BestPosts = ({ initialArticle }: BestPostsProps) => {
  const [article, setArticle] = useState<Articles | null>(initialArticle);
  const [error, setError] = useState<string | null>(null);
  const breakPoint = useBreakPoint();
  const articleList = article ? article.list : [];

  const getPageSize = () => {
    if (breakPoint.isDesktop) return 3;
    if (breakPoint.isTablet) return 2;
    if (breakPoint.isMobile) return 1;
    return 0;
  };

  useEffect(() => {
    async function fetchArticle() {
      const pageSize = getPageSize();
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
  }, [breakPoint.isMobile, breakPoint.isTablet, breakPoint.isDesktop]);

  useEffect(() => {});

  // if (error) {
  //   alert(`오류: ${error}`);
  // }
  console.log(article);
  return (
    <>
      <h1>베스트 게시글</h1>
      {articleList.map((article) => (
        <PostCard key={article.id} article={article} />
      ))}
    </>
  );
};

export default BestPosts;
