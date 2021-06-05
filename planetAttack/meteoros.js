/////////////////////////////////////////
//          GLOBAL.JS 
// contains all of the glabal resources
/////////////////////////////////////////

const nameGenerator =  () => names[getRandom_max_min(names.length, 0)]

class Meteors {

    constructor(x, y, radius, velocity, color, timer, name){

        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.color = color
        this.timer = timer
        this.id = parseInt(Math.random() * 1000);
        this.name = name
    }

    draw(){

        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();

        c.beginPath();
        c.strokeStyle = 'white';
        c.arc(this.x , this.y, this.radius + (this.radius / 2), 0, Math.PI * 2, false);
        c.stroke()

    }

    update(){

        this.draw()
        this.x = this.x + this.velocity.dx
        this.y = this.y + this.velocity.dy

    }

} 


const drawMeteors = () => {

    setInterval(() => {

        let size = getRandom_max_min(15,3); // meteor sizes will vary         

        let x;
        let y;

        if(Math.random() < 0.5){//spwan outside 
            x = Math.random() < 0.5 ? 0 - size : width + size;
            y = Math.random() * height;
        }else{
            x = Math.random() * width;
            y = Math.random() < 0.5 ? 0 - size : height + size;
        } 
        
    
        meteoros.push(new Meteors(
            x, y, size,
            {
                dx : getRandom_max_min(5,-5),
                dy : getRandom_max_min(5,-5) 
            }
            , "#7A491D" , meteorLifeTime, nameGenerator()
        ));
        
    },spawnSpeed_m);     
    

};

drawMeteors()

const animate_meteoros = () => {

    meteoros.forEach((m, i) => {
            m.timer--            

            if(m.timer <= 0){
                meteoros.splice(i, 1);
            } 
                        
            //check for collition            
            meteoros.forEach((m2, ii) => { 

                if(m.id == m2.id) return//check if its the same object

                //check colition with each other
                let checkCollition = collition(m,m2);
                if(checkCollition < m.radius + m2.radius){
                    ele2emyVSenemycollition(m,m2);
                }                

            })

            //check colition with world
            planetImpact(m, sun_, i);

            m.update();

    })


};