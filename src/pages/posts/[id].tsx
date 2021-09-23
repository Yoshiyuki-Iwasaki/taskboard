import firebase from "../../firebase/clientApp";
import Layout from "../../components/Layout";
import TaskDetail from "../../components/taskDetail";

const PostDetail = ({ todo }:any) => {

  return (
    <Layout>
      <TaskDetail todo={todo} />
    </Layout>
  );
};

export default PostDetail;

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const resTodo = await db.collection("chatList").get();
  const paths = resTodo.docs.map(todo => `/posts/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const db = firebase.firestore();
  const id = context.params.id;
  const resTodo = await db.collection("chatList").get();
  const todos = resTodo.docs.map(todo => todo.data());
  const array = todos.find(todo => todo.id == id);
  return {
    props: {
      todo: array,
    },
  };
};
