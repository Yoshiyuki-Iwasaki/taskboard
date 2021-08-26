import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";

const BlogId = ({ blog }) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
};

export default BlogId;

// パスを指定
export const getStaticPaths = async () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("user", user);
    // return {paths, fallback: false};
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch(
    "https://<作成したサービス名>.microcms.io/api/v1/blog/" + id,
    key
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
  };
};
