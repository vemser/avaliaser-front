import { createContext, useState } from "react";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

import { API } from "../utils/api";
import { IAluno, IAlunosCadastrados, ICadastroAluno, IChildren } from "../utils/interface";
import { useNavigate } from "react-router-dom";

export const AlunoContext = createContext({} as IAluno);

export const AlunoProvider = ({ children }: IChildren) => {
  const navigate = useNavigate()
  const [alunos, setAlunos] = useState<IAlunosCadastrados[]>([]);

  const criarAluno = async (infosAluno: ICadastroAluno) => {
    try {
      nProgress.start();
      await API.post(`/aluno/cadastrar-aluno?stack=${infosAluno.stack}`, infosAluno, { 
        headers: { Authorization: localStorage.getItem("token") }
       }).then((response) => { 
        console.log(response.data)
        const usuarioLogado = JSON.parse(localStorage.getItem("infoUsuario") || "{}");
        const cargoSplitado = usuarioLogado.cargo.split(" ")[0].toLowerCase();
        navigate(`/dashboard/${cargoSplitado}`);
        toast.success("Aluno cadastrado com sucesso!", toastConfig); 
      })
    } catch (error) {
      toast.error("Campo nulo, ou preenchido de forma incorreta, tente de novo.", toastConfig);
    } finally{
      nProgress.done();
    }
  }

  const getAlunos = async () => {
    try {
      nProgress.start();
      await API.get('/aluno/listar-alunos?page=0&size=10', { 
        headers: { Authorization: localStorage.getItem("token") }
       }).then((response) => { setAlunos(response.data.elementos) })
    } catch (error) {
      toast.error("Houve algum erro", toastConfig);
    } finally{
      nProgress.done();
    }
  }

  const deletarAluno = async (id: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      await API.delete(`/aluno/delete/${id}`);
      toast.success("Aluno desativado com sucesso.", toastConfig);
      getAlunos()
    } catch (error) {
      toast.error('Você não tem autorização para remover este aluno.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AlunoContext.Provider value={{ criarAluno, getAlunos, alunos, deletarAluno }}>
      {children}
    </AlunoContext.Provider>
  );
}