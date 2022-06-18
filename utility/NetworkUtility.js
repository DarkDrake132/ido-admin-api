function ChainIdToNetwork(ChainId) {
    switch (ChainId) {
        //the default case ethereum case
        /**
         * 1: Main network
         * 3: Ropsten
         * 4: Rinkby
         * 5: Goerli
         * 42: Kovan
         */
        case 1:
          case 3:
            case 4:
              case 5:
                case 42:
          return "ETH";
        case 56:
          case 97:
          return "BNB";
        default:
          return "ETH";
    }
}

module.exports = {
    ChainIdToNetwork
}