export default function TestFetch(){
    var requestOptions = {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
      };
      
      fetch("https://catfact.ninja/fact", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      fetch("https://cors-demo.glitch.me/allow-cors", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      fetch("https://us-central1-ecs-utd-events.cloudfunctions.net/app/organizations", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    
    return null
}
// https://us-central1-ecs-utd-events.cloudfunctions.net/app