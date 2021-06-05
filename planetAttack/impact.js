let particlesLength = null;
/////////////////////////////////////////
//          GLOBAL.JS 
// contains all of the glabal resources
/////////////////////////////////////////
class Particle {

    constructor(x, y, radius, velocity, color, timer){

        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.color = color
        this.timer = timer

    }

    draw(){

        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();

        c.beginPath();
        c.strokeStyle = 'red';
        c.arc(this.x , this.y, this.radius + (this.radius / 2), 0, Math.PI * 2, false);
        c.stroke()

    }

    update(){

        this.draw()
        this.x = this.x + this.velocity.dx
        this.y = this.y + this.velocity.dy

    }

} 

let particle_tick = 0;

const createParticle = (meteoroid) => {

    particlesLength = meteoroid.radius;
    let interval = setInterval(() => {        
        particles.push(new Particle(
            meteoroid.x, meteoroid.y,
            getRandom_max_min(meteoroid.radius / 2, 0.5),
            {
                dx : getRandom_max_min(5, -5),
                dy : getRandom_max_min(5, -5)
            },
            "darkred",50

        ))        

        particle_tick++

        if(particle_tick >= meteoroid.radius * 5){// make 5 time more particles then size
            clearInterval(interval)
            particle_tick = 0;
        }

    },0)

};


const animateParticles = () => {     

    particles.forEach((p, i) => {      

        p.timer--;

        if(p.timer < 0){
            particles.splice(i, 1);
        }

        p.update();

    })

}

