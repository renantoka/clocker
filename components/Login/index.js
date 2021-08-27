import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

import { Logo } from "../Logo";
import firebase, { persistenceMode } from "../../config/firebase";
import Link from 'next/link'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
  username: yup.string().required("Preenchimento obrigatório"),
});

export const Login = () => {
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    isSubmitting 
  } =
    useFormik({
      onSubmit: async (values, form) => {
        firebase.auth().setPersistence(persistenceMode)

        try {

        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        console.log(user)
        } catch (error) {
          console.log('ERROR ', error)
        }
      },
      validationSchema,
      initialValues: {
        email: "",
        username: "",
        password: "",
      },
    });

  
  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl p={4} mt={8} id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            size="lg"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl p={4} id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            size="lg"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && (
            <FormHelperText textColor="#e74c3c">
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <Box p={4}>
          <Button 
          colorScheme="blue"
          width="100%" 
          onClick={handleSubmit}
          isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Box>
      </Box>

      <Link href="/signup">Ainda não possui conta? Cadastre-se aqui</Link>
    </Container>
  );
}