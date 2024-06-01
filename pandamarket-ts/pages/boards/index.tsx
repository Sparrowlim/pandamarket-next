import React, { useEffect, useState } from "react";
import BestPosts from "./components/BestPosts";
import AllPost from "./components/AllPost";
import { getArticle } from "../api/api";
import { Articles } from "@/types/articleTypes";
import { init } from "next/dist/compiled/webpack/webpack";

export async function getStaticProps() {
  const bestPosts: Articles = await getArticle("recent", 3);
  const allPosts: Articles = await getArticle("like", 10);
  return {
    props: {
      initialBestArticle: bestPosts,
      initialAllArticle: allPosts,
    },
  };
}
interface IndexProps {
  initialBestPosts: Articles;
  initialAllPosts: Articles;
}
const index: React.FC<IndexProps> = ({ initialBestPosts, initialAllPosts }) => {
  return (
    <>
      <BestPosts initialArticle={initialBestPosts} />
      <AllPost initialArticle={initialAllPosts} />
    </>
  );
};

export default index;
