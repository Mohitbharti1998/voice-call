const startCallButton = document.getElementById('startCall');
const answerCallButton = document.getElementById('answerCall');




let peerConnection;
let dc;
let offer;
let answer;


const servers = {
   iceServers: [
       { urls: 'stun:stun.l.google.com:19302' }
   ]
};




startCallButton.onclick = async () => {


   peerConnection = new RTCPeerConnection(servers);
   dc = peerConnection.createDataChannel("channel");


   dc.onmessage = e => alert(e.data);


   dc.onopen = e => console.log("connection opened!");


   peerConnection.onicecandidate = e => console.log("new ice condidate ! reprinting sdp: " + JSON.stringify(peerConnection.localDescription));


   peerConnection.createOffer().then(o => peerConnection.setLocalDescription(o)).then(a => console.log("set successfully!"));
};


answerCallButton.onclick = async () => {


   // Get the value of the text input box
   const inputValue = document.getElementById('textInput').value;


   // Store the value in a variable
   offer = JSON.parse(inputValue);


   // Set remote description and create answer
   console.log("Inside answer : ", offer)




   peerConnection = new RTCPeerConnection(servers);


   peerConnection.onicecandidate = e => console.log("new Ice candidate ! reprinitng sdp: " + JSON.stringify(peerConnection.localDescription))




   peerConnection.ondatachannel = e => {
       peerConnection.dc = e.channel;
       peerConnection.dc.onmessage = e => alert(e.data)
       peerConnection.dc.onopen = e => console.log("connection open!!!")
   }


   peerConnection.setRemoteDescription(offer).then(a => console.log("offer set"))




   peerConnection.createAnswer().then(a => peerConnection.setLocalDescription(a)).then(a => console.log("answer created"))


};




handleAnswer.onclick = async () => {
   const inputValue = document.getElementById('textInput1').value;
   // Store the value in a variable
   answer = JSON.parse(inputValue);
   console.log("handle answer: ", answer)
   await peerConnection.setRemoteDescription(answer);
}











