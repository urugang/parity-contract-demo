output=$(curl -s http://localhost:8540 -H 'Content-Type: application/json'	 --data-raw '
{
 "jsonrpc":"2.0",
 "method":"parity_enode",
 "params":[],
 "id":0
}')
node0=$(echo $output|jq '.result')

echo $node0
curl http://localhost:8541 -H 'Content-Type: application/json' --data-raw '
{
 "jsonrpc":"2.0",
 "method":"parity_addReservedPeer",
 "params":['$node0'],
 "id":0
}'
