#!/bin/bash
nohup parity ui --config node0.toml --ui-no-validation > /tmp/node0.log 2>&1 &
nohup parity ui --config node1.toml --ui-no-validation --ports-shift=100  > /tmp/node1.log 2>&1 &
