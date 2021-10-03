import TaskList from "../components/task/TaskList";
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Layout>
        <TaskList />
      </Layout>
    </>
  );
}
