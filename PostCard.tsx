import React from "react";
import { formatDate } from "../../../utils/utils";
import { Post } from "@/types/articleTypes";

interface PostCardProps {
  article: Post;
}

const PostCard: React.FC<PostCardProps> = ({ article }) => {
  let date = "";
  if (article?.createdAt) {
    const dateObject = new Date(article.createdAt ?? "");
    date = formatDate(dateObject);
  }
  return (
    <>
      {article && (
        <div className="w-384 h-169">
          <div className="text-3xl">{article.title}</div>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              width={48}
              height={45}
            />
          )}
          <div>{article.writer.nickname}</div>
          <div>{article.likeCount}</div>
          <div>{date}</div>
          <hr />
        </div>
      )}
    </>
  );
};

export default PostCard;
