
$( document ).ready(function() {

    AOS.init({
        duration: 1000,
    })

    $(".collapse-button").click(function () {
        $(this).toggleClass('show')
        $('.collapse-content').slideToggle()
    });

    if (screen.width > 990) {
        $('.lang-select').select2();
    } else {
        $('.lang-select-mobile').select2();
    }


    var result = [];

    $.get( "https://dex.binance.org/api/v1/mini/ticker/24hr?symbol=VTBC-C26M_BNB", function( outerData ) {
        $.get( "https://dex.binance.org/api/v1/mini/ticker/24hr", function( data ) {
            $.get( "https://dex.binance.org/api/v1/mini/tokens", function( innerData ) {
                $.get( "https://dex.binance.org/api/v1/ticker/24hr", function( innerInnerData ) {
                    // console.log(data)
                    // console.log(innerData)
                    // console.log(innerInnerData)
                    var bnbToUsd = parseFloat(innerInnerData.find(x => x.symbol == 'BNB_BUSD-BD1').lastPrice);
                    var btbcToBnb = parseFloat(data.find(x => x.symbol == 'VTBC-C26M_BNB').lastPrice);
                    for (let i = 0; i < data.length; i++) {
                        var token = innerData.find(x => data[i].baseAssetName == x.symbol)
                        var totalSupply = null;
                        if (token) {
                            totalSupply = token.total_supply;
                        }
                        result.push({
                            capitalization: parseFloat(totalSupply) * parseFloat(data[i].lastPrice),
                            symbol: data[i].symbol
                        });
                    }

                    result.sort((a, b) => (a.capitalization > b.capitalization) ? -1 : 1)
                    result = result.filter(x => x.capitalization > 0);
                    // console.log(result)
                    var rank = result.findIndex(x => x.symbol == 'VTBC-C26M_BNB') + 1;
                    $( "#global-rank" ).html( rank );

                    $( "#price" ).html( '$' + parseFloat(bnbToUsd * btbcToBnb).toFixed(3) );
                    $( "#volume" ).html( parseFloat(outerData[0].quoteVolume).toFixed(3) + ' ' + 'BNB' );
                    $( "#total-market-cap" ).html( '$' + bnbToUsd * btbcToBnb * 1000000 );
                    $( "#vtbc-key" ).html(parseFloat( bnbToUsd * btbcToBnb * 7).toFixed(1) + ' ' + 'VTBC');
                });
            });
        });
    });

});

function compare( a, b ) {
    if ( a.capitalization < b.capitalization ){
        return -1;
    }
    if ( a.capitalization > b.capitalization ){
        return 1;
    }
    return 0;
}
