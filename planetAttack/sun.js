let rotationControl = 0;
/////////////////////////////////////////
//          GLOBAL.JS 
// contains all of the glabal resources
/////////////////////////////////////////
class Sun {

        constructor(x, y, radius, color, atmosphereColor){

            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.atmosphereColor = atmosphereColor
            this.id = "planetEd"

        }

        draw(){

            c.beginPath();
            c.fillStyle = this.color;            
            rotationControl =  rotationControl >= 360 ? 0 : rotationControl;
            c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
            c.fill();            

            rotationControl++

        }

        update(){

            //sun gravity ring
            this.draw()
            c.beginPath();
            c.strokeStyle = this.atmosphereColor == true ? "red" : "white";
            c.arc(this.x , this.y, this.radius + this.radius, 0, Math.PI * 2, false);
            c.stroke()

            //create the rings for the rest of the planets
            // later add a danger zone and light up ring closest to planet that is in danger
            let tick = 0;
            while(tick < 8){
                c.beginPath();
                c.lineWidth= 4;                
                c.strokeStyle = this.atmosphereColor == true ? "red" : "white";
                c.arc(this.x , this.y, this.radius + this.radius * tick * 3, 0, Math.PI * 2, false);
                c.stroke()
                tick++;
            }

        }


}

let p_postY = height / 2;
let p_postX = width / 2;

let sun_ = new Sun(
    p_postX, p_postY, 80, "#BF722D", false
)

let lock_id = null;
let distance_ = [];

const planetImpact = (m, sun_, i) => {


    let checkCollition = collition(m, sun_);
    
    
    //if planet close to meteor imulate gravity and pull to planet if planet is 2 times bigger then it
    if(checkCollition < (m.radius + sun_.radius) * 3 && (sun_.radius * 2) > m.radius){
                
        let newVelocity = moveToEle(sun_, m);
        m.velocity.dx = newVelocity.x;
        m.velocity.dy = newVelocity.y;

    }
    

    if(checkCollition < m.radius + sun_.radius){
        createParticle(m)
        //after hit
        meteoros.splice(i, 1)//del                
        id("data3").innerHTML +=  `<li>
                    <p>MeteorName : ${m.name}${m.id}</p>
                    <p>ImpactYear : ${years}</p>
                    <p>MeteorSize : ${m.radius}</p>
        
        </li>`

    }
    

}

