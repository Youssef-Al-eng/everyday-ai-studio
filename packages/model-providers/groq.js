const DEFAULT_MODEL='openai/gpt-oss-20b';
const timeoutMs=45000;

export function providerStatus(env=process.env){
  return {provider:env.GROQ_API_KEY?'groq':'demo',configured:Boolean(env.GROQ_API_KEY),model:env.GROQ_MODEL||DEFAULT_MODEL};
}

export async function verifyModel({model,env=process.env,fetchImpl=fetch}={}){
  const key=env.GROQ_API_KEY;if(!key)throw Object.assign(new Error('Set GROQ_API_KEY in the local .env file first.'),{code:'NOT_CONFIGURED'});
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{const r=await fetchImpl('https://api.groq.com/openai/v1/models',{signal:controller.signal,headers:{Authorization:`Bearer ${key}`}});if(!r.ok)throw Object.assign(new Error(r.status===401?'Groq rejected the credential. Check GROQ_API_KEY.':`Groq model-list request failed (${r.status}).`),{code:r.status===401?'AUTH':r.status===429?'RATE_LIMIT':`HTTP_${r.status}`});const data=await r.json();if(!Array.isArray(data?.data))throw Object.assign(new Error('Groq returned a malformed model list.'),{code:'MALFORMED'});const id=model||env.GROQ_MODEL||DEFAULT_MODEL;return {model:id,available:data.data.some(item=>item.id===id)};}catch(e){if(e.name==='AbortError')throw Object.assign(new Error('Groq model verification timed out.'),{code:'TIMEOUT'});if(e instanceof TypeError)throw Object.assign(new Error('Could not reach Groq to verify the model.'),{code:'NETWORK'});throw e}finally{clearTimeout(timer)}
}

export async function complete({system,user,model,structured=false,jsonSchema=null,env=process.env,fetchImpl=fetch}){
  model=model||env.GROQ_MODEL||DEFAULT_MODEL;
  const key=env.GROQ_API_KEY;
  if(!key)throw Object.assign(new Error('Groq is not configured. Copy .env.example to .env, add GROQ_API_KEY, restart the server, then retry.'),{code:'NOT_CONFIGURED'});
  const attempt=async(userText)=>{
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
    try{
      const request={model,temperature:jsonSchema?0.5:0.6,max_completion_tokens:jsonSchema?1800:700,reasoning_effort:'low',reasoning_format:'hidden',messages:[{role:'system',content:system},{role:'user',content:userText}]};
      if(structured&&jsonSchema)request.response_format={type:'json_schema',json_schema:{name:'agent_response',strict:true,schema:jsonSchema}};
      else if(structured)request.response_format={type:'json_object'};
      const response=await fetchImpl('https://api.groq.com/openai/v1/chat/completions',{method:'POST',signal:controller.signal,headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(request)});
      if(!response.ok){
        let providerCode='';try{providerCode=(await response.json()).error?.code||''}catch{}
        const code=response.status===401?'AUTH':response.status===429?'RATE_LIMIT':response.status===404?'MODEL':response.status===400&&providerCode==='json_validate_failed'?'MALFORMED':`HTTP_${response.status}`;
        const message=code==='AUTH'?'Groq rejected the credential. Check GROQ_API_KEY.':code==='RATE_LIMIT'?'Groq rate limit reached. Retry in a moment.':code==='MODEL'?'The configured Groq model was not accepted. Update GROQ_MODEL.':code==='MALFORMED'?'Groq output did not satisfy the required JSON schema.':'Groq request failed ('+response.status+')';
        throw Object.assign(new Error(message),{code,status:response.status});
      }
      const data=await response.json();const content=data?.choices?.[0]?.message?.content;
      if(typeof content!=='string'||!content.trim())throw Object.assign(new Error('Groq returned an empty or malformed completion. Retry or use demo mode.'),{code:'MALFORMED'});
      return {text:content.trim(),provider:'groq',model:data.model||model,usage:data.usage||null};
    }catch(error){if(error instanceof SyntaxError)throw Object.assign(new Error('Groq returned malformed response data. Retry the request.'),{code:'MALFORMED'});if(error.name==='AbortError')throw Object.assign(new Error('Groq request timed out after 45 seconds. Retry or switch to demo mode.'),{code:'TIMEOUT'});if(error instanceof TypeError)throw Object.assign(new Error('Could not reach Groq. Check network access and retry.'),{code:'NETWORK'});throw error}finally{clearTimeout(timer)}
  };
  for(let tries=0;tries<3;tries+=1){
    try{
      const result=await attempt(tries===0?user:`${user}\n\nIMPORTANT: ${tries===1?'Your previous reply':'Both previous replies'} were rejected because they did not satisfy the required JSON schema. Reply again with JSON only: include every required top-level field, make every array item one concise plain string, keep each list to 3-5 items, and use no markdown fences.`);
      return result;
    }catch(error){
      // Schema drift (json_validate_failed) is a transient decoding issue, not a user error:
      // retry with a stricter instruction before surfacing the failure honestly.
      if(error.code!=='MALFORMED'||!jsonSchema||tries===2)throw error;
    }
  }
  throw Object.assign(new Error('Groq output did not satisfy the required JSON schema.'),{code:'MALFORMED'});
}
