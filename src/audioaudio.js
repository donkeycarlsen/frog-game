document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            // Process the file content here
            console.log(fileContent);
            //processCSVToBase64Array(fileContent);
            extractBase64Parts(fileContent)
            goinaudio()
        };
        reader.readAsText(file);
    }
});

// Example usage (assuming you have read the CSV data into `csvData` variable)
let base64EncodedAudios =[]

function extractBase64Parts(fileContent) {
    // Split the content by "Mu-law Data: "
    const parts = fileContent.split('Mu-law Data: ');
  
    // Remove any empty parts
    const base64Parts = parts.filter(part => part.trim() !== '').map(part => part.replace(/\r\n/g, '')); // Remove '\r\n' characters;
  
    base64EncodedAudios = base64Parts;
}
  

function processCSVToBase64Array(csvData) {
    const lines = csvData.split('\n');
    const base64EncodedAudiosg = [];

    // Assuming the base64 encoded audio is in the last column
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
        const base64Audio = columns[columns.length - 2].slice(19);
        base64EncodedAudiosg.push(base64Audio);
    }

    base64EncodedAudios = base64EncodedAudiosg.reverse();
    console.log(base64EncodedAudios)
}

var goinaudio = () => {
    let concatenatedLinearPCMData = [];
    let concmulaw = []
    console.log(base64EncodedAudios)

    let muLawEncodedAudios = base64EncodedAudios; // Assuming this is your array of base64 strings

    for (let base64EncodedAudio of base64EncodedAudios) {
        // Decode the base64 string to get the mu-law encoded audio data
        console.log(base64EncodedAudio)
        let muLawEncodedAudio = atob(base64EncodedAudio);
        console.log(muLawEncodedAudio)
        concmulaw.push(muLawEncodedAudio)

        // Convert the mu-law data to linear PCM
        let linearPCMData = muLawToLinearPCM(muLawEncodedAudio);

        // Concatenate the linear PCM data
        concatenatedLinearPCMData = concatenatedLinearPCMData.concat(Array.from(linearPCMData));
    }
    console.log(concatenatedLinearPCMData)

    // Create an AudioContext
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create an AudioBuffer from the concatenated linear PCM data
    let audioBuffer = audioContext.createBuffer(1, concatenatedLinearPCMData.length, 8000);

    // Fill the AudioBuffer with the concatenated linear PCM data
    let bufferChannel = audioBuffer.getChannelData(0);
    for (let i = 0; i < concatenatedLinearPCMData.length; i++) {
        bufferChannel[i] = concatenatedLinearPCMData[i];
    }

    // Create a buffer source
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // Connect the source to the audio context's output (speakers)
    source.connect(audioContext.destination);

    // Start playing the audio
    source.start();

    // Function to convert mu-law to linear PCM
    function muLawToLinearPCM(muLawData) {
        console.log('converting???')
        const muLawDecompressTable = new Int16Array(256);
        for (let i = 0; i < 256; i++) {
            let n = i ^ 0xFF; // Invert the bits
            let sign = n & 0x80; // Extract the sign bit
            n &= 0x7F; // Remove the sign bit

            let sample = (n < 31) ? n * 2 + 1 : n * 4 + 33; // Decompression algorithm
            sample <<= 2; // Left shift to align with 16-bit
            if (sign === 0) sample = -sample; // Apply the sign

            muLawDecompressTable[i] = sample;
        }
    
        let linearPCM = new Float32Array(muLawData.length);
        for (let i = 0; i < muLawData.length; i++) {
            let muLawByte = muLawData.charCodeAt(i) & 0xFF; // Get the byte value
            linearPCM[i] = muLawDecompressTable[muLawByte] / 32768.0; // Normalize to [-1, 1]
        }
        // ... conversion logic ...
        console.log('did not convert')
        return linearPCM;
    }

}