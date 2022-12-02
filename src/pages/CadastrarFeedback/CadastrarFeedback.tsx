import { Box, Typography, Stack, FormControl, TextField, FormLabel, InputLabel, MenuItem, Select, Button } from '@mui/material'
import { Header } from '../../components/Header/Header'
import logo from "../../assets/dbc-logo.webp";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CadastrarFeedbackSchema } from '../../utils/schemas';
import { Navigate } from 'react-router-dom';
import { BotaoAzul } from '../../components/BotaoAzul/BotaoAzul';
import { Titulo } from '../../components/Titulo/Titulo';
import { useContext, useEffect, useState } from 'react';
import { AlunoContext } from '../../context/AlunoContext';
import { InstrutorContext } from '../../context/InstrutorContext';

const itemHeigth = 48;
const itemPaddingTop = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: itemHeigth * 4.5 + itemPaddingTop,
      width: 250,
    },
  },
};


interface ICadastrarFeedback {
  idAluno: string,
  descricao: string,
  tipo: string
}

export const CadastrarFeedback = () => {
  const { getAlunos, alunos } = useContext(AlunoContext);
  const { cadastrarFeedback } = useContext(InstrutorContext);

  const [filtroQA, setFiltroQA] = useState<boolean>(false);
  const [filtroFront, setFiltroFront] = useState<boolean>(false);
  const [filtroBack, setFiltroBack] = useState<boolean>(false);

  const filtradoQA = alunos.filter((aluno) => { if(aluno.stack === "QA") return aluno })
  const filtradoFront = alunos.filter((aluno) => { if(aluno.stack === "FRONTEND") return aluno })
  const filtradoBack = alunos.filter((aluno) => { if(aluno.stack === "BACKEND") return aluno })

  useEffect(() => { getAlunos(); }, [])

  const {register, handleSubmit, formState:{errors}} = useForm<ICadastrarFeedback>({
    resolver: yupResolver(CadastrarFeedbackSchema)
  })

  const resetFiltros = () => {
    setFiltroBack(false)
    setFiltroFront(false)
    setFiltroQA(false)
  }

  const cadastrarFeedbacks = (data:ICadastrarFeedback ) => {
    const feedback = {idAluno: parseInt(data.idAluno),descricao: data.descricao, tipo: data.tipo}
    cadastrarFeedback(feedback)
  }
  
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  if(infosUsuario.cargo !== "Instrutor") return <Navigate to="/"/>
  
  return (
    <>
      <Header/>

      <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height:"calc(100vh - 200px)" }}>
        <Titulo texto="Cadastrar feedback"/>

        <Box component="form" onSubmit={handleSubmit(cadastrarFeedbacks)} sx={{ display: { xs:"flex", md:"flex" },flexDirection:"column",alignItems:"center",backgroundColor: "#fff", width: { xs:"90%", md:"35%" }, borderRadius: "10px", padding: { xs: 5, md: 5 }, boxShadow: "10px 10px 10px #2f407ccf",gap:2 }}>
          <img  src={logo} alt="" width={150} />
          <Stack component="div" spacing={2} sx={{ width:{ xs:"100%", md:"100%" }, display: "flex", alignItems:{ xs:"start", md:"start" }}}>

            <FormControl variant="filled">
              <FormLabel sx={{color:"#1D58F9",fontWeight:"500",marginBottom:"10px"}} id="demo-controlled-radio-buttons-group">Filtrar alunos por stack:</FormLabel>

              <Box sx={{display:"flex", alignItems: "center", gap:3}}>

                <Box color="primary" sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="QA" id="qa" name="stack" onClick={() => { 
                      setFiltroQA(true)
                      setFiltroBack(false)
                      setFiltroFront(false)
                    }} />
                    <Typography sx={{fontWeight:"700"}}>QA</Typography>
                  </Stack>
                </Box>

                <Box sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="BACKEND" id="backend" name="stack" onClick={() => { 
                      setFiltroBack(true) 
                      setFiltroFront(false)
                      setFiltroQA(false)
                    }} />
                    <Typography sx={{fontWeight:"700"}}>Back-End</Typography>
                  </Stack>
                </Box>

                <Box sx={{display:"flex",flexDirection:"column", gap:1,color:"#1D58F9"}}>
                  <Stack spacing={2} direction="row">
                    <input type="radio" value="FRONTEND" id="frontend" name="stack" onClick={() => { 
                      setFiltroFront(true) 
                      setFiltroQA(false)
                      setFiltroBack(false)
                    }} />
                    <Typography sx={{fontWeight:"700"}}>Front-End</Typography>
                  </Stack>
                </Box>
                
                <Button type="button" size="small" variant="contained" onClick={resetFiltros}>Limpar filtros</Button>
              </Box>
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs:"100%", md:"100%" }}}>
              <InputLabel id="aluno">Selecione aluno</InputLabel>
              <Select MenuProps={MenuProps} labelId="demo-simple-select-filled-label" defaultValue="initial-aluno" id="idAluno" {...register("idAluno")}>
                <MenuItem value="initial-aluno" disabled><em>Selecione o Aluno</em></MenuItem>
                {filtroQA ? filtradoQA.map((aluno) => ( <MenuItem key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> )) 
                : filtroFront ? filtradoFront.map((aluno) => ( <MenuItem key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> )) 
                : filtroBack ? filtradoBack.map((aluno) => ( <MenuItem key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> )) 
                : alunos.map((aluno) => ( <MenuItem key={aluno.idAluno} value={aluno.idAluno}>{aluno.nome}</MenuItem> ))
                }
              </Select>
              {errors.idAluno && <Typography id="erro-cargo01" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px",whiteSpace:"nowrap"}} color="error">{errors.idAluno.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs:"100%", md:"100%" }}}>
              <TextField id="descricao" {...register("descricao")} error={!!errors.descricao} label="Digite uma descrição" placeholder="Digite uma descrição" multiline variant="filled" />
              {errors.descricao && <Typography id="erro-cargo01" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px",whiteSpace:"nowrap"}} color="error">{errors.descricao.message}</Typography>}
            </FormControl>

            <FormControl variant="filled" sx={{ width: { xs:"100%", md:"100%" }}}>
              <InputLabel id="status">Status</InputLabel>
              <Select labelId="demo-simple-select-filled-label" id="status" defaultValue="initial-status" error={!!errors.tipo} {...register("tipo")}>
                <MenuItem value="initial-status" disabled><em>Selecione o Status</em></MenuItem>
                <MenuItem value="POSITIVO">Positivo</MenuItem>
                <MenuItem value="ATENCAO">Atencao</MenuItem>
              </Select>
              {errors.tipo && <Typography id="erro-cargo01" sx={{fontWeight:"500", display: "inline-block", marginTop: "5px",whiteSpace:"nowrap"}} color="error">{errors.tipo.message}</Typography>}
            </FormControl>
          </Stack>

          <BotaoAzul texto="Enviar"/>
        </Box>
      </Box> 
    </>
  )
}
