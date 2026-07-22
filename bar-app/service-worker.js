const VERSION="bar-bestelapp-v6";
const APP_FILES=[
 "./",
 "./index.html",
 "./manifest.webmanifest",
 "./products.json",
 "./icon-192.png",
 "./icon-512.png"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(VERSION).then(c=>c.addAll(APP_FILES)).then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;

  event.respondWith((async()=>{
    const cache=await caches.open(VERSION);
    try{
      const network=await fetch(event.request);
      if(network.ok && event.request.url.startsWith(self.location.origin)){
        cache.put(event.request,network.clone());
      }
      return network;
    }catch(e){
      const cached=await cache.match(event.request);
      if(cached) return cached;

      if(event.request.mode==="navigate"){
        const index=await cache.match("./index.html");
        if(index) return index;
      }
      return new Response(
        "<!doctype html><title>Offline</title><meta name='viewport' content='width=device-width,initial-scale=1'><body style='font-family:sans-serif;background:#020617;color:white;display:grid;place-items:center;height:100vh;text-align:center'><div><h1>Offline</h1><p>Geen internetverbinding. De app blijft beschikbaar zodra de benodigde bestanden eerder zijn geladen.</p></div></body>",
        {headers:{"Content-Type":"text/html; charset=utf-8"}}
      );
    }
  })());
});
