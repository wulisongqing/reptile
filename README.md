# reptile
一个爬虫的小demo，数据来源是豆瓣网，主要是想要学习用 sync-request库，采用 同步的方式发送请求并且返回结果 ，并学习用cheerio 库来分析网页数据
爬取的数据的数据如下：
![result](https://github.com/wulisongqing/reptile/blob/master/static/result.png)

关于爬虫的更多思考：可以将数据做成可视化的，比如做一个电影推荐的小程序之类，暂时有这个想法，未来会着手弄一下。可以继续关注我的更新哦。

##运行
开始项目：
npm install
开始爬取数据：
yarn run start
爬取下来的数据将保存在douban.txt文件里面
