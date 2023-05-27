import path from 'path';
import dotenv from 'dotenv';
import buildWebpackConfig from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

dotenv.config({ path: `${__dirname}/.env.local` });

const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'dist'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  src: path.resolve(__dirname, 'src'),
  assetsFrom: path.resolve(__dirname, 'src', 'assets'),
  assetsTo: path.resolve(__dirname, 'dist', 'assets'),
};

module.exports = (env: BuildEnv) => {
  const mode = env.mode || 'development';
  const port = env.port || 3000;
  const isDev = env.mode === 'development';

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
  });
};
