import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../utils/schemas";

import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import backgroundLogin from "../../assets/bg-login.png";

import { Box, Button, Typography, Stack, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl  } from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";

import { ILogin } from "../../utils/interface";
import { useNavigate } from "react-router-dom";

interface IUsuario {
  email: string,
  senha: string
}

export const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<ILogin>({ password: "", showPassword: false });
  const [verificarEmail, setVerificarEmail] = useState("");

  const handleChange = (prop: keyof ILogin) => (event: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [prop]: event.target.value });
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });

  const {register, handleSubmit, formState: { errors }} = useForm<IUsuario>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit = (data: IUsuario) => {
    const dominio = verificarEmail.split("@");
    if(dominio[1] === "dbccompany.com.br") {
      navigate("/dashboard/admin");
      toast.success("Seja bem-vindo(a)", toastConfig);
    } else {
      toast.error("Por favor digite um email válido. Ex: fulano@dbccompany.com.br", toastConfig);
    }
  };

  return (
    <>
      <Box id="container-global" component="section" sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Box id="box-esquerda" sx={{ backgroundImage: `url(${backgroundLogin})`, width: "40%", height: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></Box>

        <Box id="box-direita" sx={{ width: "60%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <Box id="box-login" component="form" onSubmit={handleSubmit(onSubmit)} sx={{ backgroundColor: "#fff", width: "70%", borderRadius: 3, padding: 5, boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)"}}>
            <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography id="titulo" variant='h3' sx={{ color: "#1e62fe", fontWeight: "700" }}>AvaliaSer</Typography>
              <Typography id="subtitulo" variant='body1' sx={{ color: "#090F27", fontWeight: "600" }}>Faça seu login!</Typography>

              <FormControl sx={{ width: "60%" }} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput id="email" type="email" {...register("email")} onChange={(e) => setVerificarEmail(e.target.value)} placeholder="fulano.silva@dbccompany.com.br" label="Email" endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ cursor: "initial", ":hover": {background: "transparent"} }}>
                      <AccountCircle />
                    </IconButton>
                  </InputAdornment>
                } />
                {errors.email && <Typography sx={{fontWeight:"600", display: "flex", marginTop: "5px"}} color="error">{errors.email.message}</Typography>}
              </FormControl>

              <FormControl sx={{ width: "60%" }} variant="outlined">
                <InputLabel htmlFor="senha">Senha</InputLabel>
                <OutlinedInput id="senha" {...register("senha")} placeholder="Insira sua senha" type={values.showPassword ? "text" : "password"} label="Senha" value={values.password} onChange={handleChange("password")} endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }/>
                {errors.senha && <Typography sx={{fontWeight:"600", display: "flex", marginTop: "5px"}} color="error">{errors.senha.message}</Typography>}
              </FormControl>
              <Button id="botao-logar" size="medium" type="submit" endIcon={<LoginOutlined />} sx={{ width: "30%", backgroundColor: "#1e62fe" }} variant="contained">Entrar</Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};
