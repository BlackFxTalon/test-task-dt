import stylistic from '@stylistic/eslint-plugin';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    files: ['app/components/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': ['error', { ignores: ['Header', 'Icon'] }]
    }
  },
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/semi': ['error', 'always']
    }
  }
);
