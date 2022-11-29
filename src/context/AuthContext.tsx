import { createContext, useState } from "react";

import { IAuth, IChildren, IUsuario, IUsuarioLogado } from "../utils/interface";

import nProgress from 'nprogress';
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as IAuth);

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [tokenAuth, setTokenAuth] = useState<string>(localStorage.getItem("token") || "");
  const [usuarioLogado, setUsuarioLogado] = useState<IUsuarioLogado>({
    cargo: "", idUsuario: 0, email: "", foto: "", nome: ""
  });

  const usuarioLogin = async (infoUser: IUsuario) => {
    try {
      nProgress.start();
      const { data } = await API.post("/auth/login", infoUser);
      localStorage.setItem("token", data);
      toast.success("Seja bem-vindo(a)", toastConfig);
      
      await API.get("/auth/usuario-logado", { 
        headers: { Authorization: localStorage.getItem("token") }
       }).then((response) => {
        setUsuarioLogado(response.data);
        const cargoSplitado = response.data.cargo.split("_")[1].toLowerCase();
        navigate(`/dashboard/${cargoSplitado}`);
        setTokenAuth(data);
      })
    } catch (error) {
      toast.error("Email ou senha incorretos. Login não concluído.", toastConfig);
    } finally {
      nProgress.done();
    }
  }

  return (
    <AuthContext.Provider value={{ tokenAuth, usuarioLogin, usuarioLogado }}>
      {children}
    </AuthContext.Provider>
  );
};