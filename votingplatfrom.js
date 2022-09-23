
let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

const Abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "delegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "giveRightToVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "openCloseVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "proposalNames",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chairman",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "vote",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = "0x3430e6e3F31eFA13322831fc3B7C490659065789";

window.onload = general;

// function that loads on window load.

function general() {
	// Alert the state of voting;
	checkState();

	// get voting right
	let votingRight = document.getElementById("rightButton");
		votingRight.onclick = function(e){
			getRight();
		}

	// Delegating vote
	let delegatingVote = document.getElementById("delegateButton");
		delegatingVote.onclick = function(e){
			delegateVote();
		}


	// voting Atiku Abubakar
	let votingAtiku = document.getElementById("voteatiku");
		votingAtiku.onclick = function(e){
		voteAtiku();
	}
	// voting Bola Tinubu
	let votingTinubu = document.getElementById("votetinubu");
		votingTinubu.onclick = function(e){
		voteTinubu();
	}
	// voting Peter Obi
	let votingObi = document.getElementById("voteobi");
		votingObi.onclick = function(e){
		voteObi();
	}

	// checking results
	let checkingResult = document.getElementById("checkresult");
		checkingResult.onclick = function(e){
			checkResult();
		}	
}

// This function checks if voting is either open or closed;
async function checkState() {
    const contractp = new ethers.Contract(contractAddress, Abi, provider);
    let state = await contractp.state();
    if(state!==false){
        alert("Voting is still open");
    }
    else {
        alert("Voting is closed");
    }
    
    console.log(state);

}

// this function gives voting right to the signer
async function getRight() {
    signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Abi, signer);
    const rightAddress = document.getElementById("rightAddress").value;
    let rightGetter = await contract.giveRightToVote(rightAddress);
 	await rightGetter.wait();
	alert("You can now vote or delegate");
}


// this function delegates voting right to another address
async function delegateVote() {
    signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Abi, signer);
    const addressValue = document.getElementById("delAddress").value;
    let delVote = await contract.delegate(addressValue);
	await delVote.wait();
	alert("Done delegating");

}


// get candidates' data and result when called
async function checkResult() {
    const contract = new ethers.Contract(contractAddress, Abi, provider)

    let atiku = await contract.proposals(0);
	document.getElementById("atiku").innerHTML = atiku[0];
	document.getElementById("atikuvotes").innerHTML = atiku[1];


	let tinubu = await contract.proposals(1);
    document.getElementById("tinubu").innerHTML = tinubu[0];
    document.getElementById("tinubuvotes").innerHTML = tinubu[1];


    let obi = await contract.proposals(2);
    document.getElementById("obi").innerHTML = obi[0];
    document.getElementById("obivotes").innerHTML = obi[1];   
}



async function voteAtiku() {
    signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Abi, signer);
    const value = 0;
    let castvote = await contract.vote(value);
	document.getElementById("atikuvotes").innerHTML ="voting..."
	await castvote.wait();
	alert("Done voting PDP, Check result");
	document.getElementById("atikuvotes").innerHTML = castvote;
	document.getElementById("atikuvotes").innerHTML = "check";

}


async function voteTinubu() {
    signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Abi, signer);
    const value = 1;
    let castvote = await contract.vote(value);
	document.getElementById("tinubuvotes").innerHTML ="voting...";
	await castvote.wait();
	alert("Done voting APC, Check result");
	document.getElementById("tinubuvotes").innerHTML = castvote;
	document.getElementById("tinubuvotes").innerHTML = "check";
}

async function voteObi() {
    signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Abi, signer);
    const value = 2;
    let castvote = await contract.vote(value);
	document.getElementById("obivotes").innerHTML ="voting...";
	await castvote.wait();
	alert("Done voting LP, Check result");
	document.getElementById("obivotes").innerHTML = castvote;
	document.getElementById("obivotes").innerHTML = "check";
}





