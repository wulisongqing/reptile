var request = require('sync-request')
var cheerio = require('cheerio')


// ES5 定义一个类
// var Movie = function() {
//     this.name = ''
//     this.score = 0
//     this.quote = ''
//     this.ranking = 0
//     this.coverUrl = ''
// }

// ES6 定义一个类
class Movie {
    constructor() {
        // 分别是电影名/评分/引言/排名/封面图片链接
        this.name = ''
        this.score = 0
        this.verb = 0
        this.quote = ''
        this.ranking = 0
        this.coverUrl = ''
    }
}

var log = console.log.bind(console)

var movieFromDiv = (div) => {
    var e = cheerio.load(div)
    var movie = new Movie()
    movie.name = e('.title').text()
    movie.score = e('.rating_num').text()
    movie.quote = e('.inq').text()

    var star = e('.star')
    var starSpan = star.find('span').text()
    var length = starSpan.length
    movie.verb = starSpan.slice(3, length - 3)

    var pic = e('.pic')
    movie.ranking = pic.find('em').text()
    movie.coverUrl = pic.find('img').attr('src')

    return movie
}

var moviesFromUrl = (url) => {
    // 用 GET 方法获取 url 链接的内容
    var r = request('GET', url)
    var body = r.getBody('utf-8')
    // cheerio.load 用来把 HTML 文本解析为一个可以操作的 DOM
    var e = cheerio.load(body)
    log(e)
    // 一共有 25 个 .item
    var movieDivs = e('.item')

    // 循环处理 25 个 .item
    var movies = []
    for (var i = 0; i < movieDivs.length; i++) {
        var div = movieDivs[i]
        // 扔给 movieFromDiv 函数来获取到一个 movie 对象
        var m = movieFromDiv(div)
        movies.push(m)
    }
    return movies
}

var saveMovie = (movies) => {
    // 数据带有缩进的格式，第三个参数表示缩进的空格数
    var s = JSON.stringify(movies, null, 2)
    // 把 json 格式字符串写入到 文件 中
    var fs = require('fs')
    var path = 'douban.txt'
    fs.writeFileSync(path, s)
}

var __main = () => {
    // 主函数
    var movies = []
    for (var i = 0; i < 10; i++) {
        var start = i * 25
        var url =`
                https://movie.douban.com/top250?start=${start}&filter=
        `
        var movieInPage = moviesFromUrl(url)
        movies = [...movies, ...movieInPage]
    }

    saveMovie(movies)
}

__main()
