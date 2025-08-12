# 离线安装开发环境

目前单位的电脑的操作系统是 win7 系统，而 win7 系统下的 nodejs 版本最高只能是 13.14 版本，这个版本的 nodejs 是完全不能运行基于 vue-cli 脚手架搭建的 vue3 项目。所以在这样的背景下，我们需要升级 nodejs 版本，同时还需要全局安装 yarn。

node 和 yarn 存放目录：ftp 下/andy/vue3 离线环境安装包

---

## 安装前端基础框架开发环境

### 1、升级 nodejs 版本

目前 win7 系统最高 nodejs 版本是 13.14 版本，我们目前至少需要安装的 nodejs 版本是 16 版本及以上，所以首先是需要在系统中卸载安装的老版本 nodejs。目前我们采用的是手动解压缩安装 nodejs，这里需要注意的是：如果一开始电脑上没有安装 nodejs，那么必须先安装一个 16 版本下的 nodejs，然后再通过上述方式升级 nodejs，否则安装是不成功的。

- 第一步：在 nodejs 官网下载相应版本的 nodejs 版本 [https://registry.npmmirror.com/binary.html?path=node/v16.20.0/](https://registry.npmmirror.com/binary.html?path=node/v16.20.0/)，我们这里用的是 16.20.0 版本，注意是要下载 windows 版本的 x64 的 nodejs。

![下载nodejs解压缩文件](/images/offlineEnv/install1.png)

- 第二步：将下载的 nodejs 解压缩文件拷贝到单位中(叫运维同事帮忙拷贝)。

- 第三步：解压 nodejs 解压缩文件，将解压后的所有文件，替换原来安装的 nodejs 目录下的所有文件。

![解压nodejs文件](/images/offlineEnv/install2.png)

- 第四步：添加环境变量 NODE_SKIP_PLATFORM_CHECK 为 1，跳过 windows 系统平台检测。

![添加环境变量](/images/offlineEnv/install3.png)

- 第五步：重启 windows，输入 node -v，查看 nodejs 版本，这个时候就会是 v16.20.0 版本了。

- 2、全局安装 yarn。

- 首先在互联网上下载 yarn 安装包，然后拷贝到公安网，点击安装(傻瓜式安装)。安装完成之后，要去看一下是否已经添加了环境变量，默认是会添加的。

![下载yarn安装包](/images/offlineEnv/install4.png)

- 3、将 base-frame 前端基础框架拷贝到公安网。

- 4、执行 yarn serve 启动项目，可能会报错，提示\node_modules@achrinza\node-ipc\entities\Defaults.js 文件报错。这时我们需要修改这个文件，添加一行代码：os.hostname = () => 'localhost';即可。

![修改默认主机名](/images/offlineEnv/install5.png)

- 5、重新执行 yarn serve 启动项目，项目就能运行了。
