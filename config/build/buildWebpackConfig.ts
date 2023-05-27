import { BuildOptions } from './types/config';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildResolvers from './buildResolvers';
import buildDevServer from './buildDevServer';

function buildWebpackConfig(options: BuildOptions) {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
      pathinfo: false,
      clean: true,
    },
    module: {
      rules: buildLoaders(options),
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
    resolve: buildResolvers(),
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimize: !isDev,
    },
    watchOptions: {
      ignored: '**/node_modules',
    },
  };
}

export default buildWebpackConfig;
