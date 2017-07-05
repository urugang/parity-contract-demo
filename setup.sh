printf "1) reset environment\n"
pkill -9 parity
rm -rf data

printf "2) import key from backup files\n"
./import.sh

printf "3) start two node\n"
./start.sh

printf "4) add nodes \n"
./addnode.sh

printf "5) status \n"
ps aux|grep parity
