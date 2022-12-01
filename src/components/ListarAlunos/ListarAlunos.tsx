import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Paper, TableContainer, Table, TableRow, TableCell, TableBody, Button, TablePagination, tableCellClasses, Box, Typography, styled } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  { id: "stack", label: "Status", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") },
  { id: "acoes", label: "Ações", minWidth: 5, align: "right", format: (value: number) => value.toLocaleString("en-US") }
];

export const ListarAlunos = ({ alunos, deletarAluno }: any) => {
  const navigate = useNavigate();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <>
      <Box sx={{height:"calc(100vh - 200px)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:5}}>
        <Typography sx={{textAlign: "center", marginTop:"50px",fontWeight:"700",fontSize: { xs:30, md: 44 }, color:"white"}} variant="h3">Dashboard Alunos</Typography>

        <Paper sx={{ width: { xs:"95%", md:"60%" }, borderRadius: "10px", boxShadow: "10px 10px 10px #2f407ccf" }}>
          <TableContainer sx={{ maxHeight:430 }}>
            <Table component="table" stickyHeader aria-label="sticky table">
              <thead>
                <TableRow sx={{ backgroundColor: "#090F27", color: "white" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth, fontWeight: "700", fontSize: "1rem", textAlign: "center" }}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </thead>

              <TableBody>
                {alunos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data: any) => (
                  <StyledTableRow sx={{ ":hover": { opacity: "0.7", cursor: "pointer" } }} key={data.idAluno}>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: data })} id="codigo" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }} component="td" scope="row">{data.idAluno}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: data })} id="nome" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{data.nome}</StyledTableCell>
                    <StyledTableCell onClick={() => navigate("/verificar-aluno", { state: data })} id="stack" sx={{ textAlign: "center", fontWeight: "600", fontSize: "1rem" }}>{data.stack}</StyledTableCell>
                    <StyledTableCell id="acoes" sx={{textAlign:"center"}}>
                      <Button id="botao-deletar-instrutor" title="Deletar" onClick={() => deletarAluno(data.idAluno)}><DeleteForeverIcon /></Button>
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
  )
}