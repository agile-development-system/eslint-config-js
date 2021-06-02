/*
 * @Author: 锦阳
 * @Create: 2021年05月31日
 */
const GenDoc = require('@ads/cli-plugin-doc');
module.exports = (
    /**
     * 配置参数
     *
     * @returns {GenDoc.RenderOptions}
     */
    async () => {
        const [source] = (await Promise.all([
            GenDoc.getFilesCode({ dir: './lib', files: ['*'] }),
        ]));
        return {
            output: 'README.md',
            helpers: {
                devInstall: true,
                importCode: `// .eslintrc.js
module.exports = {
    extends: [
        '@ads/js',
    ],
};
`,
                remark: `### 添加lint脚本

在\`package.json\`的\`scripts\`下添加lint命令；

\`\`\`json
{
    "scripts":{
        "lint": "eslint --ext .js,.vue,.json src",
        "lint:fix": "eslint --ext .js,.vue,.json src --fix",
    }
}
\`\`\`

### 基于\`lint-staged\`提供增量lint脚本

- 安装\`lint-staged\`包
    \`\`\`
    npm i -D lint-staged
    \`\`\`
- 在\`package.json\`中添加\`pkg['lint-staged']\`脚本
    \`\`\`json
    {
        "lint-staged": {
            "src/**/*.{js,json}": [
                "eslint --fix"
            ]
        }
    }
    \`\`\`

### 使用\`yorkie\`在git声明周期内检测代码格式

- 安装\`yorkie\`包
    \`\`\`
    npm i -D yorkie
    \`\`\`
- 在\`package.json\`中添加\`pkg.gitHooks\`脚本
    \`\`\`json
    {
        "gitHooks": {
            "pre-commit": "lint-staged",
        },
    }
    \`\`\`
`,
                postfixes: [
                    {
                        id: 'source',
                        title: '配置源码',
                        content: GenDoc.renderCode(source),
                    },
                ],
            },
        };
    })();
