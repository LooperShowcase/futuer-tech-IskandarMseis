let open_ai_respomse;


let conversathion=[
    {role:"user",content:"Hi"},
    {role:"assistenta",content:"Hi, how can I help you today?"}
]

async function  conversathionUserAdd(question,seniment){
    conversathion.push({
        role:"user",
    content:"My happiness out of 10:"+seniment+"my question is:"+question})
}

async function conversathionAssistentaAdd(response){
    conversathion.push({role:"assistenta",content:response})
}  
   
async function openai_test(){
    let url = " https://api.openai.com/v1/chat/completions";

let apikey1 ="sk";
let apikey2 ="-ARmBYmBgE69LcWHYknguT3";
let apikey3 ="BlbkFJIiaAPCEWCdgVyodtMBuc";
let apikey = apikey1+apikey2+apikey3;


let data = {model:"gpt-3.5-turbo", messages:  conversathion};



try{
const response = await fetch (url,{
method :"POST",
Headers :{
    "content-type":"application/json",
    Authorization : `Bearer ${apikey}`
},
body : JSON.stringify (data),
})
}

catch(error){

console.log("there is an error:",error);
}
if (response.ok){

    const responseData = await response.json();
    const message = responseData.choies[0].message.content;

    conversathionAssistentaAdd(message);
    const utterance = new SpeechSynthesisUtterance(message);
    SpeechSynthesis.speek(utterance);
    return message;
}
else{
    console.log("Request failed with status: ",response.status);
}
}