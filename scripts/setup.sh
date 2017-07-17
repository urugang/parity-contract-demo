printf "1) reset environment\n"
pkill -9 parity
rm -rf data
rm -rf node_modules
npm install

printf "2) import key from backup files\n"
./scripts/import.sh

printf "3) start two node\n"
./scripts/start.sh

printf "4) add nodes \n"
./scripts/addnode.sh

printf "5) status \n"
ps aux|grep parity
