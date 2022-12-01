import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";

import { TableCell, tableCellClasses, TableRow, Typography, Box, Paper, TableContainer, Table, TableBody, Button, TablePagination,styled } from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Navigate, useNavigate } from "react-router-dom";
import { AlunoContext } from "../../context/AlunoContext";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

interface Column {
  id: "codigo" | "nome" | "stack" | "acoes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "codigo", label: "Código", minWidth: 5 },
  { id: "nome", label: "Nome", minWidth: 5 },
  { id: "stack", label: "Stack", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
]

export const DashboardGestor = () => {
  const { getAlunos, alunos, deletarAluno } = useContext(AlunoContext);
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
  const navigate = useNavigate()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => { getAlunos(); }, [])

  if(infosUsuario.cargo !== "Gestor de Pessoas") return <Navigate to="/"/>

  return (
    <>
      <Header />
     
      <Box sx={{height:"calc(100vh - 200px)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:5}}>
        <Typography  sx={{textAlign: "center", fontSize: { xs:30, md:44 },marginTop:"50px",fontWeight:"700",color:"white"}} variant="h3">Dashboard Alunos</Typography>

        <Paper sx={{ width: { xs:"95%", md:"65%" }, borderRadius: "10px", boxShadow: "10px 10px 10px #2f407ccf" }}>
          <TableContainer sx={{ maxHeight:430 }}>
            <Table stickyHeader aria-label="sticky table">
              <thead>
                <TableRow sx={{ backgroundColor:"#090F27", color: "white" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth,fontWeight:"700", fontSize:"1rem", textAlign: "center" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </thead>
              <TableBody>
                {alunos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
                  <StyledTableRow key={data.idAluno}>
                    <StyledTableCell sx={{textAlign:"center", fontWeight:"600", fontSize: "1rem"}} component="td" scope="row">{data.idAluno}</StyledTableCell>
                    <StyledTableCell id="nome" sx={{textAlign:"center", fontWeight:"600", fontSize: "1rem"}}>{data.nome}</StyledTableCell>  
                    <StyledTableCell id="email" sx={{textAlign:"center", fontWeight:"600", fontSize: "1rem", whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis",maxWidth:"100px"}}>{data.stack}</StyledTableCell>
                    <StyledTableCell id="cargo" sx={{textAlign:"center"}}>
                      <Button id="botao-avaliar-acompanhamento" onClick={() => { navigate("/avaliar-acompanhamneto", {state: data}) }} title="Avaliar acompanhamento"><AssignmentTurnedInIcon/>
                    </Button>
                    <Button id="botao-deletar-gestor" title="Deletar" onClick={() => deletarAluno(data.idAluno)}><DeleteForeverIcon /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination rowsPerPageOptions={[10, 20, 30]} component="div" count={alunos.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
      </Box>
    </>
  );
};
