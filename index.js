
var top250 = {
  init: function(){
    this.$element = $('#top250')
    this.isLoading = false
    this.isFinish = false
    this.index = 0
    this.count = 20
    this.clock
    
    this.bind()
    this.start()
  },
  isToBottom: function(){
    return this.$element.find('.container').height() <= this.$element.height() + this.$element.scrollTop() + 20
  },
  bind: function(){
    var _this = this
    this.$element.scroll(function(){
      if(_this.clock){clearTimeout(_this.clock)}
      _this.clock = setTimeout(function(){
        if(_this.isToBottom() && !_this.isFinish && !_this.isLoading ){
          _this.start()
        }
      },100)
    })
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData: function(callback){
    var _this = this
    _this.isLoading = true
    _this.$element.find('.loading').show()
      $.ajax({
      url: 'https://api.douban.com/v2/movie/top250',
      type: 'GET',
      data: {
        start: _this.index,
        count: _this.count
      },
      dataType: 'jsonp'
    }).done(function(ret){
      console.log(ret)
      _this.index += 20
      if(_this.index >= ret.total){
        _this.isFinish = true
      }
      callback(ret)
    }).fail(function(){
      console.log('error')
    }).always(function(){
      _this.isLoading = false
      _this.$element.find('.loading').hide()
    })
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      var tpl = '<div class="item">'
      tpl += '<a href="#">'
      tpl += '<div class="cover">'
      tpl += '<img src="" alt="">'
      tpl += '</div>'
      tpl += '<div class="detail">'
      tpl += '<h2></h2>'
      tpl += '<div class="extra"><span class="score"></span>分/<span class="collect"></span>收藏</div>'
      tpl += '<div class="extra"><span class="year"></span>/ <span class="type"></span></div>'
      tpl += '<div class="extra">导演: <span class="director"></span></div>'
      tpl += '<div class="extra">主演： <span class="actor"></span></div>'
      tpl += '</div>'
      tpl += '</a>'
      tpl += '</div>'

  var $node = $(tpl)
  $node.find('.cover img').attr('src',movie.images.medium)
  $node.find('.detail h2').text(movie.title)
  $node.find('.score').text(movie.rating.average)
  $node.find('.collect').text(movie.collect_count)
  $node.find('.year').text(movie.year)
  $node.find('.type').text(movie.genres.join('/'))
  $node.find('.director').text(function(){
    var directorsArr = []
    movie.directors.forEach(function(item){
      directorsArr.push(item.name)
    })
    return directorsArr.join('、')
  })
  $node.find('.actor').text(function(){
    var actorArr= []
    movie.casts.forEach(function(item){
      actorArr.push(item.name)
    })
    return actorArr.join('、')
  }) 
      _this.$element.find('.container').append($node)
    })
  }
}

var usBox = {
  init: function(){
    this.$element = $('#beimei')
    this.start()
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData: function(callback){
    var _this = this
    if(_this.isLoading) return;
    _this.isLoading = true
    _this.$element.find('.loading').show()
      $.ajax({
      url: 'https://api.douban.com/v2/movie/us_box',
      type: 'GET',
      dataType: 'jsonp'
    }).done(function(ret){
       callback(ret)
    }).fail(function(){
      console.log('error')
    }).always(function(){
      _this.$element.find('.loading').hide()
    })
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      movie = movie.subject
      var tpl = '<div class="item">'
      tpl += '<a href="#">'
      tpl += '<div class="cover">'
      tpl += '<img src="" alt="">'
      tpl += '</div>'
      tpl += '<div class="detail">'
      tpl += '<h2></h2>'
      tpl += '<div class="extra"><span class="score"></span>分/<span class="collect"></span>收藏</div>'
      tpl += '<div class="extra"><span class="year"></span>/ <span class="type"></span></div>'
      tpl += '<div class="extra">导演: <span class="director"></span></div>'
      tpl += '<div class="extra">主演： <span class="actor"></span></div>'
      tpl += '</div>'
      tpl += '</a>'
      tpl += '</div>'

  var $node = $(tpl)
  $node.find('.cover img').attr('src',movie.images.medium)
  $node.find('.detail h2').text(movie.title)
  $node.find('.score').text(movie.rating.average)
  $node.find('.collect').text(movie.collect_count)
  $node.find('.year').text(movie.year)
  $node.find('.type').text(movie.genres.join('/'))
  $node.find('.director').text(function(){
    var directorsArr = []
    movie.directors.forEach(function(item){
      directorsArr.push(item.name)
    })
    return directorsArr.join('、')
  })
  $node.find('.actor').text(function(){
    var actorArr= []
    movie.casts.forEach(function(item){
      actorArr.push(item.name)
    })
    return actorArr.join('、')
  }) 
      _this.$element.find('.container').append($node)
    })
  }
}

