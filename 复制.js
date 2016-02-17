document.addEventListener("readystatechange",function(){
	if(document.readyState==="complete"){
		//如果文档加载完成，则执行下面的代码
		//audio对象的属性方法和事件
		audio=document.querySelector("audio");
		console.dir(audio)//输出audio的原型链
		//属性
		//	src:歌曲的地址  改掉src会去加载另外一首歌曲
		//  paused: 布尔值  如果audio处于暂停状态，则为true;
		//  ended:布尔值    如果audio播放完毕，则为true;
		//  currentTime     歌曲的播放进度
		//  duration        歌曲的总播放时长
		// autoplay         自动播放
		// loop             循环
		//volume            音量
		// 方法
		//  play()  pause()
		//事件
		// ontimeupdate  onplay onpause
		var playpause=document.querySelector("#playpause");
		playpause.onclick=function(){
			if(audio.paused)
					audio.play();
			else
					audio.pause();
		}

	}
	//事件驱动播放和暂停
	audio.onplay=function(){
		playpause.style.cssText="background:red;width:100px;height:100px;"

	}
		audio.onpause = function(){
		playpause.style.background="green";
		}
			var volume=document.querySelector("#vol");
			var volposition=document.querySelector("#volposition");
			var state=document.querySelector("#state");
			var stateposition=document.querySelector("#stateposition");
			//声音控制
			volume.onclick=function(e){
			var ev=e||window.event;
			var v=ev.offsetX/this.offsetWidth;//计算出鼠标点击音量控制条的比例；然后复制给audio.volume;
			audio.volume=v;//事件里面处理逻辑和数据；UI样式在监听事件里面设置；

			}
			audio.onvolumechange=function(){
			//声音的监听事件
				var x=audio.volume*vol.offsetWidth-volposition.offsetWidth/2;
				volposition.style.left=x+"px";
				if(audio.volume===0){
					mute.classList.add("off");
				}else{
					mute.classList.remove("off");
				}
			}
					
			volposition.onclick=function(e){
				var ev=e||window.event
				ev.stopPropagation();
				return false;
			}
			var mute=document.querySelector("#mute");
			//静音功能
			mute.onclick=(function(){
				var oldvol;
				return function(){
				  if(audio.volume!=0){
				  	oldvol=audio.volume;
				  	audio.volume=0;
				  }else{
				  	audio.volume=oldvol;
			  	}
			  }
			})()
	//播放进度条

	state.onclick=function(e){
		var ev=e||window.event;
		audio.currentTime=ev.offsetX/this.offsetWidth*audio.duration;
	}
	audio.ontimeupdate=function(){
		var x=this.currentTime/this.duration*state.offsetWidth-stateposition.offsetWidth/2;
		stateposition.style.left=x+"px";
	}


},false);


//歌曲数组以及列表；
			var yinyueku = [
				{name:"xixixi you",singler:"李晓勇",duration:"4.05",src:"SG.mp3"},
				{name:"love you",singler:"苏文丽",duration:"4:10",src:"006.mp3"}
			];
			var createlist=function(){
				var el="";
				for(var i=0;i<yinyueku.length;i++){
					el+='<li data-src="'+yinyueku[i].src+'"><strong>'+yinyueku[i].name+'</strong><strong class="singer_name">'+yinyueku[i].singler+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong></li>'
				}
				divsonglist.firstElementChild.innerHTML=el;


			}
			createlist();


//清空列表

点击时 赋值空数组  在调用函数  uireset重制UI


setbofangmoshi=function(num)
		{
			currentbofangmoshi=num;
			divselect.style.display="none";
			var data={1:"cycle_single_bt",2:"ordered_bt",3:"cycle_bt",4:"unordered_bt"};
			btnPlayway.className=data[num];
		}

		audio.ontimeupdate=function()
		{	
			var l=audio.currentTime/audio.duration*100;
			spanprogress_op.style.left=l+"%";
			spanplaybar.style.width=l+1+"%";
			if(audio.ended)
			{	
				if(currentbofangmoshi==DANQU)
				{
					audio.play()
				}
				else if(currentbofangmoshi==LIEBIAO)
				{
					nextsong()
				}
				else if(currentbofangmoshi==SUIJI)
				{
					randomsong()
				}
				else if(currentbofangmoshi==SHUNXU)
				{
					if(currentsongindex!=yinyueku.length-1)
					{
						nextsong()
					}
				}
				
			}
		}
