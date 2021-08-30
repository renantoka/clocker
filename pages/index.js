import { Container, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Login, useAuth } from "../components";

export default function Home() {
  const [auth] = useAuth()
  const router = useRouter()

  useEffect(() => { 
    if (!auth.loading) {
    auth.user 
    ? router.push("/reserve")
    : router.push("/login")
  }
}, [auth.user]);

    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    );
}


