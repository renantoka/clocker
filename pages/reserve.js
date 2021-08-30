import { Button, Container } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../components/Auth'

export default function reserve() { 
  const [auth, { logout }] = useAuth()
  const router = useRouter()

  useEffect(() => {
    !auth.user && router.push("/");
  }, [auth.user]);

  return (
    <Container p={4} centerContent>
      <Button onClick={logout}>Sair</Button>
    </Container>
  )
}