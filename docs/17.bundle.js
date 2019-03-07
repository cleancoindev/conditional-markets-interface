(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{491:function(module){eval('module.exports = {"contractName":"ERC20Detailed","abi":[{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x18160ddd"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x70a08231"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa9059cbb"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xdd62ed3e"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x06fdde03"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x95d89b41"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x313ce567"}],"bytecode":"0x","deployedBytecode":"0x","sourceMap":"","deployedSourceMap":"","source":"pragma solidity >0.4.24;\\n\\nimport \\"./IERC20.sol\\";\\n\\n/**\\n * @title ERC20Detailed token\\n * @dev The decimals are only for visualization purposes.\\n * All the operations are done using the smallest and indivisible token unit,\\n * just as on Ethereum all the operations are done in wei.\\n */\\ncontract ERC20Detailed is IERC20 {\\n  string private _name;\\n  string private _symbol;\\n  uint8 private _decimals;\\n\\n  constructor(string memory name, string memory symbol, uint8 decimals)\\n    public\\n  {\\n    _name = name;\\n    _symbol = symbol;\\n    _decimals = decimals;\\n  }\\n\\n  /**\\n   * @return the name of the token.\\n   */\\n  function name() public view returns(string memory) {\\n    return _name;\\n  }\\n\\n  /**\\n   * @return the symbol of the token.\\n   */\\n  function symbol() public view returns(string memory) {\\n    return _symbol;\\n  }\\n\\n  /**\\n   * @return the number of decimals of the token.\\n   */\\n  function decimals() public view returns(uint8) {\\n    return _decimals;\\n  }\\n}\\n","sourcePath":"openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol","ast":{"absolutePath":"openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol","exportedSymbols":{"ERC20Detailed":[5349]},"id":5350,"nodeType":"SourceUnit","nodes":[{"id":5293,"literals":["solidity",">","0.4",".24"],"nodeType":"PragmaDirective","src":"0:24:19"},{"absolutePath":"openzeppelin-solidity/contracts/token/ERC20/IERC20.sol","file":"./IERC20.sol","id":5294,"nodeType":"ImportDirective","scope":5350,"sourceUnit":5419,"src":"26:22:19","symbolAliases":[],"unitAlias":""},{"baseContracts":[{"arguments":null,"baseName":{"contractScope":null,"id":5295,"name":"IERC20","nodeType":"UserDefinedTypeName","referencedDeclaration":5418,"src":"309:6:19","typeDescriptions":{"typeIdentifier":"t_contract$_IERC20_$5418","typeString":"contract IERC20"}},"id":5296,"nodeType":"InheritanceSpecifier","src":"309:6:19"}],"contractDependencies":[5418],"contractKind":"contract","documentation":"@title ERC20Detailed token\\n@dev The decimals are only for visualization purposes.\\nAll the operations are done using the smallest and indivisible token unit,\\njust as on Ethereum all the operations are done in wei.","fullyImplemented":false,"id":5349,"linearizedBaseContracts":[5349,5418],"name":"ERC20Detailed","nodeType":"ContractDefinition","nodes":[{"constant":false,"id":5298,"name":"_name","nodeType":"VariableDeclaration","scope":5349,"src":"320:20:19","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string"},"typeName":{"id":5297,"name":"string","nodeType":"ElementaryTypeName","src":"320:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"private"},{"constant":false,"id":5300,"name":"_symbol","nodeType":"VariableDeclaration","scope":5349,"src":"344:22:19","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string"},"typeName":{"id":5299,"name":"string","nodeType":"ElementaryTypeName","src":"344:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"private"},{"constant":false,"id":5302,"name":"_decimals","nodeType":"VariableDeclaration","scope":5349,"src":"370:23:19","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":5301,"name":"uint8","nodeType":"ElementaryTypeName","src":"370:5:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"value":null,"visibility":"private"},{"body":{"id":5323,"nodeType":"Block","src":"481:71:19","statements":[{"expression":{"argumentTypes":null,"id":5313,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":5311,"name":"_name","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5298,"src":"487:5:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":5312,"name":"name","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5304,"src":"495:4:19","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string memory"}},"src":"487:12:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"id":5314,"nodeType":"ExpressionStatement","src":"487:12:19"},{"expression":{"argumentTypes":null,"id":5317,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":5315,"name":"_symbol","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5300,"src":"505:7:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":5316,"name":"symbol","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5306,"src":"515:6:19","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string memory"}},"src":"505:16:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"id":5318,"nodeType":"ExpressionStatement","src":"505:16:19"},{"expression":{"argumentTypes":null,"id":5321,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":5319,"name":"_decimals","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5302,"src":"527:9:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":5320,"name":"decimals","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5308,"src":"539:8:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"src":"527:20:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"id":5322,"nodeType":"ExpressionStatement","src":"527:20:19"}]},"documentation":null,"id":5324,"implemented":true,"kind":"constructor","modifiers":[],"name":"","nodeType":"FunctionDefinition","parameters":{"id":5309,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5304,"name":"name","nodeType":"VariableDeclaration","scope":5324,"src":"410:18:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5303,"name":"string","nodeType":"ElementaryTypeName","src":"410:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"},{"constant":false,"id":5306,"name":"symbol","nodeType":"VariableDeclaration","scope":5324,"src":"430:20:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5305,"name":"string","nodeType":"ElementaryTypeName","src":"430:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"},{"constant":false,"id":5308,"name":"decimals","nodeType":"VariableDeclaration","scope":5324,"src":"452:14:19","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":5307,"name":"uint8","nodeType":"ElementaryTypeName","src":"452:5:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"value":null,"visibility":"internal"}],"src":"409:58:19"},"returnParameters":{"id":5310,"nodeType":"ParameterList","parameters":[],"src":"481:0:19"},"scope":5349,"src":"398:154:19","stateMutability":"nonpayable","superFunction":null,"visibility":"public"},{"body":{"id":5331,"nodeType":"Block","src":"655:23:19","statements":[{"expression":{"argumentTypes":null,"id":5329,"name":"_name","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5298,"src":"668:5:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"functionReturnParameters":5328,"id":5330,"nodeType":"Return","src":"661:12:19"}]},"documentation":"@return the name of the token.","id":5332,"implemented":true,"kind":"function","modifiers":[],"name":"name","nodeType":"FunctionDefinition","parameters":{"id":5325,"nodeType":"ParameterList","parameters":[],"src":"617:2:19"},"returnParameters":{"id":5328,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5327,"name":"","nodeType":"VariableDeclaration","scope":5332,"src":"640:13:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5326,"name":"string","nodeType":"ElementaryTypeName","src":"640:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"639:15:19"},"scope":5349,"src":"604:74:19","stateMutability":"view","superFunction":null,"visibility":"public"},{"body":{"id":5339,"nodeType":"Block","src":"785:25:19","statements":[{"expression":{"argumentTypes":null,"id":5337,"name":"_symbol","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5300,"src":"798:7:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"functionReturnParameters":5336,"id":5338,"nodeType":"Return","src":"791:14:19"}]},"documentation":"@return the symbol of the token.","id":5340,"implemented":true,"kind":"function","modifiers":[],"name":"symbol","nodeType":"FunctionDefinition","parameters":{"id":5333,"nodeType":"ParameterList","parameters":[],"src":"747:2:19"},"returnParameters":{"id":5336,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5335,"name":"","nodeType":"VariableDeclaration","scope":5340,"src":"770:13:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5334,"name":"string","nodeType":"ElementaryTypeName","src":"770:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"769:15:19"},"scope":5349,"src":"732:78:19","stateMutability":"view","superFunction":null,"visibility":"public"},{"body":{"id":5347,"nodeType":"Block","src":"923:27:19","statements":[{"expression":{"argumentTypes":null,"id":5345,"name":"_decimals","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5302,"src":"936:9:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"functionReturnParameters":5344,"id":5346,"nodeType":"Return","src":"929:16:19"}]},"documentation":"@return the number of decimals of the token.","id":5348,"implemented":true,"kind":"function","modifiers":[],"name":"decimals","nodeType":"FunctionDefinition","parameters":{"id":5341,"nodeType":"ParameterList","parameters":[],"src":"893:2:19"},"returnParameters":{"id":5344,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5343,"name":"","nodeType":"VariableDeclaration","scope":5348,"src":"916:5:19","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":5342,"name":"uint8","nodeType":"ElementaryTypeName","src":"916:5:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"value":null,"visibility":"internal"}],"src":"915:7:19"},"scope":5349,"src":"876:74:19","stateMutability":"view","superFunction":null,"visibility":"public"}],"scope":5350,"src":"283:669:19"}],"src":"0:953:19"},"legacyAST":{"absolutePath":"openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol","exportedSymbols":{"ERC20Detailed":[5349]},"id":5350,"nodeType":"SourceUnit","nodes":[{"id":5293,"literals":["solidity",">","0.4",".24"],"nodeType":"PragmaDirective","src":"0:24:19"},{"absolutePath":"openzeppelin-solidity/contracts/token/ERC20/IERC20.sol","file":"./IERC20.sol","id":5294,"nodeType":"ImportDirective","scope":5350,"sourceUnit":5419,"src":"26:22:19","symbolAliases":[],"unitAlias":""},{"baseContracts":[{"arguments":null,"baseName":{"contractScope":null,"id":5295,"name":"IERC20","nodeType":"UserDefinedTypeName","referencedDeclaration":5418,"src":"309:6:19","typeDescriptions":{"typeIdentifier":"t_contract$_IERC20_$5418","typeString":"contract IERC20"}},"id":5296,"nodeType":"InheritanceSpecifier","src":"309:6:19"}],"contractDependencies":[5418],"contractKind":"contract","documentation":"@title ERC20Detailed token\\n@dev The decimals are only for visualization purposes.\\nAll the operations are done using the smallest and indivisible token unit,\\njust as on Ethereum all the operations are done in wei.","fullyImplemented":false,"id":5349,"linearizedBaseContracts":[5349,5418],"name":"ERC20Detailed","nodeType":"ContractDefinition","nodes":[{"constant":false,"id":5298,"name":"_name","nodeType":"VariableDeclaration","scope":5349,"src":"320:20:19","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string"},"typeName":{"id":5297,"name":"string","nodeType":"ElementaryTypeName","src":"320:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"private"},{"constant":false,"id":5300,"name":"_symbol","nodeType":"VariableDeclaration","scope":5349,"src":"344:22:19","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string"},"typeName":{"id":5299,"name":"string","nodeType":"ElementaryTypeName","src":"344:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"private"},{"constant":false,"id":5302,"name":"_decimals","nodeType":"VariableDeclaration","scope":5349,"src":"370:23:19","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":5301,"name":"uint8","nodeType":"ElementaryTypeName","src":"370:5:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"value":null,"visibility":"private"},{"body":{"id":5323,"nodeType":"Block","src":"481:71:19","statements":[{"expression":{"argumentTypes":null,"id":5313,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":5311,"name":"_name","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5298,"src":"487:5:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":5312,"name":"name","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5304,"src":"495:4:19","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string memory"}},"src":"487:12:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"id":5314,"nodeType":"ExpressionStatement","src":"487:12:19"},{"expression":{"argumentTypes":null,"id":5317,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":5315,"name":"_symbol","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5300,"src":"505:7:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":5316,"name":"symbol","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5306,"src":"515:6:19","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string memory"}},"src":"505:16:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"id":5318,"nodeType":"ExpressionStatement","src":"505:16:19"},{"expression":{"argumentTypes":null,"id":5321,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":5319,"name":"_decimals","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5302,"src":"527:9:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":5320,"name":"decimals","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5308,"src":"539:8:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"src":"527:20:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"id":5322,"nodeType":"ExpressionStatement","src":"527:20:19"}]},"documentation":null,"id":5324,"implemented":true,"kind":"constructor","modifiers":[],"name":"","nodeType":"FunctionDefinition","parameters":{"id":5309,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5304,"name":"name","nodeType":"VariableDeclaration","scope":5324,"src":"410:18:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5303,"name":"string","nodeType":"ElementaryTypeName","src":"410:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"},{"constant":false,"id":5306,"name":"symbol","nodeType":"VariableDeclaration","scope":5324,"src":"430:20:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5305,"name":"string","nodeType":"ElementaryTypeName","src":"430:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"},{"constant":false,"id":5308,"name":"decimals","nodeType":"VariableDeclaration","scope":5324,"src":"452:14:19","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":5307,"name":"uint8","nodeType":"ElementaryTypeName","src":"452:5:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"value":null,"visibility":"internal"}],"src":"409:58:19"},"returnParameters":{"id":5310,"nodeType":"ParameterList","parameters":[],"src":"481:0:19"},"scope":5349,"src":"398:154:19","stateMutability":"nonpayable","superFunction":null,"visibility":"public"},{"body":{"id":5331,"nodeType":"Block","src":"655:23:19","statements":[{"expression":{"argumentTypes":null,"id":5329,"name":"_name","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5298,"src":"668:5:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"functionReturnParameters":5328,"id":5330,"nodeType":"Return","src":"661:12:19"}]},"documentation":"@return the name of the token.","id":5332,"implemented":true,"kind":"function","modifiers":[],"name":"name","nodeType":"FunctionDefinition","parameters":{"id":5325,"nodeType":"ParameterList","parameters":[],"src":"617:2:19"},"returnParameters":{"id":5328,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5327,"name":"","nodeType":"VariableDeclaration","scope":5332,"src":"640:13:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5326,"name":"string","nodeType":"ElementaryTypeName","src":"640:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"639:15:19"},"scope":5349,"src":"604:74:19","stateMutability":"view","superFunction":null,"visibility":"public"},{"body":{"id":5339,"nodeType":"Block","src":"785:25:19","statements":[{"expression":{"argumentTypes":null,"id":5337,"name":"_symbol","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5300,"src":"798:7:19","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},"functionReturnParameters":5336,"id":5338,"nodeType":"Return","src":"791:14:19"}]},"documentation":"@return the symbol of the token.","id":5340,"implemented":true,"kind":"function","modifiers":[],"name":"symbol","nodeType":"FunctionDefinition","parameters":{"id":5333,"nodeType":"ParameterList","parameters":[],"src":"747:2:19"},"returnParameters":{"id":5336,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5335,"name":"","nodeType":"VariableDeclaration","scope":5340,"src":"770:13:19","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":5334,"name":"string","nodeType":"ElementaryTypeName","src":"770:6:19","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"769:15:19"},"scope":5349,"src":"732:78:19","stateMutability":"view","superFunction":null,"visibility":"public"},{"body":{"id":5347,"nodeType":"Block","src":"923:27:19","statements":[{"expression":{"argumentTypes":null,"id":5345,"name":"_decimals","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":5302,"src":"936:9:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"functionReturnParameters":5344,"id":5346,"nodeType":"Return","src":"929:16:19"}]},"documentation":"@return the number of decimals of the token.","id":5348,"implemented":true,"kind":"function","modifiers":[],"name":"decimals","nodeType":"FunctionDefinition","parameters":{"id":5341,"nodeType":"ParameterList","parameters":[],"src":"893:2:19"},"returnParameters":{"id":5344,"nodeType":"ParameterList","parameters":[{"constant":false,"id":5343,"name":"","nodeType":"VariableDeclaration","scope":5348,"src":"916:5:19","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"},"typeName":{"id":5342,"name":"uint8","nodeType":"ElementaryTypeName","src":"916:5:19","typeDescriptions":{"typeIdentifier":"t_uint8","typeString":"uint8"}},"value":null,"visibility":"internal"}],"src":"915:7:19"},"scope":5349,"src":"876:74:19","stateMutability":"view","superFunction":null,"visibility":"public"}],"scope":5350,"src":"283:669:19"}],"src":"0:953:19"},"compiler":{"name":"solc","version":"0.5.1+commit.c8a2cb62.Emscripten.clang"},"networks":{},"schemaVersion":"3.0.1","updatedAt":"2019-03-07T11:00:13.884Z","devdoc":{"details":"The decimals are only for visualization purposes. All the operations are done using the smallest and indivisible token unit, just as on Ethereum all the operations are done in wei.","methods":{"decimals()":{"return":"the number of decimals of the token."},"name()":{"return":"the name of the token."},"symbol()":{"return":"the symbol of the token."}},"title":"ERC20Detailed token"},"userdoc":{"methods":{}}};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiI0OTEuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///491\n')}}]);