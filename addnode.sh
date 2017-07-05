#!/bin/bash


function get_enode() {
    node=$1
    while [ 1 ] ;
    do
		result=$(curl -s ${node} -H 'Content-Type: application/json'	 --data-raw '
                     {
					 "jsonrpc":"2.0",
                     "method":"parity_enode",
                     "params":[],
                     "id":0
		             }'|jq '.result')
		case ${result} in
			*"enode:"*):
                       enodes[${node}]=${result}
                       return 0
					   ;;
			*):
			  printf "."
			  ;;
		esac
    done
}

function add_enode() {
    node=$1
    enode=${enodes[${node}]}
    result=$(curl -s ${nodes[0]} -H 'Content-Type: application/json' --data-raw '
                  {
                   "jsonrpc":"2.0",
                   "method":"parity_addReservedPeer",
                   "params":['${enode}'],
                   "id":0
                  }'|jq  '.result')
    case $result in
	    true):
             printf "   added (%s) to (%s)\n" ${node}  ${nodes[0]}
             return 0
		     ;;
	    *):
	      printf "error: %s\n" ${result}
          return 1
          ;;
    esac
}

readonly -a nodes=("http://localhost:8545"
	               "http://localhost:8645")
declare -A enodes=()
for node in ${nodes[*]}
do
    get_enode ${node}
done

printf "\n"
for node in ${!enodes[@]}
do
    printf "   %s: %s\n" ${node} ${enodes[${node}]}
done

for node in ${nodes[@]:1}
do
    add_enode ${node}
done
