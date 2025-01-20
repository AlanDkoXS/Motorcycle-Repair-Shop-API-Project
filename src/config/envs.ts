process.loadEnvFile();
import { get } from "env-var";

// src/config/envs.ts
export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    USERNAME_DATABASE: get("USERNAME_DATABASE").required().asString(),
    PASSWORD_DATABASE: get("PASSWORD_DATABASE").required().asString(),
    DATABASE: get("DATABASE").required().asString(),
    PORT_DATABASE: get("PORT_DATABASE").required().asPortNumber(),
    HOST_DATABASE: get("HOST_DATABASE").required().asString(),
    JWT_SEED: get("JWT_SEED").required().asString(), // Agregar esta línea
    JWT_EXPIRE_IN: get("JWT_EXPIRE_IN").required().asString(),
}
