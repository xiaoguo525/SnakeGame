function Rect(options){
	this._init(options);
}
Rect.prototype={
	constructor:Rect,
	_init:function(options){
		options=options||{};
		this.startX=options.startX||0;
		this.startY=options.startY||0;
		this.rectW=options.rectW||10;
		this.rectH=options.rectH||10;
		this.fillStyle=options.fillStyle||'black';
		this.strokeStyle=options.strokeStyle||'black';
	},
	render:function(ctx){
		ctx.beginPath();
		ctx.fillStyle=this.fillStyle;
		ctx.strokeStyle=this.strokeStyle;
		ctx.fillRect(this.startX, this.startY,this.rectW, this.rectH);
		ctx.strokeRect(this.startX, this.startY,this.rectW, this.rectH)
	}
}