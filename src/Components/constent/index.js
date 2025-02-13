export const factoryContract = "0xd384E6A167634F2E9864649F320C2e5dF80Cfb5d";

export const factoryContractAbi = [{ "inputs": [{ "internalType": "string", "name": "_groupName", "type": "string" }, { "internalType": "uint256", "name": "_paymentFrequency", "type": "uint256" }, { "internalType": "string", "name": "_rules", "type": "string" }, { "internalType": "uint256", "name": "_minimumContribution", "type": "uint256" }, { "internalType": "uint256", "name": "_maxMembersCount", "type": "uint256" }, { "internalType": "uint256", "name": "_groupDuration", "type": "uint256" }, { "internalType": "bool", "name": "_isDAOSupported", "type": "bool" }, { "internalType": "string", "name": "_groupId", "type": "string" }], "name": "createGroup", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_groupId", "type": "string" }], "name": "getGroupById", "outputs": [{ "components": [{ "internalType": "address", "name": "groupAddress", "type": "address" }, { "internalType": "string", "name": "groupName", "type": "string" }, { "internalType": "uint256", "name": "frequencyPrice", "type": "uint256" }, { "internalType": "uint256", "name": "frequencyTime", "type": "uint256" }, { "internalType": "string", "name": "groupDetails", "type": "string" }, { "internalType": "uint256", "name": "groupSize", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "bool", "name": "isDaoSupported", "type": "bool" }, { "internalType": "address", "name": "owner", "type": "address" }], "internalType": "struct PradnaFiFactoryStorage.groupDetails", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getGroupsList", "outputs": [{ "components": [{ "internalType": "address", "name": "groupAddress", "type": "address" }, { "internalType": "string", "name": "groupName", "type": "string" }, { "internalType": "uint256", "name": "frequencyPrice", "type": "uint256" }, { "internalType": "uint256", "name": "frequencyTime", "type": "uint256" }, { "internalType": "string", "name": "groupDetails", "type": "string" }, { "internalType": "uint256", "name": "groupSize", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "bool", "name": "isDaoSupported", "type": "bool" }, { "internalType": "address", "name": "owner", "type": "address" }], "internalType": "struct PradnaFiFactoryStorage.groupDetails[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "groups", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_groupId", "type": "string" }], "name": "isGroupByIdExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_groupAddress", "type": "address" }, { "internalType": "address", "name": "_userAddress", "type": "address" }], "name": "isJoined", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_groupAddress", "type": "address" }], "name": "removeGroup", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]


export const groupAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundsDistributed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "member",
                "type": "address"
            }
        ],
        "name": "MemberJoined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "member",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentMade",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "ProposalCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "vote",
                "type": "bool"
            }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "admin",
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
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "calculateExitPenalty",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newFrequency",
                "type": "uint256"
            }
        ],
        "name": "changePaymentFrequency",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "createdTimestamp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "distributeFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            }
        ],
        "name": "finalizeProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractAddress",
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
        "inputs": [],
        "name": "groupDuration",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "groupName",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_groupName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_paymentFrequency",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_rules",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_minimumContribution",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_maxMembersCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_groupDuration",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_isDAOSupported",
                "type": "bool"
            }
        ],
        "name": "initilize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isDAOSupported",
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
        "inputs": [],
        "name": "joinGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "leaveGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "makePayment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxMembersCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
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
        "name": "members",
        "outputs": [
            {
                "internalType": "address",
                "name": "memberAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "contribution",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastPayment",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "penalties",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minimumContribution",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paymentFrequency",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
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
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "yesVotes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "noVotes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rules",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "viewMember",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "memberAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "contribution",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastPayment",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "penalties",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct PradnaFiGroupStorage.Member",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approve",
                "type": "bool"
            }
        ],
        "name": "voteOnProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]


