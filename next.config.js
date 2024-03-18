const withTM = require('next-transpile-modules')(['react-tweet']); // substitua 'react-tweet' pelo nome do módulo que você deseja transpilar

module.exports = withTM({
  // outras configurações aqui...
});
