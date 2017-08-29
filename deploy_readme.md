# 部署说明

## 服务器
- Jenkins 服务器需要安装 nodejs
- 部署服务器需要 nginx

## 步骤
- 在 Jenkins build 服务器上 git clone 仓库 git@10.9.19.245:f2e/on-boarding.git
- cd 到 ./on-boarding 文件夹
- git checkout 选择 release/0.9.0 分支
- 执行命令 `npm start` （第一次需要安装大量 npm 包，应该很慢，第二次有 node_modules 文件夹后，这步应该很快）
- 执行命令 `npm run build`
- cd 到 dist 文件夹
- 执行命令 `bash ./generateByEnv.sh ${env}` (env是部署的环境，可以是qa, uat, stage, live)
- 将生成的目录 ./dist/${env} 中的所有文件拷贝到需要部署的服务器的对应目录中 (对应线上地址 http://m.ruifusoft.com/onboarding/ 的目录)

## 回滚步骤
- 后续讨论
