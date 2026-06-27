import next from 'eslint-config-next';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
  },
  ...next,
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
