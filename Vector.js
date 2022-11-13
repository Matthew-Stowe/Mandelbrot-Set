//Vector Objcet
class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    //adds z vector parameter
    add(z){
        this.x = this.x + z.x;
        this.y = this.y + z.y;
    }

    //subtracts parameter to each value
    sub(z){
        this.x -= z.x
        this.y -= z.y;
    }

    //Multiply by scalar
    mult(scalar){
        this.x *= scalar
        this.y *= scalar
    }

    //Divide by scalar
    div(scalar){
        this.x /= scalar
        this.y /= scalar
    }

    //returns magnitude of the distance from one vector to another
    distance(Vec){
        var Distance = new Vector(0,0)          //vector to hold distance
        
        Distance.x = Vec.x - this.x             //delta x
        Distance.y = Vec.y - this.y             //delta y

        return Distance.mag();                  //returns mag as single number
    }

    //returns the magitude of the vector
    mag(){
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    }

    //sets length from between 0 and 1
    normalise(){                                                                            //source: https://www.youtube.com/watch?v=03I8z1rwsaQ&ab_channel=SamSpadeGameDev
        if( (this.x != 0) || (this.y != 0) ){                                               //Do not divide by 0!
            var factor = 1/Math.sqrt((this.x * this.x) + (this.y * this.y))
            this.x = factor * this.x;
            this.y = factor * this.y
        }
    }

    //sets the magnitude of the vactor to scalar parmeter
    setMag(scalar){                                                                         //source: https://www.youtube.com/watch?v=03I8z1rwsaQ&ab_channel=SamSpadeGameDev
        this.normalise();
        this.mult(scalar)
    }

    //limits magnitude of vector
    limitMag(limit){                                                                        //source: https://www.youtube.com/watch?v=03I8z1rwsaQ&ab_channel=SamSpadeGameDev
        if(this.mag() > limit){
            this.setMag(limit)
        }
    }
}