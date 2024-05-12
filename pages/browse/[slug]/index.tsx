import CategoryProduct from "@/components/categoryProduct/CategoryProduct";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";

const PostPage = ({ country }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <Header country={country} />
      <CategoryProduct slug={slug} />

      <Footer />
    </div>
  );
};

export default PostPage;
