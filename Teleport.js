//目标：只传送玩家，传送玩家和动物
//传送
//以下代码在众吧友的帮助下及作者自学并参考若干个js后完成
//version 1.0

var px,py,pz,xx,xy,xz,ax,ay,az,bx,by,bz,i,amt,vl;
var tp=false;
var ap=false;
var bp=false;
var onAB=false;

//define Anywhere Portal Block
Block.defineBlock(255,"Anywhere Portal Block",[["still_lava",0]],2,false,0);
Block.setRenderLayer(255,1);
Block.setDestroyTime(255,0.0);
Block.setLightLevel(255,15);
//这段代码学习并参考了Real Nether Portal Sonick96.js中的部分代码

//define Portal-setter Arrow
ModPE.setItem(140,"arrow",0,"Portal-setter Arrow");
//这段代码学习了更多趣味1.0.2.js中的部分代码

//define Portal Block A&B
Block.defineBlock(143,"Portal Block A",[["jukebox_top",0],["jukebox_side",0],["jukebox_top",0],["jukebox_top",0],["jukebox_top",0],["jukebox_top",0]]);
Block.defineBlock(144,"Portal Block B",[["jukebox_top",0],["jukebox_side",0],["jukebox_top",0],["jukebox_top",0],["jukebox_top",0],["jukebox_top",0]]);
//这段代码学习并参考了更多趣味1.0.2.js中的部分代码

//define Particle function
function makeParticle()
	{
		amt=70;
		vl=3;
		//quadrant 1
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()+Math.random()*vl,getPlayerY()+Math.random()*vl,getPlayerZ()+Math.random()*vl,0,0,0,0);
			}
		//quadrant 2
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()+Math.random()*vl,getPlayerY()+Math.random()*vl,getPlayerZ()-Math.random()*vl,0,0,0,0);
			}
		//quadrant 3
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()+Math.random()*vl,getPlayerY()-Math.random()*vl,getPlayerZ()+Math.random()*vl,0,0,0,0);
			}
		//quadrant 4
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()+Math.random()*vl,getPlayerY()-Math.random()*vl,getPlayerZ()-Math.random()*vl,0,0,0,0);
			}
		//quadrant 5
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()-Math.random()*vl,getPlayerY()+Math.random()*vl,getPlayerZ()+Math.random()*vl,0,0,0,0);
			}
		//quadrant 6
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()-Math.random()*vl,getPlayerY()-1+Math.random()*vl,getPlayerZ()-Math.random()*vl,0,0,0,0);
			}
		//quadrant 7
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()-Math.random()*vl,getPlayerY()-1-Math.random()*vl,getPlayerZ()+Math.random()*vl,0,0,0,0);
			}
		//quadrant 8
		for(i=1;i<=amt;i++)
			{
				Level.addParticle(17,getPlayerX()-Math.random()*vl,getPlayerY()-Math.random()*vl,getPlayerZ()-Math.random()*vl,0,0,0,0);
			}
	}
//这段代码为作者自行研究的结果

