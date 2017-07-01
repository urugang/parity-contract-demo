#!/bin/bash

set enode=""
while [ -z "$enode" ]; do
	printf "."
	enode=$(curl -s http://localhost:8545 -H 'Content-Type: application/json'	 --data-raw '
	{
 "jsonrpc":"2.0",
 "method":"parity_enode",
 "params":[],
 "id":0
	}'|jq '.result')
done
printf "\n%s\n", $enode
curl http://localhost:8645 -H 'Content-Type: application/json' --data-raw '
{
 "jsonrpc":"2.0",
 "method":"parity_addReservedPeer",
 "params":['$enode'],
 "id":0
}'
