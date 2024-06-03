import BestPosts from "./components/BestPosts";
import AllPost from "./components/AllPost";
import { getArticle } from "../api/api";
import { Articles } from "@/types/articleTypes";
import Layout from "@/components/UI/Layout";
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
  initialBestArticle: Articles;
  initialAllArticle: Articles;
}
const index: React.FC<IndexProps> = ({
  initialAllArticle,
  initialBestArticle,
}) => {
  return (
    <Layout>
      <BestPosts initialArticle={initialBestArticle} />
      <AllPost initialArticle={initialAllArticle} />
    </Layout>
  );
};

export default index;
