import { Header } from "../../components/Header/Header";

import { Box, FormControl, TextField, Stack, Typography,  Avatar, Button,FormLabel } from "@mui/material";

import { useState } from "react";

import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";


import { colaboradorSchema} from "../../utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface IColaborador{
  nomeCompletoColaborador: string,
  emailColaborador: string,
  tipoPerfil: string
}

export const CadastrarColaborador = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [verificarEmail, setVerificarEmail] = useState("");

  const imageChange = (e: any): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const {register,handleSubmit, formState:{errors}} = useForm<IColaborador>({
    resolver: yupResolver(colaboradorSchema)
  });

  const cadastroColaborador = (data: IColaborador) => {
    const dominio = verificarEmail.split("@");
    if(dominio[1] === "dbccompany.com.br") {
      console.log(data);
      console.log(selectedImage);
      toast.success("Aluno cadastrado com sucesso!", toastConfig);
    } else {
      toast.error("Por favor digite um email válido. Ex: fulano@dbccompany.com.br", toastConfig);
    }
  };

  return (
    <>
      <Header />
      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 200px)" }}>
        <Typography sx={{textAlign: "center",marginBottom:"20px",fontSize:{
          xs:"35px",
          md:"40px"
        }, fontWeight:"700",color:"white"}} variant="h3">Cadastrar Colaborador</Typography>
        <Box component="form" onSubmit={handleSubmit(cadastroColaborador)} sx={{ display: {
          xs:"block",
          md:"flex"
        }, justifyContent: "space-between", backgroundColor: "#fff", width: {
          xs:"90%",
          md:"50%"
        }, borderRadius: "10px", padding: {
          xs: 5,
          md: 5
        }, boxShadow: "10px 10px 10px #2f407ccf"  }}>
          <Stack component="div" spacing={2} sx={{ width:{
            xs:"100%",
            md:"50%"
          }, display: "flex", alignItems:{
            xs:"start",
            md:"start"
          } }}>
            <FormControl sx={{ width: {
              xs:"100%",
              md:"100%"
            } }}>
              <TextField id="nomeCompletoColaborador" {...register("nomeCompletoColaborador")} error={!!errors.nomeCompletoColaborador}label="Nome Completo" placeholder="Fulano da Silva" variant="filled" focused />
              {errors.nomeCompletoColaborador && <Typography id="erro-nomeCompletoColaborador" sx={{fontWeight:"500", display: "flex", marginTop: "5px"}} color="error">{errors.nomeCompletoColaborador.message}</Typography>}
            </FormControl>
            <FormControl sx={{ width:  {
              xs:"100%",
              md:"100%"
            } }}>
              <TextField id="emailColaborador" {...register("emailColaborador")} onChange={(e) => setVerificarEmail(e.target.value)} label="E-mail DBC" placeholder="fulano.silva@dbccompany.com.br" variant="filled" focused />
              {errors.emailColaborador && <Typography id="erro-emailColaborador" sx={{fontWeight:"500", display: "flex", marginTop: "5px"}} color="error">{errors.emailColaborador.message}</Typography>}
            </FormControl>

            <FormControl variant="filled">

              <FormLabel sx={{color:"#1D58F9",fontWeight:"500",marginBottom:"10px"}} id="demo-controlled-radio-buttons-group">Selecionar cargo</FormLabel>

              <Box sx={{display:"flex",gap:4}}>
                <FormLabel color="primary" sx={{display:"flex", alignItems:"center", gap:1,fontWeight:"700",color:"#1D58F9"}}>
                  <input type="radio" value="Gestor" id="gestorDePessoas" {...register("tipoPerfil")} />
                  Gestor de Pessoas
                </FormLabel>

                <FormLabel sx={{display:"flex", alignItems:"center", gap:1,fontWeight:"700",color:"#1D58F9"}}>
                  <input type="radio" value="Instrutor" id="instrutor" {...register("tipoPerfil")}/>
                  Instrutor
                </FormLabel>
              </Box>
              {errors.tipoPerfil && <Typography id="erro-tipoPerfil01" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px"}} color="error">{errors.tipoPerfil.message}</Typography>}

            </FormControl>

          </Stack>
          <Stack component="div" spacing={2} sx={{ width: {
            xs:"100%",
            md:"50%"
          }, display: "flex", alignItems: "center",marginTop:{
            xs:2,
            md:0
          }}}>
            {selectedImage && <Avatar alt="Foto Enviada" src={URL.createObjectURL(selectedImage)} sx={{ width: 150, height: 150 }} />}
            {!selectedImage && <Avatar alt="Foto Padrao" sx={{ width: 150, height: 150 }} />}
            <Button component="label" variant="contained">
              <input id="imagemAluno" type="file" accept="image/jpeg" hidden onChange={imageChange} />
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">Inserir Foto</Typography>
            </Button>

            <Box sx={{display:"flex",width:"100%",maxHeight:"100%", justifyContent:"end",marginTop:"60px!important"}}>
              <Button color="success" type="submit" variant="contained" sx={{textTransform: "capitalize", width:{
                xs:"15ch",
                md:"15ch"
              }}}>Enviar</Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

