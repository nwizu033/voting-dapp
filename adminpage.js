let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

const Abi =[
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
const contractp = new ethers.Contract(contractAddress, Abi, provider);
window.onload = checkState;


async function checkState(){ 
    let state = await contractp.state();
    if(state!==false){
        document.getElementById("openclose").innerHTML ="Open";
    }
    else {
        document.getElementById("openclose").innerHTML ="Closed";
    }
    
    console.log(state);

}

async function openClose() {
    signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Abi, signer);
    let openClose = await contract.openCloseVoting();
    let state = await contractp.state();
    await openClose.wait();
	alert("Done, refresh to check state");
    if(state!==false){
        document.getElementById("openclose").innerHTML ="Open";
    }
    else {
        document.getElementById("openclose").innerHTML ="Closed";
    }
    
    console.log(state);

}