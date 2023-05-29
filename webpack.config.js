import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  //mode: 'production',
  //mode: 'development',
  //target: 'web',
  entry: './src/shared/commodityExtractor.js',
  experiments: {
    outputModule: true, //required to use output.module: true
    topLevelAwait: true
  },
  output: {
    filename: 'commodityExtractor.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
			type: 'module',
		},
		//chunkFormat: 'module',
		module: true,
    clean: true
  },
  devServer: {
    open: '/',
    watchFiles: ['src/shared/*.js', 'src/web/*.html', 'webpack.config.js', 'package.json'],
    static: {
      directory: path.join(__dirname, 'src/web'),
      watch: true,
    },
  },
};