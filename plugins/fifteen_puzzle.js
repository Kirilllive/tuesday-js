
//var setup={
//     puzzle_fifteen:{
//        diff:16,
//        size:[720,540],
//        grid:[3,3],
//        art:{
//            url:"UruseiYatsura.gif",
//            ratio:false
//        },
//        time:"0.1s",
//        style:"border-radius:12px;"
//     }
//}

var p=setup.puzzle_fifteen,freeslot=[],size=[],m=[],o=1;
ceation_slots();
function ceation_slots(){
    size=[p.size[0]/(p.grid[0]+1),p.size[1]/(p.grid[1]+1)]
    var c=(p.grid[1]+1)*(p.grid[0]+1)-1,f=document.getElementById("fifteen");
    f.style.width=p.size[0]+'px'
    f.style.height=p.size[1]+'px'
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(o<=c){
                if(!m[y]){m[y]=[]};m[y][x]=o;
                var e=document.createElement("div");
                e.id="slot"+o;
                e.setAttribute("onclick","move_slot("+o+")");
                e.className="slot";
                e.style="background-image:url("+p.art.url+");background-size:"+((p.art.ratio)? p.size[0]+"px auto":"auto "+p.size[1]+"px")+";background-position:-"+(size[0]*x)+"px -"+(size[1]*y)+"px ;width:"+size[0]+"px;height:"+size[1]+"px;top:"+(size[1]*y)+"px;left:"+(size[0]*x)+"px;position:absolute;"+((p.style)?p.style:"")
                if(p.time){e.style.transitionDuration=p.time}
                f.appendChild(e);o++;
            }else{m[y][x]=0;freeslot=[p.grid[1],p.grid[0]];}
        }
    }stir_slots();
}
function stir_slots(){
    for(var y=0;y<p.diff;y++){
        var a=[Math.round(Math.random()*p.grid[1]),Math.round(Math.random()*p.grid[0]),Math.round(Math.random()*p.grid[1]),Math.round(Math.random()*p.grid[0])];
        var s=[m[a[0]][a[1]],m[a[2]][a[3]]]
        m[a[0]][a[1]]=s[1];m[a[2]][a[3]]=s[0];
        if(m[a[0]][a[1]]==0){freeslot=[a[0],a[1]]}
        else if(m[a[2]][a[3]]==0){freeslot=[a[2],a[3]]}
    }
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(m[y][x]){
                var e=document.getElementById("slot"+m[y][x])
                e.style.left=(x*size[0])+"px";
                e.style.top =(y*size[1])+"px";
            }
        }
    }
}
function move_slot(s) {
    var e=document.getElementById("slot"+s);
    for(var y=-1;y<=1;y++){
        for(var x=-1;x<=1;x++){
            if(((x==0&&y==-1)||(x==-1&&y==0)||(x==0&&y==1)||(x==1&&y==0))&&m[freeslot[0]+y]&&m[freeslot[0]+y][freeslot[1]+x]&&m[freeslot[0]+y][freeslot[1]+x]==s){
                e.style.left=(freeslot[1]*size[0])+"px";
                e.style.top =(freeslot[0]*size[1])+"px";
                m[freeslot[0]][freeslot[1]]=s
                m[freeslot[0]+y][freeslot[1]+x]=0
                freeslot=[freeslot[0]+y,freeslot[1]+x];
                s=false;break;
            }
        }if(!s){break;}
    }check_slots();
}
function check_slots(){
    var c=1;
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(m[y][x]==0){break;}
            if(c==m[y][x]){c++}
        }
    }if(c==o){alert('win')}
}
