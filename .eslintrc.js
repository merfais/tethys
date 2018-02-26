// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //usage
    'arrow-parens': [0],
    'arrow-spacing': [1],
    'arrow-body-style': [0],
    'camelcase': [0],
    'comma-dangle': [1, 'only-multiline'],
    'comma-spacing': [1],
    'consistent-return': [0, {"treatUndefinedAsUnspecified": true}],
    'class-methods-use-this': [0],
    'eol-last': [0, 'unix'],
    'eqeqeq': [2],
    'func-names': [1, 'never'],
    'global-require': [0],
    'guard-for-in': [2],
    'key-spacing': [1],
    'keyword-spacing': [1],
    // SwitchCase https://github.com/eslint/eslint/issues/1797
    'indent': [2, 2, {'SwitchCase': 1}],
    'max-len': [1],
    'new-cap': [1],
    'newline-per-chained-call': [0, {
      'ignoreChainWithDepth': 3
    }],
    'no-bitwise': [0, {
      'allow': ['|', '&']
    }],
    'no-lonely-if': [0],
    'no-mixed-operators': [0, {
      'groups': [
        ['+', '-', '*', '/', '%', '**'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      'allowSamePrecedence': true
    }],
    'no-empty': [1, {
      'allowEmptyCatch': true
    }],
    'no-empty-function': [2],
    'no-else-return': [0],
    'no-trailing-spaces': [2, {
      'skipBlankLines': true
    }],
    'no-new': [1],
    'no-multiple-empty-lines': [1, { 'max': 2, 'maxEOF': 0, 'maxBOF': 0 }],
    'no-multi-str': [0],
    'no-multi-spaces': [1, { ignoreEOLComments: true }],
    'no-unused-vars': [1, {'args': 'none'}],
    'no-unused-expressions': [2, {'allowShortCircuit': true}],
    'no-underscore-dangle': [1, {'allowAfterThis': true}],
    'no-unneeded-ternary': [1],
    'no-restricted-syntax': [1, 'DebuggerStatement'],
    'no-plusplus': [1, { 'allowForLoopAfterthoughts': true }],
    'no-param-reassign': [0, {
      'props': true
    }],
    'no-shadow': [0],
    'object-shorthand': [0],
    'object-curly-spacing': [1],
    'object-curly-newline': [1, { "consistent": true }],
    'operator-linebreak': [0],
    'one-var': [1],
    'one-var-declaration-per-line': [1, 'initializations'],
    'prefer-arrow-callback': [0],
    'prefer-const': [0],
    'prefer-template': [0],
    'prefer-spread': [1],
    'prefer-destructuring': [0],
    'padded-blocks': [0, "never"],
    'quotes': [1, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'quote-props': [1],
    'radix': [1, 'as-needed'],
    'spaced-comment': [1],
    'space-infix-ops': [1],
    'semi': [0],
    'space-before-function-paren': [1, 'never'],
    'space-before-blocks': [1],
  }
}