//difine Save Portal Coordinate function
function savePortalCoordinate()
	{
		try
			{
				var f=String(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/minecraftWorlds/"+Level.getWorldDir()+"/TeleportC.save");
				var fos=java.io.FileOutputStream(f);
				fos.write(px+"\r\n");
				fos.write(py+"\r\n");
				fos.write(pz+"\r\n");
				fos.write(ax+"\r\n");
				fos.write(ay+"\r\n");
				fos.write(az+"\r\n");
				fos.write(bx+"\r\n");
				fos.write(by+"\r\n");
				fos.write(bz+"\r\n");
			}
		catch(err)
			{
				clientMessage("写入传送坐标存档错误: "+err+".");
			}
	}
//这段代码学习并参考了快速建筑v4.5.js及建筑代码生成器-Build #0006.js中的部分代码

function procCmd(cmd)
	{
		var Data=cmd.split(" ");
		if(Data[0]=="tpon")
			{
				px=Data[1];
				py=Data[2];
				pz=Data[3];
				py++;
				py++;
				py++;
				tp=true;
				print("坐标设置成功");
				print("可重新设置");
			}
		else if(Data[0]=="tpoff")
			{
				tp=false;
				print("已取消传送功能");
			}
	}

//teleprot main
function modTick()
	{
		if(getCarriedItem()==140)
			{
				px=getPlayerX();
				py=getPlayerY();
				pz=getPlayerZ();
			}
		if(getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==255&&tp==true)
			{
				Entity.setPosition(getPlayerEnt(),px,py,pz);
				makeParticle();
				print("传送成功");
			}
		if(getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==143&&ap==true&&bp==true&&onAB==false)
			{
				Entity.setPosition(getPlayerEnt(),bx,by,bz);
				makeParticle();
				print("传送成功");
				onAB=true;//teleport just now statement
				savePortalCoordinate();
			}
		else
			{	
				if(getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==144&&ap==true&&bp==true&&onAB==false)
					{
						Entity.setPosition(getPlayerEnt(),ax,ay,az);
						makeParticle();
						print("传送成功");
						onAB=true;//teleport just now statement
					}
				else
					{
						if (getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())!=143&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())!=144)
							{
								onAB=false;//teleportable statement
							}
					}
			}
	}
//这段代码基本上都是作者自行研究的结果#(滑稽):)

//on Portal Block detection
function destroyBlock(x,y,z)
	{
		if(getTile(x,y,z)==143)
			{
				ap=false;
			}
		if(getTile(x,y,z)==144)
			{
				bp=false;
			}
	}

//display coordinate & set Portal Blcok
function useItem(x,y,z,itemId,blockId,side)
	{
		if(itemId==344)
			{
				preventDefault();
				xx=x;
				xy=y;
				xz=z;
				print("当前点击坐标x值为："+xx+"，y值为："+xy+"，z值为："+xz);
			}
		if(itemId==143)
			{
				preventDefault();
				setTile(x,y,z,143);
				ax=x;
				ay=y+3;
				az=z;
				ap=true;
			}
		if(itemId==144)
			{
				preventDefault();
				setTile(x,y,z,144);
				bx=x;
				by=y+3;
				bz=z;
				bp=true;
			}
	}
//这段代码从第二个if语句起均为作者自行研究的结果

//add new items&recipes &display hints
function newLevel()
	{
		Player.addItemCreativeInv(255,1,0);
		Player.addItemCreativeInv(140,1,0);
		Player.addItemCreativeInv(143,1,0);
		Player.addItemCreativeInv(144,1,0);
		Item.addShapedRecipe(140,1,0,[
			"   ",
			" a ",
			"   "],
			["a",262,0]);
		Item.addShapedRecipe(255,1,0,[
			"   ",
			" a ",
			"   "],
			["a",325,10]);
		Item.addShapedRecipe(143,1,0,[
			"bbb",
			"bab",
			"b b"],
			["a",325,10],["b",5,0]);
		Item.addShapedRecipe(144,1,0,[
			"bbb",
			"b b",
			"bab"],
			["a",325,10],["b",5,0]);
		clientMessage(ChatColor.GOLD+"欢迎使用传送门js");
		clientMessage(ChatColor.BLUE+"输入指令“/tpon x值 y值 z值“设置传送位置");
		clientMessage(ChatColor.BLUE+"输入“/tpon”可打开任意传送开关，输入“/tpoff”关闭任意传送开关");
		clientMessage(ChatColor.BLUE+"开启传送后如果脚下方块为Anywhere Portal Block则将玩家传送至指定地点");
		clientMessage(ChatColor.BLUE+"鸡蛋点击方块可查看当前点击方块坐标");
		clientMessage(ChatColor.RED+"如果输入/tpon后未指定坐标，则坐标将被设置为(0,0,0)！");
		clientMessage(ChatColor.GOLD+"手持Portal-setter Arrow即可自动设置坐标为玩家当前所在位置");
	}
//这段代码的一部分学习了Quarry01110.js中的部分代码，并在吧友@690232985 的提示下放在了正确的位置