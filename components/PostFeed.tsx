import { Post } from "@/types/articleTypes";
import { formatDate } from "@/utils/utils";

import React from "react";

interface PostFeedProps {
  article: Post;
}

const PostFeed: React.FC<PostFeedProps> = ({ article }) => {
  let date = "";
  if (article?.createdAt) {
    const dateObject = new Date(article.createdAt ?? "");
    date = formatDate(dateObject);
  }
  return (
    <>
      {article && (
        <div>
          <div>{article.title}</div>
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

export default PostFeed;
