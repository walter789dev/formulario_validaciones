import { ChangeEvent, FC, ReactNode } from "react";
import styles from "./Input.module.css";

interface PropsInput {
  name: string;
  value: string;
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const Input: FC<PropsInput> = ({ name, value, text, onChange, children }) => {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {text}:
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        required
      />
      <p className={styles.message}>{children}</p>
    </div>
  );
};

export default Input;
