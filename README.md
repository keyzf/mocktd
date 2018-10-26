## Demo
![Demo image](https://raw.githubusercontent.com/lirongfei123/mock-pro/master/example.jpg)

[Demo地址](https://mock.mlife.top)

## usage
### 开发
#### 下载源码
git clone git@github.com:lirongfei123/mock-pro.git

cd mock-pro
#### 数据库
新建一个数据库

将sql目录里面的sql表结构导入，新建表

修改be/src/config/default.js 里面数据库配置

### 运行

在mock-pro目录下执行 npm install

在mock-pro/be 执行 npm install

执行 npm start

访问 http://localhost:8081

### 部署
执行和开发同样的操作

然后执行be下面的start.js文件

比如forever

forever start start.js

访问 http://localhost:3009

## 其他
[react-state-pro(redux替代方案)](https://github.com/lirongfei123/react-state-pro)
