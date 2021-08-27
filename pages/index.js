import { Container, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Login, Signup, Reserve, Schedule } from "../components";
import firebase from "../config/firebase";

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: false,
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAuth({
        loading: false,
        user,
      });
    });
  }, []);

  if (auth.loading) {
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    );
  }

  //const authenticatedUser = firebase.auth().currentUser
  return auth.user ? <Reserve /> : <Login />;
}
