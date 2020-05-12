# electron with sqlite3


## F&Q

1. 让本地支持 sqlite3 配置
> 不要使用npm，npm会出错，cnpm才ok。安装成功后，就可以顺利使用sqlite

```
cnpm install sqlite3@latest --build-from-source --runtime=electron --target=8.2.5 --dist-url=https://atom.io/download/electron --save
```
