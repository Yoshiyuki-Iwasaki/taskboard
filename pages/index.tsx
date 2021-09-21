import TaskList from '../components/taskList';
import Auth from "../components/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";


export default function Home() {
    const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }
  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <TaskList />
      )}
    </>
  );
}
