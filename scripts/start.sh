#!/bin/bash
RUST_LOG=evm,state=trace nohup parity ui --config config/node0.toml --ui-no-validation                    > /tmp/node0.log 2>&1 &
RUST_LOG=evm,state=trace nohup parity ui --config config/node1.toml --ui-no-validation --ports-shift=100  > /tmp/node1.log 2>&1 &
