import { Button, Container } from '@chakra-ui/react'

import { firebaseClient } from '../../config/firebase'

export const Reserve = () => { 
    const logout = () => firebaseClient.auth().signOut()
return (
    <Container p={4} centerContent>
      <Button onClick={logout}>Sair</Button>
    </Container>
  )
}