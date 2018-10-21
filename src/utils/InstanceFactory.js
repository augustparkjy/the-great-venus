import Web3 from 'web3';
import abi from '../../build/contracts/TGV.json';
import contract from 'truffle-contract';

export const getWeb3Instance = () => {
	return new Promise((resolve, reject) => {
		var results;
		var web3 = window.web3;

		if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
			results = {
				web3Instance: web3
			}
			console.log('Injected web3 detected.');
			resolve(results);
		} else {
			var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
			web3 = new Web3(provider)
			results = {
				web3Instance: web3
			}
			console.log('No web3 instance injected, using Local web3.');
			resolve(results)
		}
	});
}

export const getTGVInstance = web3Instance => {
    const TGV = contract(abi);
    TGV.setProvider(web3Instance.currentProvider);
    return TGV.deployed();
}