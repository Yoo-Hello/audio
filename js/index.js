document.addEventListener('readystatechange',function(){
    if(document.readyState==='complete'){
    	//var obj={a:1,b:2}
    	//这是一个虚假的例子
    	// el.onclick=function(){
    	// 	obj.a=4;
    	// }
    	// obj.onAchange=function(){
    	// 	div.style.height=16*this.a+"px";
    	// }
    	//audio对象的属性方法和事件
    	var audio=document.querySelector('audio');
    	// console.log(audio);
    	// var play=document.querySelector('#play');
    	// var dian=document.querySelector('.dian');
    	// var mute=document.querySelector('#mute');
    	// var timet=document.querySelector('.timet');
    	// var timetPosition=document.querySelector('.timetPosition');
     //  var gdt=document.querySelector('.gdt');
     var spanvolume=document.querySelector('#spanvolume');
     var spanvolumeop=document.querySelector('#spanvolumeop');
     var spanvolumebar=document.querySelector('#spanvolumebar');
     var spanmute=document.querySelector('#spanmute');
     var btnplay=document.querySelector('#btnplay');
     var downloadbar=document.querySelector('#downloadbar');
     var spanprogress_op=document.querySelector('#spanprogress_op');
     var spanplaybar=document.querySelector('#spanplaybar');
     var divsonglist=document.querySelector('#divsonglist');
     var musicname=document.querySelector("#music_name");
     var prevbt=document.querySelector('.prev_bt');
     var nextbt=document.querySelector('.next_bt');
     var btnPlayway=document.querySelector('#btnPlayway');
     var divselect=document.querySelector('#divselect');
     var num;

     //添加列表
     var yinyueku=[{name:"바람이나 좀 쐐 (吹吹风)",src:"ccf.mp3",geshou:"gary",times:"03:42"},{name:"또 하루 (feat. Gaeko) (又一天)",src:"yyt.mp3",geshou:"gary",times:"03:37"},{name:"我的天空",src:"wdtk.mp3",geshou:"南征北战",times:"03:54"},{name:"最初的梦想",src:"zcdmx.mp3",geshou:"范玮琪",times:"04:56"},{name:"时光隧道",src:"sgsd.mp3",geshou:"陈奕迅",times:"04:20"},{name:"あなたにおくるアイの歌",src:"001.mp3",geshou:"egoist - Departures",times:"04:15"},{name:"你把我灌醉",src:"nbwgz.mp3",geshou:"G.E.M. 邓紫棋",times:"05:02"},{name:"Back to December",src:"Back to December.mp3",geshou:"Taylor Swift",times:"04:54"},{name:"碌咔",src:"lk.mp3",geshou:"陈奕迅",times:"03:36"}];
    var addli=function(){
        var el=" ";
        for(var i=0;i<yinyueku.length;i++){
            el += '<li mid="j0" class=""><strong class="music_name" title="'+yinyueku[i].name+'">'+yinyueku[i].name+'</strong> <strong class="singer_name" title="'+yinyueku[i].geshou+'">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].times+'</strong><div class="list_cp"><strongclass="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>'
        }
        divsonglist.firstElementChild.innerHTML=el;

        //列表点击换歌
        var list=divsonglist.firstElementChild.children;//获取div下的第一个子元素的所有子元素
        for(var i=0;i<list.length;i++){
            list[i].index=i;
            list[i].onclick=function(){
                num=this.index;
               audio.src=yinyueku[this.index].src;
               audio.play();
               btnplay.classList.add("pause_bt");
               btnplay.classList.remove("play_bt");
               for(var j=0;j<list.length;j++){
                   list[j].classList.remove("play_current");
               }
               list[this.index].classList.add("play_current");

            }
            //移上移出效果
            list[i].onmouseover=function(){
                list[this.index].classList.add("play_hover");
            }
            list[i].onmouseout=function(){
                list[this.index].classList.remove("play_hover");
            }


        //上一页下一页
        

            prevbt.onclick=function(){
                if(num==undefined){return}
                num--;
                if(num<0){
                    num=list.length-1;
                }
                audio.src=yinyueku[num].src;
                for(var j=0;j<list.length;j++){
                   list[j].classList.remove("play_current");
                }
                list[num].classList.add("play_current");
                btnplay.classList.add("pause_bt");
                audio.play();
            }
            nextbt.onclick=function(){
                if(num==undefined){return}
                num++;
                if(num>list.length-1){
                    num=0;
                }
                audio.src=yinyueku[num].src;
                for(var j=0;j<list.length;j++){
                   list[j].classList.remove("play_current");
                }
                list[num].classList.add("play_current");
                btnplay.classList.add("pause_bt");
                audio.play();
            }
        }
    }
    addli();

     
     
     //显示有多少首歌
     var spansongnum1=document.querySelector('#spansongnum1');
     console.log(spansongnum1)
     spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>'

      //滚动条控制声音
      spanvolume.onclick=function(e){
        var ev=e||event;
        var x=ev.offsetX/this.offsetWidth;
        audio.volume=x;
      }
      //进度条点跟随音量变化
      audio.onvolumechange=function(){
        var v=audio.volume*100;
        spanvolumeop.style.left=v+"%";
        spanvolumebar.style.width=v+"%";
        if(audio.volume === 0){
          mute.classList.add("off");
        }else{
          mute.classList.remove("off");
        }
      }
    	//静音
    	spanmute.onclick=(function(){
    		var stop;
    		return function(){
    			if(audio.volume!=0){
    				stop=audio.volume;
    				audio.volume=0;
    			}else{
    				audio.volume=stop;
    			}
    		}
    	})();
      //点击播放暂停
    	btnplay.onclick=function(){
            if(num==undefined){return}
            if(audio.paused){
    			audio.play();
                btnplay.classList.add("pause_bt");
                btnplay.classList.remove("play_bt")
    		}else{
    			audio.pause();
                btnplay.classList.add("play_bt");
                btnplay.classList.remove("pause_bt")
    		}
    	}
    	// console.dir('audio')
    	//播放进度条
    	downloadbar.onclick=function(e){
    		var ev=e||window.event;
    		audio.currentTime=ev.offsetX/this.offsetWidth*audio.duration;
    	}
    	audio.ontimeupdate=function(){
    		var x=this.currentTime/this.duration*downloadbar.offsetWidth-spanprogress_op.offsetWidth;
    		spanprogress_op.style.left=x+"px";
            spanplaybar.style.width=x+"px";
    	}

    	//切歌
    	// var qiege=document.querySelector('#qiege');
    	// qiege.onclick=function(){
    	// 	audio.src="./ssz.mp3";
    	// }

    	
    	

    }
    //属性：
    //src:歌曲的地址 改掉src会加载另外一首歌
    //paused 布尔值 如果audio处于暂停状态 为true
    //ended 布尔值 如果audio播放完毕  为true
    //currentTime 歌曲的播放进度
    //duration 歌曲的总播放时长
    //currentTime 当前播放时间
    //volume 音量


    //方法
    //play() pause()
    //事件
    //ontimeupdate  onplay  onpause
    //onsongchange 
},false)