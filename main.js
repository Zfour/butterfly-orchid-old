;;function AddFavorite(sURL,sTitle){try{window.external.addFavorite(sURL,sTitle)}catch(e){try{window.sidebar.addPanel(sTitle,sURL,"")}catch(e){alert("加入收藏失败，有劳您手动Ctrl+D添加。")}}}let full_page=document.getElementsByClassName("full_page");if(full_page.length!=0){full_page[0].style.background="transparent"}let myDate=new Date();let myMonth=myDate.getMonth()+1;if(myMonth<10){getMonth="0"+String(myMonth)}else{getMonth=String(myMonth)}let getDate=String(myDate.getDate());if(getDate<10){getDate="0"+String(getDate)}else{getDate=String(getDate)}let getMonthDate="S"+getMonth+getDate;let gethistoryurl="/history/json/"+getMonth+".json";$(function(){$.ajax({type:"GET",url:gethistoryurl,dataType:"json",success:function(data){let historystr='<ul style="list-style: none;padding-inline-start: 0;">';$.each(data[getMonthDate],function(i,n){historystr+='<li style="list-style: none;height:100px;">';historystr+='<p style="color: #858585;Font-style:italic;font-weight:lighter;float:left;width:100%;font-size: 14px;margin:0; padding:0;display:inline-block">';historystr+='<i >A.D.</i>'+n.year+'</p>';historystr+='<p style="width:100%;float:left;margin:0; padding:0;display:inline-block" >';historystr+=n.title+'<i style="Font-style:normal;">。</i>';historystr+='</p>'+'</li>'});historystr+='</ul>';$("#history-card").append(historystr)}})});$(function(){let $this=$("#history-news");let scrollTimer;$this.hover(function(){clearInterval(scrollTimer)},function(){scrollTimer=setInterval(function(){scrollNews($this)},4000)}).trigger("mouseleave");function scrollNews(obj){let $self=obj.find("ul");let lineHeight=$self.find("li:first").height();$self.animate({"marginTop":-lineHeight+"px"},200,function(){$self.css({marginTop:10}).find("li:first").appendTo($self)})}});const calendar=new Vue({el:'#calendar',data:{simplemode:true,user:'Zfour',fixed:'fixed',px:'px',x:'',y:'',span1:'',span2:'',month:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],monthchange:[],oneyearbeforeday:'',thisday:'',amonthago:'',aweekago:'',weekdatacore:0,datacore:0,total:0,datadate:'',data:[],positionplusdata:[],firstweek:[],lastweek:[],beforeweek:[],thisweekdatacore:0,mounthbeforeday:0,mounthfirstindex:0,crispedges:'crispedges',thisdayindex:0,amonthagoindex:0,amonthagoweek:[],firstdate:[],first2date:[],montharrbefore:[],monthindex:0,purple:['#ebedf0','#fdcdec','#fc9bd9','#fa6ac5','#f838b2','#f5089f','#c4067e','#92055e','#540336','#48022f','#30021f',],green:['#ebedf0','#f0fff4','#dcffe4','#bef5cb','#85e89d','#34d058','#28a745','#22863a','#176f2c','#165c26','#144620'],blue:['#ebedf0','#f1f8ff','#dbedff','#c8e1ff','#79b8ff','#2188ff','#0366d6','#005cc5','#044289','#032f62','#05264c',],color:['#ebedf0','#fdcdec','#fc9bd9','#fa6ac5','#f838b2','#f5089f','#c4067e','#92055e','#540336','#48022f','#30021f',]},methods:{selectStyle(data,event){$('.angle-wrapper').show();this.span1=data.date;this.span2=data.count;this.x=event.clientX-100;this.y=event.clientY-60},outStyle(){$('.angle-wrapper').hide()},thiscolor(x){if(x===0){let i=parseInt(x/2);return this.color[0]}else if(x<2){return this.color[1]}else if(x<20){let i=parseInt(x/2);return this.color[i]}else{return this.color[9]}},}});let githubapiurl="https://githubapi.ryanchristian.dev/user/"+calendar.user;$(function(){$.ajax({type:"GET",url:githubapiurl,dataType:"json",success:function(data){calendar.data=data.contributions;calendar.total=data.total;calendar.first2date=calendar.data[48];calendar.firstdate=calendar.data[47];calendar.firstweek=data.contributions[0];calendar.lastweek=data.contributions[52];calendar.beforeweek=data.contributions[51];calendar.thisdayindex=calendar.lastweek.length-1;calendar.thisday=calendar.lastweek[calendar.thisdayindex].date;calendar.oneyearbeforeday=calendar.firstweek[0].date;calendar.monthindex=calendar.thisday.substring(5,7)*1;calendar.montharrbefore=calendar.month.splice(calendar.monthindex,12-calendar.monthindex);calendar.monthchange=calendar.montharrbefore.concat(calendar.month);addweek();addlastmonth();function responsiveChart(){;let c=document.getElementById("gitcanvas");let cmessage=document.getElementById("gitmessage");let ctx=c.getContext("2d");c.width=document.getElementById("calendarcanvasbox").offsetWidth;let linemaxwitdh=0.96*c.width/calendar.data.length;c.height=9*linemaxwitdh;let lineminwitdh=0.8*linemaxwitdh;let setposition={x:0.02*c.width,y:0.025*c.width};for(let week in calendar.data){weekdata=calendar.data[week];for(let day in weekdata){let dataitem={date:"",count:"",x:0,y:0};calendar.positionplusdata.push(dataitem);ctx.fillStyle=calendar.thiscolor(weekdata[day].count);setposition.y=Math.round(setposition.y*100)/100;dataitem.date=weekdata[day].date;dataitem.count=weekdata[day].count;dataitem.x=setposition.x;dataitem.y=setposition.y;ctx.fillRect(setposition.x,setposition.y,lineminwitdh,lineminwitdh);setposition.y=setposition.y+linemaxwitdh}setposition.y=0.025*c.width;setposition.x=setposition.x+linemaxwitdh};ctx.font="600  Arial";ctx.fillStyle='#aaa';ctx.fillText("日",0,1.9*linemaxwitdh);ctx.fillText("二",0,3.9*linemaxwitdh);ctx.fillText("四",0,5.9*linemaxwitdh);ctx.fillText("六",0,7.9*linemaxwitdh);let monthindexlist=c.width/24;for(let index in calendar.monthchange){ctx.fillText(calendar.monthchange[index],monthindexlist,0.7*linemaxwitdh);monthindexlist=monthindexlist+c.width/12};cmessage.onmousemove=function(event){$('.angle-wrapper').hide()};c.onmousemove=function(event){$('.angle-wrapper').hide();getMousePos(c,event)};function getMousePos(canvas,event){var rect=canvas.getBoundingClientRect();var x=event.clientX-rect.left*(canvas.width/rect.width);var y=event.clientY-rect.top*(canvas.height/rect.height);for(let item of calendar.positionplusdata){let lenthx=x-item.x;let lenthy=y-item.y;if(0<lenthx&&lenthx<lineminwitdh){if(0<lenthy&&lenthy<lineminwitdh){$('.angle-wrapper').show();calendar.span1=item.date;calendar.span2=item.count;calendar.x=event.clientX-100;calendar.y=event.clientY-60}}}}};responsiveChart();$(window).on('resize',responsiveChart);window.onscroll=function(){$('.angle-wrapper').hide()};function addlastmonth(){if(calendar.thisdayindex===0){thisweekcore(52);thisweekcore(51);thisweekcore(50);thisweekcore(49);thisweekcore(48);calendar.thisweekdatacore+=calendar.firstdate[6].count;calendar.amonthago=calendar.firstdate[6].date}else{thisweekcore(52);thisweekcore(51);thisweekcore(50);thisweekcore(49);thisweek2core();calendar.amonthago=calendar.first2date[calendar.thisdayindex-1].date}}function thisweek2core(){for(let i=calendar.thisdayindex-1;i<calendar.first2date.length;i++){calendar.thisweekdatacore+=calendar.first2date[i].count}}function thisweekcore(index){for(let item of calendar.data[index]){calendar.thisweekdatacore+=item.count}}function addlastweek(){for(let item of calendar.lastweek){calendar.weekdatacore+=item.count}}function addbeforeweek(){for(let i=calendar.thisdayindex;i<calendar.beforeweek.length;i++){calendar.weekdatacore+=calendar.beforeweek[i].count}}function addweek(){if(calendar.thisdayindex===6){calendar.aweekago=calendar.lastweek[0].date;addlastweek()}else{lastweek=data.contributions[51];calendar.aweekago=lastweek[calendar.thisdayindex+1].date;addlastweek();addbeforeweek()}}}})});const catalogMagnet=new Vue({el:'#catalogMagnet',data:{message:'你好！',link:[],postnum:[],img:["https://i.loli.net/2020/11/29/aeOrFVXmQAPSUgN.jpg","https://i.loli.net/2020/11/29/kUy5KNRaIQXCwcY.jpg","https://i.loli.net/2020/11/29/taRHWykQpc3IM1Y.jpg","https://i.loli.net/2020/11/29/8vjtXLdAG1cesO6.jpg","https://i.loli.net/2020/11/29/PkXpOi6zKJa45ne.jpg","https://i.loli.net/2020/11/29/TULzgX85EPBkWOn.jpg","https://i.loli.net/2020/11/29/3wLVQDXcamCyFNM.jpg","https://i.loli.net/2020/11/29/Yl8ek3QdiAjOVgE.jpg",],describe:["日本早安新闻","vue学习记录","我的各种作品","我的学习整理","我的各种教程","我的游戏评测","生活点点滴滴","一切胡思乱想",],figLetColor:{color:'white'},figLetimg:{backgroundImage:'linear-gradient(to bottom,rgba(0, 0, 0, 0.4) 25%,rgba(16,16,16,0) 100%)'},figbackColor:{background:'#000000 URL()'},figShadow:{boxShadow:'inset 3px 3px 18px 0px rgba(50,50,50, 0.4)'},},});catalogMagnet.link=$(".categoryMagnetitem").children().children().children("a");catalogMagnet.postnum=$(".categoryMagnetitem").children().children().children("span");let linecolor=catalogMagnet.figLetColor.color;$("<style type='text/css' id='dynamic-after' />").appendTo("head");$("#dynamic-after").text(".magnetname:after{background:"+linecolor+"!important}");let newsurl="https://www.mxnzp.com/api/news/list?typeId=515&page=1&app_id="+newskey.id+"&app_secret="+newskey.key;$(function(){$.ajax({type:"GET",url:newsurl,dataType:"json",beforeSend:function(XMLHttpRequest){},success:function(data){gamenews.newsvue=data.data;gamenews.newsvue=gamenews.newsvue.slice(0,5)}})});const gamenews=new Vue({el:'#gamenews',data:{current:0,message:'你好！',newsvue:[],listtype:["游戏 ","军事 ","财经 ","科技 ","娱乐 "],listcode:["515","511","509","510","520"],newpostvue:{title:'',ptime:'',content:'',}},methods:{changetype(index){let changeurl="https://www.mxnzp.com/api/news/list?typeId="+this.listcode[index]+"&page=1&app_id="+newskey.id+"&app_secret="+newskey.key;$.ajax({type:"GET",url:changeurl,dataType:"json",beforeSend:function(XMLHttpRequest){},success:function(data){gamenews.newsvue=data.data;gamenews.newsvue=gamenews.newsvue.slice(0,5)}})},addClass:function(index){this.current=index;this.changetype(index)},replace(){for(let i=0;i<gamenews.newpostvue.images.length;i++){let errorlink='/img/404.jpg';let imagehttpslink=gamenews.newpostvue.images[i].imgSrc.replace(/http/g,'https');gamenews.newpostvue.content=gamenews.newpostvue.content.replace(gamenews.newpostvue.images[i].position,'<img src="'+imagehttpslink+'"style="width: 100%;padding: 5% 10%;" alt="">')}},hidemodle(){$("#newsmodal").hide();$(".blackscreen").hide()},getnewsdata(index){$("#newsmodal").show();$(".blackscreen").show();let posturl="https://www.mxnzp.com/api/news/details?newsId="+this.newsvue[index].newsId+"&app_id="+newskey.id+"&app_secret="+newskey.key;$.ajax({type:"GET",url:posturl,dataType:"json",beforeSend:function(XMLHttpRequest){},success:function(data){gamenews.newpostvue=data.data;gamenews.replace()}})},}});let locationurl='https://extreme-ip-lookup.com/json/';let cityname='';let weatherurl='';let userip='';const week=['SUN','MON','TUE','WED','THU','FRI','SAT'];$(function(){$.ajax({type:"GET",url:locationurl,dataType:"json",beforeSend:function(XMLHttpRequest){},success:function(data){cityname=data.city;if(typeof data.city=="undefined"){cityname=data.region}if(typeof data.region=="undefined"){cityname=data.country}userip=data.query;weatherurl='https://api.openweathermap.org/data/2.5/weather/?q='+cityname+'&units=metric&appid='+newskey.weather;getweatherdata()}})});function getweatherdata(){$(function(){$.ajax({type:"GET",url:weatherurl,dataType:"json",beforeSend:function(XMLHttpRequest){},success:function(data){clock.weatherimg='/images/weather/'+data.weather[0].icon+'.png';clock.temperature=data.main.temp+"*C";clock.humidity=data.main.humidity+"%";clock.ip=userip;clock.humidityimg='/images/weather/hu.png';clock.city=data.name;let timerID=setInterval(updateTime,1000);updateTime();clock.clockshow=true;function updateTime(){let cd=new Date();clock.time=zeroPadding(cd.getHours(),2)+':'+zeroPadding(cd.getMinutes(),2)+':'+zeroPadding(cd.getSeconds(),2);clock.date=zeroPadding(cd.getFullYear(),4)+'-'+zeroPadding(cd.getMonth()+1,2)+'-'+zeroPadding(cd.getDate(),2)+' '+week[cd.getDay()];let hamorpm=cd.getHours();let str;if(hamorpm>12){hamorpm-=12;str=" PM"}else{str=" AM"}clock.daylight=str}function zeroPadding(num,digit){let zero='';for(let i=0;i<digit;i++){zero+='0'}return(zero+num).slice(-digit)}updateTime()}})})}const clock=new Vue({el:'#clock',data:{ip:'',time:'',weatherimg:'',temperature:'',humidityimg:'',humidity:'',usaqi:'',city:'',date:'',daylight:'',clockshow:'false'},});if(document.getElementById("calendarcanvasbox").offsetWidth<500){calendar.simplemode=false};