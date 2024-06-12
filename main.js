const startCallButton = document.getElementById('startCall');
const answerCallButton = document.getElementById('answerCall');
const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');


let localStream;
let remoteStream;
let peerConnection;
let offer;
let answer;


const servers = null;


startCallButton.onclick = async () => {
    // Capture user's audio stream
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // localAudio.srcObject = localStream;


    peerConnection = new RTCPeerConnection(servers);




    // Add local stream tracks to the peer connection
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });




    // Handle remote stream
    peerConnection.ontrack = event => {
        console.log("answerCallButton :", event)
        if (!remoteStream) {
            remoteStream = new MediaStream(); // Initialize remoteStream if not already
            remoteAudio.srcObject = remoteStream;
        }
        remoteStream.addTrack(event.track);
    };




    peerConnection.onicecandidate = e => {
        peerConnection.addIceCandidate(e.candidate);
        console.log("new ice condidate ! reprinting sdp: " + JSON.stringify(peerConnection.localDescription));
    }


    peerConnection.createOffer().then(o => peerConnection.setLocalDescription(o)).then(a => console.log("set successfully!"));
};




answerCallButton.onclick = async () => {


    // Get the value of the text input box
    const inputValue = document.getElementById('textInput').value;


    // Store the value in a variable
    offer = JSON.parse(inputValue);


    // Set remote description and create answer
    console.log("inside answer : ", offer)


    // Capture user's audio stream
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });


    peerConnection = new RTCPeerConnection(servers);


    // Add local stream tracks to the peer connection
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle remote stream
    peerConnection.ontrack = event => {
        console.log("answerCallButton :", event)
        if (!remoteStream) {
            remoteStream = new MediaStream(); // Initialize remoteStream if not already
            remoteAudio.srcObject = remoteStream;
        }
        remoteStream.addTrack(event.track);
    };



    peerConnection.onicecandidate = e => {
        peerConnection.addIceCandidate(e.candidate);
        console.log("new Ice candidate ! reprinitng sdp: " + JSON.stringify(peerConnection.localDescription));
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


// Checking git



