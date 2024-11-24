import { send } from "../type/index";

const firsttime = (send:send) =>{
    let ftime = 0
    const ob = new MutationObserver((mutaions) =>{
        mutaions.forEach((mutaion)=>{
            ftime = performance.now()
        })
        if(ftime > 0) {
            send({
                type:'firstScreen',
                data:{
                    time:ftime
                },
                title:'首屏加载时间'
            })
            ob.disconnect()
        }
    })
    ob.observe(document,{
        subtree:true,
        childList:true
    })
}

export default firsttime