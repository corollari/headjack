var app = new Vue({
	el: '#app',
	data: {
		network: "",
		getStorageInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			key: "bd097b2fcf70e1fd30a5c3ef51e662feeafeba01",
			network: "TestNet",
		},
		getBalanceInput: {
			params: [{
				"address": "AScKxyXmNtEnTLTvbVhNQyTJmgytxhwSnM",
				"assets": ["GAS"]
			}],
			network: "TestNet",
		},
		invokeReadInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			operation: "balanceOf",
			args: [{ "type": "ByteArray", "value": "bd097b2fcf70e1fd30a5c3ef51e662feeafeba01" }],
			network: "TestNet",
		},
		invokeInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			operation: "transfer",
			args: [{ "type": "ByteArray", "value": "" }, { "type": "ByteArray", "value": "" }, { "type": "ByteArray", "value": "0100000000000000" }],
			fee: "0.11",
			network: "TestNet",
			triggerContractVerification: false,
			broadcastOverride: false,
		},
		invokeMultiInput: {
			invokeArgs: [
				{
					scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
					operation: "transfer",
					args: [{ "type": "ByteArray", "value": "" }, { "type": "ByteArray", "value": "" }, { "type": "ByteArray", "value": "0100000000000000" }],
					triggerContractVerification: false,
					attachedAssets: {
						'NEO': 1,
					}
				},
				{
					scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
					operation: "transfer",
					args: [{ "type": "ByteArray", "value": "" }, { "type": "ByteArray", "value": "" }, { "type": "ByteArray", "value": "0100000000000000" }],
					triggerContractVerification: true,
					attachedAssets: {
						'NEO': 2,
					}
				}
			],
			fee: "0.11",
			network: "TestNet",
			broadcastOverride: false,
		},
		sendInput: {
			fromAddress: "ANtdacYPFN6zkarDwVt5vH55FKsJU8SapW",
			toAddress: "ANtdacYPFN6zkarDwVt5vH55FKsJU8SapW",
			asset: "GAS",
			amount: "1",
			remark: "TestRemark",
			fee: "0.011",
			network: "TestNet",
			broadcastOverride: false,
		},
		signMessageInput: {
			message: "Here is a message",
		},
		verifyMessageInput: {
			message: "Here is a message",
			data: "",
			publicKey: "",
		},
		getBlockInput: {
			blockHeight: 2619690,
			network: "TestNet",
		},
		getBlockHeightInput: {
			network: "TestNet",
		},
		getTransactionInput: {
			txid: "",
			network: "TestNet",
		},
		getApplicationLogInput: {
			txid: "",
			network: "TestNet",
		},
		encryptInput: {
			recipientPublicKey: '03ca7443e1ec9e9c502ebe5a8f6d76f02f9b74bf9063bf3921ad9b76d389218529',
			data: 'Guess what'
		},
		decryptInput: {
			senderPublicKey: '029c6fac1f105c2eef68a220018eada4740d013e0cf0091e9aa1fb95f2e328d1c8',
			data: "da4f21c329bcc3f46fb158d0b343ebad",
			iv: "700a956325e3ac16184013ea8199bada",
			mac: "581672efafea08d9d2cf8033f5c2af1995ac4323c981d241ce71b89e7bce5dbb"
		}
	},
	watch: {
		network: function (value) {
			this.getStorageInput.network = value;
			this.getBalanceInput.network = value;
			this.invokeReadInput.network = value;
			this.invokeInput.network = value;
			this.invokeMultiInput.network = value;
			this.sendInput.network = value;
			this.getBlockInput.network = value;
			this.getBlockHeightInput.network = value;
			this.getTransactionInput.network = value;
			this.getApplicationLogInput.network = value;
		}
	},
	methods: {
		formatInput(json) {
			return JSON.stringify(json, null, "\t");
		}
	}
})


function getProvider(elem) {
	neoDapi.getProvider()
		.then(function (data) {
			const formatted = syntaxHighlight(data);
			document.getElementById(elem).innerHTML = formatted;
		})
		.catch(function (error) {
			document.getElementById(elem).innerHTML = syntaxHighlight(error);
		});
}

function getNetworks(elem) {
	neoDapi.getNetworks()
		.then(function (data) {
			const formatted = syntaxHighlight(data);
			document.getElementById(elem).innerHTML = formatted;
		})
		.catch(function (error) {
			document.getElementById(elem).innerHTML = syntaxHighlight(error);
		});
}

function getAccount(elem) {
	neoDapi.getAccount()
		.then(accountData => {
			const formatted = syntaxHighlight(accountData);
			document.getElementById(elem).innerHTML = formatted;
		})
		.catch(function (error) {
			document.getElementById(elem).innerHTML = syntaxHighlight(error);
		});
}


function getPublicKey(elem) {
	neoDapi.getPublicKey()
		.then(function (data) {
			const formatted = syntaxHighlight(data);
			document.getElementById(elem).innerHTML = formatted;
		})
		.catch(function (error) {
			document.getElementById(elem).innerHTML = syntaxHighlight(error);
		});
}


function getBalance(inputElement, resultElem) {
	try {
		neoDapi.getBalance(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getStorage(inputElement, resultElem) {
	neoDapi.getStorage(JSON.parse(document.getElementById(inputElement).value))
		.then(function (data) {
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function (error) {
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
}


function invokeRead(inputElement, resultElem) {
	try {
		neoDapi.invokeRead(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function invoke(inputElement, resultElem) {
	try {
		neoDapi.invoke(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function invokeMulti(inputElement, resultElem) {
	try {
		neoDapi.invokeMulti(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}


function send(inputElement, resultElem) {
	try {
		neoDapi.send(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function signMessage(inputElement, resultElem) {
	try {
		neoDapi.signMessage(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}


function verifyMessage(inputElement, resultElem) {
	try {
		neoDapi.verifyMessage(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getBlock(inputElement, resultElem) {
	try {
		neoDapi.getBlock(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getBlockHeight(inputElement, resultElem) {
	try {
		neoDapi.getBlockHeight(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getTransaction(inputElement, resultElem) {
	try {
		neoDapi.getTransaction(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getApplicationLog(inputElement, resultElem) {
	try {
		neoDapi.getApplicationLog(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function encrypt(inputElement, resultElem) {
	try {
		neoDapi.encrypt(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(data);
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function decrypt(inputElement, resultElem) {
	try {
		neoDapi.decrypt(JSON.parse(document.getElementById(inputElement).value))
			.then(function (data) {
				const formatted = syntaxHighlight(new TextDecoder("utf-8").decode(data));
				document.getElementById(resultElem).innerHTML = formatted;
			})
			.catch(function (error) {
				document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
			});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}