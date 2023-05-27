// eslint-disable-next-line import/no-extraneous-dependencies
import { ResolveOptions } from 'webpack';

function buildResolvers(): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
  };
}

export default buildResolvers;
