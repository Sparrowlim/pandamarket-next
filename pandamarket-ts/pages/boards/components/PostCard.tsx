import React from "react";
import { formatDate } from "../../../utils/utils";
import { Post } from "@/types/articleTypes";

interface PostCardProps {
  article: Post;
}

const PostCard: React.FC<PostCardProps> = ({ article }) => {
  const dateObject = new Date(article.createdAt);
  let date = "";
  date = formatDate(dateObject);
  return (
    <>
      <div>{article.title}</div>
      {article.image && (
        <img src={article.image} alt={article.title} width={48} height={45} />
      )}
      <div>{article.writer.nickname}</div>
      <div>{article.likeCount}</div>
      <div>{date}</div>
      <hr />
    </>
  );
};

export default PostCard;
