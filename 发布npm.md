# 发布自己的 npm 库

-   在 npm 注册用户
-   在本地登录 npm 账号: npm login; 然后根据提示输入注册的账号密码
-   发布、更新模块: npm publish
-   撤销发布自己发布过的某个版本代码: npm unpublish <package>@<version>


    如果不是原镜像,需要改回去,我们一般用的是 taobao 的镜像：
    -   npm config set registry https://registry.npmjs.org/
    -   npm config set registry http://registry.npm.taobao.org/

安装:
npm install -g sensitiveWordTrie
