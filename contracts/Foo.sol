pragma solidity ^0.4.7;
contract Foo {
  bytes  name;
  bool z2;
  bytes3[2] xy2;
  uint[]  data2;
  function bar(bytes3[2] xy) {
    xy2 = xy;
  }
  function baz(uint32 x, bool y) returns (bool r) {
    r = x > 32 || y;
  }
  function sam(bytes name2, bool z, uint[] data) {
    name2 = name2;
    z2 = z;
    data2= data;
  }
}
