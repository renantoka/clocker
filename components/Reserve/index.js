import { Button, Container } from "@chakra-ui/react"
import firebase from '../../config/firebase'

export const Reserve = () => { 
    const logout = () => firebase.auth().signOut()
return (
    <Container p={4} centerContent>
      <Button onClick={logout}>Sair</Button>
    </Container>
  )
}