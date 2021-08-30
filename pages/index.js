import { Container, Spinner } from '@chakra-ui/react'
import { Login, Reserve, useAuth } from '../components'

export default function Home() {

  const [auth] = useAuth()

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
