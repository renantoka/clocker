import { Button, Container } from '@chakra-ui/react'
import { useAuth } from '../Auth'

export const Reserve = () => {
  const [, { logout }] = useAuth()
  return (
    <Container p={4} centerContent>
      <Button onClick={logout}>Sair</Button>
    </Container>
  )
}