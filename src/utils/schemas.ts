import * as  yup from "yup";

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("Por favor, digite seu e-mail")
    .email("Por favor, digite um e-mail válido"),
  senha: yup
    .string()
    .required("Por favor, digite sua senha")
    .min(3, "A senha deve ter no mínimo 3 caracteres")
});

export const alunoSchema = yup.object().shape({
  nomeCompletoAluno: yup
    .string()
    .required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  emailAluno: yup
    .string()
    .required("Por favor, digite seu e-mail")
    .email("Por favor, digite um e-mail válido"),
  selectAluno: yup
    .string()
    .required("Por favor, escolha uns dos tipos de trilha."),
});

export const colaboradorSchema = yup.object().shape({
  nomeCompletoColaborador: yup
    .string()
    .required("Por favor, digite seu nome completo").min(3,"O nome deve conter no mínimo 3 caracteres"),
  emailColaborador: yup
    .string()
    .required("Por favor, digite seu e-mail")
    .email("Por favor, digite um e-mail válido"),
  tipoPerfil: yup
    .string()
    .required("Por favor, escolha uns dos tipos de perfil."),
});