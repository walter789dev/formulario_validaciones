import { object, ref, string } from "yup";

export const formSchema = object({
    name: string().min(3, "Debe tener como minimo 3 caracteres"),
    email: string().email("Ingrese un correo valido"),
    password: string().min(6, "Debe tener como minimo 6 caracteres"),
    confirmPassword: string().oneOf([ref("password")], "Las contraseñas deben coincidir")
})