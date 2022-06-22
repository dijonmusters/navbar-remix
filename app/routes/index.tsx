import { Link } from "@remix-run/react";

const IndexPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-4xl font-bold mb-4">We are working on a new Podcast</p>
      <Link to="/episodes" prefetch="intent">
        Check if we have episodes yet 👉
      </Link>
    </div>
  );
};

export default IndexPage;
