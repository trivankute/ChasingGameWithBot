const BG_COLOR = "#231f20"
const playerColor = "#ffff00"
const botColor = "#ff1744"
const wallColor = "#5d4037"

const BG_SIZE = 600
const squareSize = 30
let width
let height
width = height = BG_SIZE/squareSize
const totalSquares = (BG_SIZE/squareSize)*2-1

let canvas = document.getElementById('canvas')
const createPlayer = document.getElementById('createPlayer')
let onlyOnePlayer = false
const createBot = document.getElementById('createBot')
let onlyOneBot = false
const createWalls = document.getElementById('createWalls')
const startButton = document.getElementById('startButton')
const time = document.getElementById('time')

canvas.width = canvas.height = BG_SIZE
let ctx = canvas.getContext('2d')
ctx.fillStyle = BG_COLOR
ctx.fillRect(0,0,canvas.width,canvas.height)

let array = []
let player = {x:0,y:0}
let bot = {x:0,y:0}
let timeCountDown = 20
time.textContent = timeCountDown

for(let i=0;i<BG_SIZE/squareSize;i++)
{
    let smallArray = []
    for(let j=0;j<BG_SIZE/squareSize;j++)
    {
        smallArray.push(-1)
    }
    array.push(smallArray)
}

function getElementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function getEventLocation(element,event){
    var pos = getElementPosition(element);
    
    return {
    	x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

createPlayer.onclick = () => {
    if(createPlayer.checked==true)
    {
        createBot.checked=false
        createWalls.checked = false
        canvas.addEventListener('mousedown',(e) => 
        {if(!onlyOnePlayer)
        {
        let point = getEventLocation(canvas,e)
        point.x = Math.floor(point.x/squareSize)
        point.y = Math.floor(point.y/squareSize)
        player.x = point.x
        player.y = point.y
        if(array[point.y][point.x]!==2 && array[point.y][point.x]!==3)
        {
            array[point.y][point.x] = 1
            onlyOnePlayer = true
            ctx.fillStyle = playerColor
            ctx.fillRect(squareSize*point.x,squareSize*point.y,squareSize,squareSize)
        }
        }}
        )
    }
}

createBot.onclick = (e) => {
    if(createBot.checked==true)
    {
        createPlayer.checked=false
        createWalls.checked = false
        canvas.addEventListener('mousedown',(e)=>{
            if(!onlyOneBot)
            {
                let point = getEventLocation(canvas,e)
                point.x = Math.floor(point.x/squareSize)
                point.y = Math.floor(point.y/squareSize)
                bot.x = point.x
                bot.y = point.y
                if(array[point.y][point.x]!==1 && array[point.y][point.x]!==3)
                {
                    array[point.y][point.x] = 2
                    onlyOneBot = true
                    ctx.fillStyle = botColor
                    ctx.fillRect(squareSize*point.x,squareSize*point.y,squareSize,squareSize)
                }
            }
        })
    }
}

createWalls.onclick = () => {
    createBot.checked=false
    createPlayer.checked=false
    canvas.addEventListener('mousedown',(e)=>{
        if(createWalls.checked===true)
        {
            let point = getEventLocation(canvas,e)
            point.x = Math.floor(point.x/squareSize)
            point.y = Math.floor(point.y/squareSize)
            if(array[point.y][point.x]!==1 && array[point.y][point.x]!==2)
            {
                array[point.y][point.x] = 3
                ctx.fillStyle = wallColor
                ctx.fillRect(squareSize*point.x,squareSize*point.y,squareSize,squareSize)
            }
        }
    })
}

function handleMovementPlayer(e)
{
    let k = e.key
    if(k==='w')
    {
        let newPoint = {x:0,y:0}
        newPoint.x = player.x + 0 
        newPoint.y = player.y - 1
        if(newPoint.x>=0&&newPoint.y>=0&&newPoint.x<width&&newPoint.y<height
            &&
            array[newPoint.y][newPoint.x]!==2 && array[newPoint.y][newPoint.x]!==3)
        {
            ctx.fillStyle = BG_COLOR
            ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
            array[player.y][player.x] = -1
            player.x = newPoint.x
            player.y = newPoint.y
            array[newPoint.y][newPoint.x] = 1
            ctx.fillStyle = playerColor
            ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
        }
    }
    else if(k==='a')
    {
        let newPoint = {x:0,y:0}
        newPoint.x = player.x - 1 
        newPoint.y = player.y + 0
        if(newPoint.x>=0&&newPoint.y>=0&&newPoint.x<width&&newPoint.y<height
            &&
            array[newPoint.y][newPoint.x]!==2 && array[newPoint.y][newPoint.x]!==3)
        {
            ctx.fillStyle = BG_COLOR
            ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
            array[player.y][player.x] = -1
            player.x = newPoint.x
            player.y = newPoint.y
            ctx.fillStyle = playerColor
            array[player.y][player.x] = 1
            ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
        }
    }
    else if(k==='s')
    {
        let newPoint = {x:0,y:0}
        newPoint.x = player.x + 0 
        newPoint.y = player.y + 1
        if(newPoint.x>=0&&newPoint.y>=0&&newPoint.x<width&&newPoint.y<height
            &&
            array[newPoint.y][newPoint.x]!==2 && array[newPoint.y][newPoint.x]!==3)
        {
        ctx.fillStyle = BG_COLOR
        ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
        array[player.y][player.x] = -1
        player.x = newPoint.x
        player.y = newPoint.y
        array[player.y][player.x] = 1
        ctx.fillStyle = playerColor
        ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
        }
    }
    else if(k==='d')
    {
        let newPoint = {x:0,y:0}
        newPoint.x = player.x + 1 
        newPoint.y = player.y + 0
        if(newPoint.x>=0&&newPoint.y>=0&&newPoint.x<width&&newPoint.y<height
            &&
            array[newPoint.y][newPoint.x]!==2 && array[newPoint.y][newPoint.x]!==3)
        {
        ctx.fillStyle = BG_COLOR
        ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
        array[player.y][player.x] = -1
        player.x = newPoint.x
        player.y = newPoint.y
        array[player.y][player.x] = 1
        ctx.fillStyle = playerColor
        ctx.fillRect(squareSize*player.x,squareSize*player.y,squareSize,squareSize)
        }
    }
}

function findMin(queue)
{
    let min = 999
    let index = 0
    let indexInQueue = 0
    for(let i = 0;i<queue.length;i++)
    {
        if(queue[i].min<min) {min=queue[i].min;index=queue[i].index;indexInQueue=i;}
    }
    return {min,index,indexInQueue}
}

function findTheWay(oldWay)
{
    let dist = []
    for(let i = 0;i<width*height;i++)
        dist.push(999)
    dist[player.y*height+player.x]=0
    // create prev
    let prev = []
    // define dX, dY
    let dX = [-1,0,1,0,-1,-1,1,1]
    let dY = [0,-1,0,1,-1,1,-1,1]
    // create vis
    let vis = []
    for(let i = 0;i<height*width;i++)
    {   
        let currHeight = Math.floor(i/height)
        let currWidth = i%width
        let smallVis = []
        for(let j = 0;j<8;j++)
        {
            let newHeight = dX[j]
            newHeight += currHeight 
            let newWidth = dY[j]
            newWidth += currWidth
            if(newHeight<0||newHeight>=height||newWidth<0||newWidth>=width) continue
            if(array[newHeight][newWidth]===3) continue
            smallVis.push(newHeight*height + newWidth)
        }
        vis.push(smallVis)
    }

    let queue = []
    let reach = false
    queue.push({index:player.y*height+player.x,min:0})
    while(queue.length>0&&!reach)
    {
        let {index,indexInQueue} = findMin(queue)
        queue.splice(indexInQueue,1)
        for(let i=0;i<vis[index].length;i++)
        {
            if(vis[index][i]===bot.y*height+bot.x) reach = true
            let newValue = dist[index] + 1
            if(newValue<dist[vis[index][i]])
                {
                    prev[vis[index][i]]=index
                    dist[vis[index][i]]=newValue
                    queue.push({index:vis[index][i],min:newValue})
                }
        }
        vis[index] = []
    }

    if(reach)
    {
        let realWay = []
        let c = prev[bot.y*height+bot.x]
        while(c!=player.y*height+player.x)
        {
            realWay.push(c)
            c=prev[c]
        }
            return realWay
        // setTimeout(()=>{
        //     let i = 0
        //     let interval = setInterval(()=>{
        //         if(i<=realWay.length-1)
        //         {
        //             ctx.fillStyle = "violet"
        //             ctx.fillRect(realWay[i]%width*squareSize,Math.floor(realWay[i]/height)*squareSize,squareSize,squareSize)
        //             i++
        //         }
        //         else
        //         {
        //             clearInterval(interval)
        //         }
        //     },50)
        // },50)
    }
    else
    {
        // setTimeout(()=>alert("Your way is blocked"),totalTime)
        return oldWay
    }
}

function handleTime()
{
    timeCountDown--;
    time.textContent = timeCountDown
}

startButton.onclick = () => {
    if(onlyOneBot&&onlyOnePlayer)
    {
        document.addEventListener('keydown',handleMovementPlayer)
        
        const timeInterval = setInterval(()=>{
            if(timeCountDown>0)
            {
                handleTime()
            }
            else
            {
                clearInterval(timeInterval)
            }
        },1000) 

        let wayFromBotToPlayer = []
        wayFromBotToPlayer = findTheWay(wayFromBotToPlayer)
        let i = 0

        const interval2 = setInterval(()=>{
            wayFromBotToPlayer = findTheWay(wayFromBotToPlayer)
            i=0
        },250)
        let interval = setInterval(()=>{
        if(timeCountDown>0&&i<=wayFromBotToPlayer.length-1)
        {
            ctx.fillStyle = BG_COLOR
            ctx.fillRect(bot.x*squareSize,bot.y*squareSize,squareSize,squareSize)
            let newPoint = {x:wayFromBotToPlayer[i]%width,y:Math.floor(wayFromBotToPlayer[i]/height)}
            array[bot.y][bot.x]=-1
            bot.x = newPoint.x
            bot.y = newPoint.y
            array[bot.y][bot.x]=2
            ctx.fillStyle = botColor
            ctx.fillRect(newPoint.x*squareSize,newPoint.y*squareSize,squareSize,squareSize)
            i++
        }
        else
        {
            clearInterval(interval)
            clearInterval(interval2)
            if(timeCountDown>0)
            {
                alert('You lose')
            }
            else
            {
                alert('You win')
            }
        }
        },250)
    }
    else
    {
        alert('Please, creates a player and a bot')
    }
}