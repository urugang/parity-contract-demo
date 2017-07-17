#!/bin/bash
RUST_LOG=evm=debug nohup  parity --config config/node0.toml > /tmp/node0.log 2>&1 &
nohup parity ui --config config/node1.toml --ui-no-validation --ports-shift=100  > /tmp/node1.log 2>&1 &
