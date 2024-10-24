export type TConfig = {
  port: number;
  wsPort?: number;
  wsCtlPort?: number;
  database?: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logging?: boolean;
  };
  redis?: {
    host: string;
    port: number;
    keyPrefix: string;
  };
};

const CONFIG: {
  production: TConfig;
  development: TConfig;
} = {
  production: {
    port: 7111,
  },
  development: {
    port: 7111,
  },
};

export const JWT_SECRET = 'AHS*&2k#LNSSS';
export const expiresIn = '168h';
export const SLAT = 'DSI*3a';

export default {
  ...CONFIG[process.env.NODE_ENV || 'development'],
};
