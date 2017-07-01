pkill -9 parity
rm -rf data
./import.sh
./start.sh
./addnode.sh
ps aux|grep parity
