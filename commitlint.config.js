module.exports = {
  // 继承默认配置
  extends: [
    "@commitlint/config-conventional"
  ],
  // 自定义规则
  rules: {
    "header-max-length": [0, "always", 200],
    'type-case': [1, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'WIP',
        'docs',
        'feat',
        'fix',
        'improvement',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
