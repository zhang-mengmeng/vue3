import userinfo from "./user/index"
import firsttime from "./page/index"
class Lei {
    events:Record<string,Function>
    constructor() {
        this.events={
            firsttime:firsttime
        }
       this.init() 
    }
    sendRequest(params = {}){
        let user = userinfo()
        let data = Object.assign({},params,user)
        let blob = new Blob([JSON.stringify(data)],{
            type:'application/JSON'
        })
        navigator.sendBeacon('http://localhost:3000/track',blob)
    }

    init() {
        Object.keys(this.events).forEach(keys =>{
            this.events[keys](this.sendRequest)
        })
    }
}

export default Lei