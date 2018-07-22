function Snake(options){
	this._init(options);
}
Snake.prototype={
	constructor:Snake,
	_init:function(options){
		options=options||{};
		this.len=options.len||4;
		this.wh=options.wh||40;
		this.fillStyle=options.fillStyle||randomColor();
		this.strokeStyle=options.strokeStyle||'black';
		this.dir=options.dir||39;
		this.fps=options.fps||5;
		this.score=0;
		this.snakeBody=[];
		for (var i = 0; i < this.len; i++) {
			var rect=new Rect({
				startX:i*this.wh,
				startY:0,
				rectW:this.wh,
				rectH:this.wh,
				fillStyle:this.fillStyle,
				strokeStyle:this.strokeStyle,
			})
			this.snakeBody.splice(0,0,rect);
		};
		this.head=this.snakeBody[0];
		this.head.fillStyle='red';
		this.createFood();
		this.backGround();
	},
	createFood:function(){
		var maxHor=parseInt(canvas.width/this.wh);
		var maxVir=parseInt(canvas.height/this.wh);
		var isGo=true;
		while(isGo){
			isGo=false;
			var FoodX=parseInt(Math.random()*maxHor)*this.wh;
			var FoodY=parseInt(Math.random()*maxVir)*this.wh;
			for(var i in this.snakeBody){
				var obj=this.snakeBody[i];
				if (obj.startX==FoodX&&obj.startY==FoodY) {
					isGo=true;
					break;
				}
			}
		}
		this.food=new Rect({
				startX:FoodX,
				startY:FoodY,
				rectW:this.wh,
				rectH:this.wh,
				fillStyle:this.fillStyle,
				strokeStyle:this.strokeStyle,
		});
	},
	render:function(ctx,canvas){
		
		this.clearcanvas(canvas);
		for (var i  in this.snakeBody) {
			this.snakeBody[i].render(ctx);
			this.snakeBody[i].fillStyle=randomColor();
		};
		this.food.render(ctx);
	},
	run:function(){
		var that=this;

		var timer=setInterval(function(){
			var x=that.head.startX;
			var y=that.head.startY;
			var rect=new Rect({
				startX:x,
				startY:y,
				rectW:that.head.rectW,
				rectH:that.head.rectH,
				fillStyle:that.snakeBody[1].fillStyle,
				strokeStyle:that.head.strokeStyle,
			});
			that.snakeBody.splice(1,0,rect);
			if (that.dir==37) {
				that.head.startX -=that.head.rectW;
			} else if(that.dir==38){
				that.head.startY -=that.head.rectW;
			}else if(that.dir==40){
				that.head.startY +=that.head.rectW;
			}else if(that.dir==39){
				that.head.startX +=that.head.rectW;
			}
			if(!(that.head.startX==that.food.startX&&that.head.startY==that.food.startY)){

				that.snakeBody.pop();
			}else{
				that.score ++;
				if (that.score%10 == 0) {
					that.fps +=2;
					clearInterval(timer);
					that.run(ctx.canvas);
				}
				that.createFood()
			}
			that.render(ctx,canvas);
			
			if (that.gameover()) {
				clearInterval(timer);
				if(confirm('游戏结束，厉害了大神，你得了 '+that.score*10+' 分。'+
					' 重新开始？')){
					location.reload();
				}else{
					that.clearcanvas(canvas);
				}
			};
			
		}, 1000/that.fps)
	},
	clearcanvas:function(canvas){
		canvas.width=canvas.width;
		canvas.height=canvas.height;
	},
	changeDir:function(dir){
		if((this.dir==37&&dir==39)||(this.dir==38&&dir==40)||
			(this.dir==39&&dir==37)||(this.dir==40&&dir==38)){
			return;
		}
		this.dir=dir;
	},
	gameover:function(){
		if (this.head.startX<0||this.head.startY<0||
			this.head.startX>=canvas.width||this.head.startY>=canvas.height) {
			return true;
		};
		for (var i = 1; i < this.snakeBody.length; i++) {
			if (this.head.startX==this.snakeBody[i].startX&&
				this.head.startY==this.snakeBody[i].startY) {
				return true;
			}
		}
	},
	backGround:function(){
		var img=new Image();
			img.src='images/katong.jpg';
			img.onload=function(){
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
			}
	}
}
function randomColor(){
			var colorData=['0','1','2','3','4','5','6','7','8','9'];
			var color='#';
			for (var i = 0; i < 6; i++) {
				color+=parseInt(Math.random()*colorData.length);
			}
			return color;

		}
