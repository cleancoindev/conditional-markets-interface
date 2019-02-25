(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{509:function(module){eval('module.exports = {"contractName":"Address","abi":[],"bytecode":"0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a7230582002efeb3803ed341abf2ac8a409a6a568e26af5ebdc40247a605478d606ed80820029","deployedBytecode":"0x73000000000000000000000000000000000000000030146080604052600080fdfea165627a7a7230582002efeb3803ed341abf2ac8a409a6a568e26af5ebdc40247a605478d606ed80820029","sourceMap":"86:948:20:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24","deployedSourceMap":"86:948:20:-;;;;;;;;","source":"pragma solidity >0.4.24;\\n\\n/**\\n * Utility library of inline functions on addresses\\n */\\nlibrary Address {\\n\\n  /**\\n   * Returns whether the target address is a contract\\n   * @dev This function will return false if invoked during the constructor of a contract,\\n   * as the code is not actually created until after the constructor finishes.\\n   * @param account address of the account to check\\n   * @return whether the target address is a contract\\n   */\\n  function isContract(address account) internal view returns (bool) {\\n    uint256 size;\\n    // XXX Currently there is no better way to check if there is a contract in an address\\n    // than to check the size of the code at that address.\\n    // See https://ethereum.stackexchange.com/a/14016/36603\\n    // for more details about how this works.\\n    // TODO Check this again before the Serenity release, because all addresses will be\\n    // contracts then.\\n    // solium-disable-next-line security/no-inline-assembly\\n    assembly { size := extcodesize(account) }\\n    return size > 0;\\n  }\\n\\n}\\n","sourcePath":"openzeppelin-solidity/contracts/utils/Address.sol","ast":{"absolutePath":"openzeppelin-solidity/contracts/utils/Address.sol","exportedSymbols":{"Address":[5398]},"id":5399,"nodeType":"SourceUnit","nodes":[{"id":5381,"literals":["solidity",">","0.4",".24"],"nodeType":"PragmaDirective","src":"0:24:20"},{"baseContracts":[],"contractDependencies":[],"contractKind":"library","documentation":"Utility library of inline functions on addresses","fullyImplemented":true,"id":5398,"linearizedBaseContracts":[5398],"name":"Address","nodeType":"ContractDefinition","nodes":[{"body":{"id":5396,"nodeType":"Block","src":"515:516:20","statements":[{"assignments":[5389],"declarations":[{"constant":false,"id":5389,"name":"size","nodeType":"VariableDeclaration","scope":5396,"src":"521:12:20","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":5388,"name":"uint256","nodeType":"ElementaryTypeName","src":"521:7:20","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"id":5390,"initialValue":null,"nodeType":"VariableDeclarationStatement","src":"521:12:20"},{"externalReferences":[{"size":{"declaration":5389,"isOffset":false,"isSlot":false,"src":"976:4:20","valueSize":1}},{"account":{"declaration":5383,"isOffset":false,"isSlot":false,"src":"996:7:20","valueSize":1}}],"id":5391,"nodeType":"InlineAssembly","operations":"{\\n    size := extcodesize(account)\\n}","src":"965:52:20"},{"expression":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":5394,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":5392,"name":"size","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5389,"src":"1018:4:20","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":">","rightExpression":{"argumentTypes":null,"hexValue":"30","id":5393,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1025:1:20","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"1018:8:20","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"functionReturnParameters":5387,"id":5395,"nodeType":"Return","src":"1011:15:20"}]},"documentation":"Returns whether the target address is a contract\\n@dev This function will return false if invoked during the constructor of a contract,\\nas the code is not actually created until after the constructor finishes.\\n@param account address of the account to check\\n@return whether the target address is a contract","id":5397,"implemented":true,"kind":"function","modifiers":[],"name":"isContract","nodeType":"FunctionDefinition","parameters":{"id":5384,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5383,"name":"account","nodeType":"VariableDeclaration","scope":5397,"src":"469:15:20","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":5382,"name":"address","nodeType":"ElementaryTypeName","src":"469:7:20","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"}],"src":"468:17:20"},"returnParameters":{"id":5387,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5386,"name":"","nodeType":"VariableDeclaration","scope":5397,"src":"509:4:20","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":5385,"name":"bool","nodeType":"ElementaryTypeName","src":"509:4:20","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"value":null,"visibility":"internal"}],"src":"508:6:20"},"scope":5398,"src":"449:582:20","stateMutability":"view","superFunction":null,"visibility":"internal"}],"scope":5399,"src":"86:948:20"}],"src":"0:1035:20"},"legacyAST":{"absolutePath":"openzeppelin-solidity/contracts/utils/Address.sol","exportedSymbols":{"Address":[5398]},"id":5399,"nodeType":"SourceUnit","nodes":[{"id":5381,"literals":["solidity",">","0.4",".24"],"nodeType":"PragmaDirective","src":"0:24:20"},{"baseContracts":[],"contractDependencies":[],"contractKind":"library","documentation":"Utility library of inline functions on addresses","fullyImplemented":true,"id":5398,"linearizedBaseContracts":[5398],"name":"Address","nodeType":"ContractDefinition","nodes":[{"body":{"id":5396,"nodeType":"Block","src":"515:516:20","statements":[{"assignments":[5389],"declarations":[{"constant":false,"id":5389,"name":"size","nodeType":"VariableDeclaration","scope":5396,"src":"521:12:20","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":5388,"name":"uint256","nodeType":"ElementaryTypeName","src":"521:7:20","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"id":5390,"initialValue":null,"nodeType":"VariableDeclarationStatement","src":"521:12:20"},{"externalReferences":[{"size":{"declaration":5389,"isOffset":false,"isSlot":false,"src":"976:4:20","valueSize":1}},{"account":{"declaration":5383,"isOffset":false,"isSlot":false,"src":"996:7:20","valueSize":1}}],"id":5391,"nodeType":"InlineAssembly","operations":"{\\n    size := extcodesize(account)\\n}","src":"965:52:20"},{"expression":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":5394,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"argumentTypes":null,"id":5392,"name":"size","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5389,"src":"1018:4:20","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":">","rightExpression":{"argumentTypes":null,"hexValue":"30","id":5393,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1025:1:20","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"1018:8:20","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"functionReturnParameters":5387,"id":5395,"nodeType":"Return","src":"1011:15:20"}]},"documentation":"Returns whether the target address is a contract\\n@dev This function will return false if invoked during the constructor of a contract,\\nas the code is not actually created until after the constructor finishes.\\n@param account address of the account to check\\n@return whether the target address is a contract","id":5397,"implemented":true,"kind":"function","modifiers":[],"name":"isContract","nodeType":"FunctionDefinition","parameters":{"id":5384,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5383,"name":"account","nodeType":"VariableDeclaration","scope":5397,"src":"469:15:20","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":5382,"name":"address","nodeType":"ElementaryTypeName","src":"469:7:20","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"value":null,"visibility":"internal"}],"src":"468:17:20"},"returnParameters":{"id":5387,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5386,"name":"","nodeType":"VariableDeclaration","scope":5397,"src":"509:4:20","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":5385,"name":"bool","nodeType":"ElementaryTypeName","src":"509:4:20","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"value":null,"visibility":"internal"}],"src":"508:6:20"},"scope":5398,"src":"449:582:20","stateMutability":"view","superFunction":null,"visibility":"internal"}],"scope":5399,"src":"86:948:20"}],"src":"0:1035:20"},"compiler":{"name":"solc","version":"0.5.1+commit.c8a2cb62.Emscripten.clang"},"networks":{},"schemaVersion":"3.0.1","updatedAt":"2019-02-24T16:00:52.043Z","devdoc":{"methods":{}},"userdoc":{"methods":{},"notice":"Utility library of inline functions on addresses"}};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiI1MDkuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///509\n')}}]);