if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://localhost/service-worker-v1.js',{scope:'./'}).then(function(registration) {
                console.log("sauvegarde OK scope="+registration.scope);
    })
        .catch(e=>console.log("serviceWorker Sauvegarde KO" + e));
} else {
console.log("pas de pwa")
}

