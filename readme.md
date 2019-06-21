
## 开发环境
### 拉取git代码
>git clone https://github.com/zhixiangw/quick-start-react-app-antd.git

### 安装依赖
> npm install

>如果没有npm，则需要安装node,版本11,我本地环境用的11，最好匹配，安装好node后，重新npm,依赖装完后，运行下面的指令

```js
// 启动index页面
npm start --env=index
// 启动下载页面
npm start --env=download
```
> 启动完成后，访问本地地址 ```localhost:2333``` 就能访问了

## 生产环境
```js
npm run clean
npm run build --env=index
npm run build --env=download
```
