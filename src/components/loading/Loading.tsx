import React from "react";
import styles from "./styles.module.scss";

export interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text }) => (
  <div className={styles.wrapper}>{text ?? "" ? text : "Loading..."}</div>
);
