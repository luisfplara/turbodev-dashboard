'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "lib/firebase-config";

import { useRouter } from 'next/navigation';


function LoginForm() {
  const router = useRouter();

  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString()
    const password = data.get('password')?.toString()
    console.log("--------> ", process.env.FIREBASE_SECRET_KEY);
    if (email != null && password != null) {
      signInWithEmailAndPassword(auth, email, password).then(async (userCred) => {
        if (!userCred) {
          return;
        }

        await fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            router.push("/dashboard/home");
          }
        });
      });
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Entrar
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Esqueceu a senha?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" variant="body2">
            {"Não possui uma conta? Registre-se"}
          </Link>
        </Grid>
      </Grid>
    </Box>);
}
export default function SignIn() {


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 120,
              width: 100,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="Polvilho Três Coqueiros"
            src="/white_bb.png"
          />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <LoginForm/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}