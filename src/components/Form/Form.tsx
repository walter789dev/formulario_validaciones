import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Form.module.css";
import { IForm } from "../../types/IForm";
import { formSchema } from "../../schemas/formSchema";
import Swal from "sweetalert2";

const initial: IForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const [form, setForm] = useState<IForm>(initial);
  const [error, setError] = useState<IForm>(initial);

  const handlerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newState = {
      ...form,
      [name]: value,
    };

    try {
      await formSchema.validateAt(name, newState);
      setError(initial);
    } catch (err: any) {
      setError({
        ...initial,
        [name]: err.message,
      });
    }

    setForm(newState);
  };

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await formSchema.validate(form);
      Swal.fire({
        title: "Se ha enviado correctamente",
        icon: "success",
      }).then(() => {
        setForm(initial);
      });
    } catch (e) {
      Swal.fire({
        title: "Debe completar los campos obligatorios",
        icon: "warning",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <h2 className={styles.form__title}>Formulario - manejo de errores</h2>
      <div className={styles.form__inputs}>
        <Input
          name="name"
          text="nombre"
          value={form.name}
          onChange={handlerChange}
        >
          {error.name}
        </Input>
        <Input
          name="email"
          text="correo"
          value={form.email}
          onChange={handlerChange}
        >
          {error.email}
        </Input>
        <Input
          name="password"
          text="contraseña"
          value={form.password}
          onChange={handlerChange}
        >
          {error.password}
        </Input>
        <Input
          name="confirmPassword"
          text="confirmar contraseña"
          value={form.confirmPassword}
          onChange={handlerChange}
        >
          {error.confirmPassword}
        </Input>
        <Button />
      </div>
    </form>
  );
};

export default Form;