var search = {
  init: function(){
    this.$element = $('#search')
    this.keyword = ''
    this.bind()
    this.start()
  },
  bind: function(){
    var _this = this
    this.$element.find('.button').click(function(){
      _this.keyword = _this.$element.find('input').val()
      _this.start()
    })
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },
  getData: function(callback){
    var _this = this
    _this.$element.find('.loading').show()
      $.ajax({
      url: 'https://api.douban.com/v2/movie/search',
      data: {
        q: _this.keyword
      },
      type: 'GET',
      dataType: 'jsonp'
    }).done(function(ret){
       callback(ret)
    }).fail(function(){
      console.log('error')
    }).always(function(){
      _this.$element.find('.loading').hide()
    })
  }, 
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      var tpl = '<div class="item">'
      tpl += '<a href="#">'
      tpl += '<div class="cover">'
      tpl += '<img src="" alt="">'
      tpl += '</div>'
      tpl += '<div class="detail">'
      tpl += '<h2></h2>'
      tpl += '<div class="extra"><span class="score"></span>分/<span class="collect"></span>收藏</div>'
      tpl += '<div class="extra"><span class="year"></span>/ <span class="type"></span></div>'
      tpl += '<div class="extra">导演: <span class="director"></span></div>'
      tpl += '<div class="extra">主演： <span class="actor"></span></div>'
      tpl += '</div>'
      tpl += '</a>'
      tpl += '</div>'

  var $node = $(tpl)
  $node.find('.cover img').attr('src',movie.images.medium)
  $node.find('.detail h2').text(movie.title)
  $node.find('.score').text(movie.rating.average)
  $node.find('.collect').text(movie.collect_count)
  $node.find('.year').text(movie.year)
  $node.find('.type').text(movie.genres.join('/'))
  $node.find('.director').text(function(){
    var directorsArr = []
    movie.directors.forEach(function(item){
      directorsArr.push(item.name)
    })
    return directorsArr.join('、')
  })
  $node.find('.actor').text(function(){
    var actorArr= []
    movie.casts.forEach(function(item){
      actorArr.push(item.name)
    })
    return actorArr.join('、')
  }) 
      _this.$element.find('.search-result').append($node)
    })
  }
}

var app = {
  init: function(){
    this.$tabs = $('footer>div')
    this.$panels = $('section')
    this.bind()
    top250.init()
    usBox.init()
    search.init()
  }, 
  bind: function(){
    var _this = this
    this.$tabs.click(function(){
      $(this).addClass('active').siblings().removeClass('active')
      _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
    })   
  }
}
app.init()




// $('footer>div').click(function(){
//   var index = $(this).index()
//   $('section').hide().eq(index).fadeIn()
//   $(this).addClass('active').siblings().removeClass('active')
// })

// var index = 0
// var isLoading = false
// start()

// function start(){
// if(isLoading) return
// isLoading = true
// $('.loading').show()
//   $.ajax({
//   url: 'https://api.douban.com/v2/movie/top250',
//   type: 'GET',
//   data: {
//     start: index,
//     count: 20
//   },
//   dataType: 'jsonp'
// }).done(function(ret){
//   console.log(ret)
//   setData(ret)
//   index += 20
// }).fail(function(){
//   console.log('error')
// }).always(function(){
//   isLoading = false
//   $('.loading').hide()
// })
// }

// var clock
// $('main').scroll(function(){
//   if(clock){
//     clearTimeout(clock)
//   }
//   clock = setTimeout(function(){
//     if($('section').eq(0).height() -10 <= $('main').scrollTop() + $('main').height()){
//       start()
//     }
//   },300)
// })


// function setData(data){
//   data.subjects.forEach(function(movie){
//     var tpl = '<div class="item">'
//         tpl += '<a href="#">'
//         tpl += '<div class="cover">'
//         tpl += '<img src="" alt="">'
//         tpl += '</div>'
//         tpl += '<div class="detail">'
//         tpl += '<h2></h2>'
//         tpl += '<div class="extra"><span class="score"></span>分/<span class="collect"></span>收藏</div>'
//         tpl += '<div class="extra"><span class="year"></span>/ <span class="type"></span></div>'
//         tpl += '<div class="extra">导演: <span class="director"></span></div>'
//         tpl += '<div class="extra">主演： <span class="actor"></span></div>'
//         tpl += '</div>'
//         tpl += '</a>'
//         tpl += '</div>'

//     var $node = $(tpl)
//     $node.find('.cover img').attr('src',movie.images.medium)
//     $node.find('.detail h2').text(movie.title)
//     $node.find('.score').text(movie.rating.average)
//     $node.find('.collect').text(movie.collect_count)
//     $node.find('.year').text(movie.year)
//     $node.find('.type').text(movie.genres.join('/'))
//     $node.find('.director').text(function(){
//       var directorsArr = []
//       movie.directors.forEach(function(item){
//         directorsArr.push(item.name)
//       })
//       return directorsArr.join('、')
//     })
//     $node.find('.actor').text(function(){
//       var actorArr= []
//       movie.casts.forEach(function(item){
//         actorArr.push(item.name)
//       })
//       return actorArr.join('、')
//     })

//     $('.container').eq(0).append($node)
//   })
// }