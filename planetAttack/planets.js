/////////////////////////////////////////
//          GLOBAL.JS 
// contains all of the glabal resources
/////////////////////////////////////////
class Planets {

        constructor(x, y, radius, velocity, rotateSpeed, color, planetName, currentAngle = 0){

            this.x = x
            this.y = y
            this.radius = radius
            this.velocity = velocity
            this.rotateSpeed = rotateSpeed
            this.color = color
            this.planetName = planetName
            this.currentAngle = currentAngle

        }

        draw(){

            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
            c.fill();

            //create danger zone
            c.beginPath();
            c.strokeStyle = "rgb(172 111 0 / 88%)";
            c.arc(this.x , this.y, this.radius + this.radius, 0, Math.PI * 2, false);
            c.stroke()

        }

        update(){
            this.draw()
            this.x = this.velocity.dx
            this.y = this.velocity.dy
        }


}


var dd = 1;
var angle = 0;
let mult = 6;

planetsList.forEach((p, i) => {

    let p_postY_ = (height / 2);
    let p_postX_ = (width / 2);

    planets_.push( new Planets(
        p_postX_, p_postY_, planetsList[i].size, 
        {
            dx : 0,
            dy : 0
        },
        planetsList[i].planetSpeed
        , planetsList[i].color, planetsList[i].name
    )) 

    id("planetData").innerHTML += `
               <li id="${planetsList[i].name}">
                    <p style="background:${planetsList[i].color};"></p>
                    <p>Planet Name : ${planetsList[i].name}</p>
                    <p>Meteor Impact</p>
                    <ul class="inner_ul" id="${planetsList[i].name}_strike">                        
                    </ul>                    
               </li>        
        `

});


const getAngle = (r, s) => Math.acos(1 - Math.pow(dd / r , s) / 2);

const rotate_planets = () => { 

    planets_.forEach((pl, i) => {

        // increase the angle of rotation           
            pl.currentAngle -= getAngle(pl.radius, pl.rotateSpeed);

        // calculate the new ball.x / ball.y
            pl.velocity.dx = (width / 2) + (28 * planetsList[i].postMultiple) * Math.cos(pl.currentAngle);
            pl.velocity.dy = (height / 2) + (28 * planetsList[i].postMultiple) * Math.sin(pl.currentAngle);
        
        pl.update();

    })  

};



const moonImpact = () => {

    meteoros.forEach((met, i) => {

        planets_.forEach((pl, ii) => {

            let checkCollition = collition(met, pl);

            //if planet close to meteor imulate gravity and pull to planet if planet is 2 times bigger then it
            if(checkCollition < (met.radius + pl.radius) * 3 && (pl.radius * 2) > met.radius){
                
                let newVelocity = moveToEle(pl, met);
                met.velocity.dx = newVelocity.x;
                met.velocity.dy = newVelocity.y;

            }

            if(checkCollition < met.radius + pl.radius){
                createParticle(met)

                //display data about who hit who
                id(`${pl.planetName}_strike`).innerHTML += `
                    <li>
                        <p>MeteorName : ${met.name}${met.id}</p>
                        <p>MeteorRadius : ${met.radius}</p>
                        <p>ImpactYear : ${years}</p>
                    </li>
                
                `
                id(`${pl.planetName}_strike`).scrollIntoView();

                //after hit
                meteoros.splice(i, 1)//del        
            }
    
        })        
        
    });    

}

