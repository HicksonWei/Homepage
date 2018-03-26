//chart.js
let ctx = document.getElementById("myChart");
let halt = false;
let chartData = {
  type: 'horizontalBar',
  data: {
    labels: ["HTML", "CSS", "jQuery", "Gulp", "Git", "Bootstrap 4", "Node.js", "Vue.js"],
    datasets: [{
      label: 'Scores',
      data: [75, 70, 70, 75, 70, 65, 65, 70],
      backgroundColor: [
        pattern.draw('dot', 'rgba(255, 99, 132, 0.8)'),
        pattern.draw('dot', 'rgba(54, 162, 235, 0.8)'),
        pattern.draw('dot', 'rgba(255, 206, 86, 0.8)'),
        pattern.draw('dot', 'rgba(75, 192, 192, 0.8)'),
        pattern.draw('dot', 'rgba(153, 102, 255, 0.8)'),
        pattern.draw('dot', 'rgba(255, 159, 64, 0.8)'),
        pattern.draw('dot', 'rgba(100, 234, 28, 0.8)'),
        pattern.draw('dot', 'rgba(235, 177, 239, 0.8)'),
      ],
      borderWidth: 1
    }]
  },
  options: {
    animation: {
      duration: 5000
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 100
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
};

$(document).ready(function(){
  
  // 移至指定位置
  $('.top').click(function (e) {
    e.preventDefault();
    let topPos = $('header').offset().top;
    $('html, body').animate({ scrollTop: topPos }, 1000);
  });
  $('.move').click(function(e) {
    e.preventDefault();
    let target = $(this).attr('href');
    let targetPos = $(target).offset().top;
    console.log(targetPos);
    $('html, body').animate({ scrollTop: targetPos }, 1000);
  });

  $(window).scroll(function() {
    let scrollPos = $(window).scrollTop();
    let windowHeight = $(window).height();
    let chartTrigger = $('.skills').offset().top;

    //chart.js 出現
    if(scrollPos + windowHeight/2 >= chartTrigger && halt === false){
      let myChart = new Chart(ctx, chartData);
      halt = true;
    }
    
    // 各區塊內容出現
    $('.animated').each(function () {
      let thisPos = $(this).offset().top;
      if ((scrollPos + windowHeight / 2) >= thisPos) {
        $(this).addClass('fadeIn');
      }
    });

    // 時間軸
    let timelineTop = $('#experience').offset().top;
    if (timelineTop <= (scrollPos + windowHeight / 2) && scrollPos <= timelineTop + 50){
      $('.bar').each(function () {
        let long = (scrollPos-timelineTop+(windowHeight/2))/(windowHeight/2)*100;
        $(this).css('height', long + '%');
      });
    }

    // works 背景橫移
    $('.works-bg').css('background-position-x', -scrollPos / 2 + 'px')
    
  });

});