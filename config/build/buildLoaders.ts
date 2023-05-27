import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

const IMAGE_FILES_PATTERN = /\.(jpg|jpeg|png|gif|svg)$/i;

function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { paths, isDev } = options;

  const typeScriptLoader = {
    include: paths.src,
    test: /\.tsx?$/,
    use: 'ts-loader',
  };

  const cssLoaders = {
    include: paths.src,
    test: /\.(sass|css|scss)$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.modules')),
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            localIdentContext: paths.src,
          },
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer()],
          },
        },
      },
      'sass-loader',
    ],
  };

  const assetsLoader = {
    include: paths.assetsFrom,
    test: IMAGE_FILES_PATTERN,
    use: {
      loader: 'url-loader',
    },
  };

  return [typeScriptLoader, cssLoaders, assetsLoader];
}

export default buildLoaders;
