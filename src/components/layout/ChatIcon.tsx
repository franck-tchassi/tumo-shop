"use client"

import React, { useEffect } from 'react'



const ChatIcon = () => {
    useEffect(() =>{
        //Ensure the script logic is added on the client side
        (function (
            w:Window & {chatbotConfig?:[string, string,{apiHost:string}]},
            d,
            s,
            ...args
        ){
            //create and append the chatbot container div
            const div = d.createElement("div");
            div.id = "aichatbot";
            d.body.appendChild(div);
            // Assign chatbotConfig to window
            w.chatbotConfig = args as [string, string, {
                apiHost: string
            }];
            // Locate the first script tag and insert the chatbot script
            const f = d.getElementsByTagName(s)[0];
            const j = d.createElement(s) as HTMLScriptElement;
            j.defer = true;
            j.type = 'module'
            j.src= 'https://aichatbot.sendbird.com/index.js'
            f.parentNode?.insertBefore(j, f);
        })(
            window,
            document,
            'script',
            'E0155DB3-DB69-4491-A3EA-085BE81BB91B',
            'b60d9000c0335d65c7fd2b63ca8cecb1c848ef04',
            {
                apiHost:
                    "https://api-E0155DB3-DB69-4491-A3EA-085BE81BB91B.sendbird.com"
            }
        )
        return () =>{
            const div = document.getElementById("aichatbot");
            if(div){
                document.body.removeChild(div);
            }
        }
    }, [])
  return (
    <div>ChatIcon</div>
  )
}

export default ChatIcon