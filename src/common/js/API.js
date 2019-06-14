//接口文件
var baseUrl = '/api';

var news = baseUrl + '/api/4/news/latest'
var newsCont = baseUrl + '/api/4/news/'
var newsBefore = baseUrl + '/api/4/news/before/'
var comment = baseUrl + '/api/4/story/'
var longComment = baseUrl + '/api/4/story/'
var shortComments = baseUrl + '/api/4/story/'

var extraInformation = baseUrl + '/api/4/story-extra/'



export default {
    news,
    newsCont,
    newsBefore,
    comment,
    longComment,
    shortComments,
    extraInformation
}