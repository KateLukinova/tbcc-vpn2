
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
                    $( "#total-market-cap" ).html( '$' + parseFloat(bnbToUsd * btbcToBnb * 1000000).toFixed(0) );
                    $( "#vtbc-key" ).html(parseFloat( 26 / (bnbToUsd * btbcToBnb)).toFixed(2) + ' ' + 'VTBC');
                });
            });
        });
    });

    var dictionary = {
        EN: {
            menuItemOne: 'How to use',
            menuItemTwo: 'VTBC Token',
            menuItemThree: 'About',
            menuItemFour: 'choose language',
            tbccVPN: 'TBCC VPN',
            mainH2: ' Try the first decentralized blockchain-based VPN. Even a supercomputer will not get an acсess to your data.',
            mainCaptionOne: 'New era of safety',
            mainPBlockOne: 'TBCC VPN is based on Cellframe platform. Instead of other VPN, we implement quantum-safe cryptography that protects all your operation and information. TBCC VPN is completely anonymous due to multiple routing.',
            mainCaptionTwo: 'Main advantages',
            mainUlBlockLiOne: '• Simple and easy to use interface;',
            mainUlBlockLiTwo: '• More secure than centralized VPNs – be sure that all your data and transactions will be safe',
            mainUlBlockLiThree: '• TBCC VPN doesn’t collect logs',
            mainUlBlockLiFour: '• It has no single point of failure that is why it can’t be blocked;',
            mainUlBlockLiFive: '• TBCC VPN users can’t be identified by payments or traffic trace',
            mainUlBlockLiSix: '• Fast internet connection.',
            mainCaptionThree: 'No more borders',
            mainPBlockTwo: 'Get unlimited access to music, social media, videos, apps, and to many internet resources from any place in the world. Forget about geo-blocks and enjoy the Internet without cyber borders.',
            textButton: 'start to use',
            footerItemOne: 'Contact us',
            footerItemTwo: 'follow us',
            footerItemThree: 'Return Policy',
            footerItemFour: 'Terms of use',
            footerItemFive: 'Privacy Policy',
            footerItemSix: 'Complete description of services offered',
            tokenH1: 'What is VTBC?',
            tokenH2: ' VTBC token is the new digital asset that is released by TBCC VPN. It is fully decentralized and can be traded on Binance DEX with pair of BNB. VTBC is available on Binance Chain platform.',
            tokenCaptionOne: 'VTBC - new token on blockchain',
            tokenUlBlockOne: 'Afordable price',
            tokenUlBlockTwo: 'Fixed quantity with 1.000.000 token',
            tokenUlBlockThree: 'Works seamlessly with new BEP8 protocol',
            tokenUlBlockFour: 'Available for buying on Binance DEX or via TBCC Wallet',
            tokenCaptionTwo: 'Usage of VTBC',
            tokenPItemOne: 'Pay for your VPN keys to activate the TBCC VPN app',
            tokenPItemTwo: 'With VTBC token you can trade on Binance DEX',
            tokenPItemThree: 'AirDrop — share your VTBC token via AirDrop',
            tokenCaptionThree: 'VTBC Market perfomance',
            totalMarketCap: 'Total Market Cap',
            priceText: 'Price',
            volumeText: '24h Volume',
            globalRankText: 'Global Rank (protocol BEP8)',
            howH1: 'How to use TBCC VPN?',
            howH2: 'To start using TBCC VPN you need to do just 2 steps',
            howPBlockOne: 'To begin working with TBCC VPN you have to download the app (currently available for Android only)',
            howPBlockTwo: 'To activate VPN app you need to have VPN key.',
            howCaptionOne: 'How to get TBCC VPN key?',
            howPBlockThree: 'It’s quite simple. You have to download TBCC Wallet mobile app and buy a key with VTBC token.',
            howPBlockFour: 'VTBC tokens can be changed on Binance DEX in pair VTBC/BNB or in TBCC Wallet app on your mobile phone.',
            key: 'key',
            howPBlockFive: 'Note: you need to have Binance Coin (BNB) on your balance',
            aboutH1: 'About TBCC VPN',
            aboutH2: 'TBCC VPN is one of the services that is provided to users by TBCC Labs. The mission of TBCC VPN is to provide safe and fast internet connection without any logs, spy or selling data. We want to help our users to forget about cyber borders, without compromising the safety of data. Our priority is to make all your transactions fast and secure.',
            globalServers: 'Global servers',
            aboutPBlockOne: 'We don’t use servers as ordinary VPN services do. TBCC VPN is totally decentralized. You can be in any place in the world and use our VPN, your location doesn\'t matter.',
            aboutCaptionOne: 'Unlike other VPN, TBCC VPN has such distinctive features as:',
            aboutUlBlockOne: 'IP Blacklisting',
            aboutUlBlockTwo: ' QoS Guarantees',
            aboutUlBlockThree: 'No Logging – you have no need to provide your ID to the service;',
            aboutUlBlockFour: 'Internal VPN stock',
            aboutUlBlockFive: 'Variable encryption',
            keyFeatures: 'Key Features',
            aboutCaptionTwo: 'Why TBCC VPN is better?',
            aboutPBlockTwo: 'TBCC VPN is much safer than other VPNs because it implements original cryptography, unlike other VPNs. The connection of the Internet will be extremely fast – you have no need to worry that you won’t succeed to do an immediate purchase on Binance DEX. Also, TBCC VPN has and easy-to-use interface. We provide you with totally anonymous app, that will never provide information upon your transactions and data.',
            aboutH3One: 'Shielded and widened internet surfing',
            aboutH3Two: 'Totally anonymous',
            aboutH3Three: 'Decentralized',
            aboutPBlockThree: 'With TBCC VPN, you are fully protected from tracking and monitoring. You can work in the Internet, watch videos, use any app.',
            aboutPBlockFour: 'TBCC VPN protects you from the undesired attention from spy websites and annoying advertisers. No problems with visiting websites – your real IP will never be flagged on the Internet.',
            aboutPBlockFive: 'TBCC VPN is based on the decentralized Cellframe blockchain platform. Decentralization allows you to be independent of servers location and your connection is as fast as possible!'
        },
        RU: {
            menuItemOne: 'Kак использовать',
            menuItemTwo: 'Токен VTBC',
            menuItemThree: 'О сервисе',
            menuItemFour: 'выбрать язык',
            tbccVPN: 'TBCC VPN',
            mainH2: 'Начните использовать первый децентрализованный блокчейн VPN. Даже супер компьютер не получит доступ к вашим данным',
            mainCaptionOne: 'Новая эра безопасности',
            mainPBlockOne: 'TBCC VPN создана на платформе Cellframe. В отличии от других сервисов VPN, мы внедрили квантово-безопасное шифрование, которое защит все ваши операции и информацию. TBCC VPN является полностью анонимным приложением из-за множественной маршрутизации.',
            mainCaptionTwo: 'Основные достоинства',
            mainUlBlockLiOne: '• Простой и легкий в использовании интерфейс;',
            mainUlBlockLiTwo: '• Более безопасный, чем централизованные VPN приложения – будьте уверены, что все ваши данные и операции будут в сохранности ',
            mainUlBlockLiThree: '• TBCC VPN не собирает лаги',
            mainUlBlockLiFour: '• У него нет единой точки отказа, поэтому его нельзя заблокировать',
            mainUlBlockLiFive: '• Пользователи TBCC VPN не могут быть идентифицированы за счет платежей или движения трафика',
            mainUlBlockLiSix: ' • Быстрое интернет соединение',
            mainCaptionThree: 'Больше никаких границ',
            mainPBlockTwo: 'Получите неограниченный доступ к музыке, социальным медиа, видео, приложениям и другим интернет ресурсам из любой точки планеты. Забудьте о гео-блоках и наслаждайтесь интернетом без кибер границ',
            textButton: 'начать использование',
            footerItemOne: 'свяжитесь с нами',
            footerItemTwo: 'Следите и подписывайтесь на наши социальные сети',
            footerItemThree: 'Политика возврата',
            footerItemFour: 'Правила использования',
            footerItemFive: 'Политика конфиденциальности',
            footerItemSix: 'Полное описание предлагаемых сервисов',
            tokenH1: 'Что такое VTBC?',
            tokenH2: 'VTBC токен это новый вид цифровых активов, выпущенный сервисом TBCC VPN. Он полностью децентрализован и может торговаться на Binance DEX в паре с BNB. VTBC доступен на платформе Binance Chain.',
            tokenCaptionOne: 'VTBC - новый токен в блокчейн',
            tokenUlBlockOne: 'Доступная цена',
            tokenUlBlockTwo: 'Фиксированное количество в 1.000.000 токенов',
            tokenUlBlockThree: 'Работает бесперебойно с новым BEP8 протоколом',
            tokenUlBlockFour: 'Доступен для покупки на бирже Binance DEX или через TBCC Wallet',
            tokenCaptionTwo: 'Использование VTBC',
            tokenPItemOne: 'Оплачивайте VPN ключи для активации приложения TBCC VPN ',
            tokenPItemTwo: 'С VTBC token вы можете торговать на бирже Binance DEX',
            tokenPItemThree: 'Получайте VTBC token через AirDrop',
            tokenCaptionThree: 'Рыночные данные о VTBC',
            totalMarketCap: 'Общая рыночная капитализация',
            priceText: 'Цена',
            volumeText: '24 часовой объем',
            globalRankText: 'Мировой рейтинг (среди протокола BEP8)',
            howH1: 'как использовать TBCC VPN?',
            howH2: 'Для того, чтобы начать использование TBCC VPN вам необходимо сделать всего 2 шага',
            howPBlockOne: 'Для начала работы с приложением TBCC VPN вам нужно установить мобильное приложение (временно доступно только приложение для Android)',
            howPBlockTwo: 'Для того, чтобы активировать VPN приложение вам необходимо иметь VPN ключ',
            howCaptionOne: 'Как получить ключ для TBCC VPN?',
            howPBlockThree: 'Это достаточно просто. Вам необходимо установить мобильное приложение TBCC Wallet и купить ключ при помощи VTBC токенов. Войти в кошелек',
            howPBlockFour: 'Токены VTBC можно получить на бирже Binance DEX в паре VTBC/BNB или в приложении TBCC Wallet на вашем мобильном телефоне',
            key: 'ключ',
            howPBlockFive: 'Внимание: вам необходимо иметь Binance Coin (BNB) на вашем балансе',
            aboutH1: 'О TBCC VPN',
            aboutH2: 'TBCC VPN является одним из сервисов, предоставляемых пользователям компанией TBCC Labs. Миссия TBCC VPN - обеспечить безопасное и быстрое подключение к Интернету без каких-либо лагов, шпионажа или продажи данных. Мы хотим помочь нашим пользователям забыть о кибер-границах, не ставя при этом под угрозу безопасность данных. Наш приоритет - сделать все ваши транзакции быстрыми и безопасными.',
            globalServers: 'Международные серверы',
            aboutPBlockOne: 'Мы не используем серверы, как обычные VPN-сервисы. TBCC VPN полностью децентрализован. Вы можете быть в любой точке мира и использовать наш VPN, ваше местоположение не имеет значения.',
            aboutCaptionOne: 'В отличии от других VPN сервисов TBCC VPN имеет следующие отличительные характеристики:',
            aboutUlBlockOne: 'IP Blacklisting (черный список IP);',
            aboutUlBlockTwo: 'QoS гарантии;',
            aboutUlBlockThree: 'Никаких логинов– вам не нужно предоставлять ваши персональные данные для пользования сервисом',
            aboutUlBlockFour: 'Внутренний VPN сток',
            aboutUlBlockFive: 'Переменное шифрование.',
            keyFeatures: 'Ключевые особенности',
            aboutCaptionTwo: 'Почему TBCC VPN лучше других?',
            aboutPBlockTwo: 'TBCC VPN намного безопаснее, чем другие VPN, потому что мы используем оригинальную криптографию, в отличие от других VPN. Подключение к Интернету будет очень быстрым - вам не нужно беспокоиться о том, что вам не удастся совершить мгновенную покупку на Binance DEX. Кроме того, TBCC VPN имеет простой и легкий в использовании интерфейс. Мы предоставляем вам абсолютно анонимное приложение, которое никогда не предоставит информацию о ваших транзакциях и данных.',
            aboutH3One: 'Расширенный интернет-серфинг',
            aboutH3Two: 'Полностью анонимный',
            aboutH3Three: 'Децентрализованный',
            aboutPBlockThree: 'С TBCC VPN вы полностью защищены от отслеживания и мониторинга. Вы можете работать в Интернете, смотреть видео, использовать любые приложения.',
            aboutPBlockFour: 'TBCC VPN защищает вас от нежелательного внимания со стороны шпионских сайтов и раздражающих рекламодателей. Никаких проблем с посещением веб-сайтов - ваш реальный IP никогда не будет заметен в Интернете.',
            aboutPBlockFive: 'TBCC VPN основан на децентрализованной платформе блокчейна Cellframe. Децентрализация позволяет вам быть независимым от расположения серверов, и ваше соединение будет максимально быстрым!'
        },
        CH: {
            menuItemOne: '使用方法',
            menuItemTwo: 'VTBC令牌',
            menuItemThree: '关于服务',
            menuItemFour: '选择语言',
            tbccVPN: '关于TBCC VPN',
            mainH2: '请开始使用第一个去中心化的区块链VPN。 甚至超级计算机也无法访问您的数据。',
            mainCaptionOne: '新的安全时代',
            mainPBlockOne: 'TBCC VPN建立在Cellframe平台上。 与其他VPN服务不同，我们实施了量子安全加密，可以保护您的所有交易和信息。 由于存在多个路由，TBCC VPN是完全匿名的。',
            mainCaptionTwo: '主要优点',
            mainUlBlockLiOne: '• 简单易用的界面',
            mainUlBlockLiTwo: '• 比集中式VPN应用程序更安全-放心，所有数据和操作都将是安全的',
            mainUlBlockLiThree: '• TBCC VPN不收集延迟',
            mainUlBlockLiFour: '• 它没有单点故障，因此无法阻止',
            mainUlBlockLiFive: '• 由于付款或流量无法识别TBCC VPN用户',
            mainUlBlockLiSix: ' • 快速的互联网连接',
            mainCaptionThree: '不再有边界',
            mainPBlockTwo: '从世界任何地方无限访问音乐，社交媒体，视频，应用程序和其他Internet资源。 忘记地理障碍，享受无网络边界的互联网',
            textButton: '开始使用',
            footerItemOne: '联系我们',
            footerItemTwo: '关注并订阅我们的社交网络',
            footerItemThree: '退货政策',
            footerItemFour: '使用条款',
            footerItemFive: '隐私政策',
            footerItemSix: '提供服务的完整说明',
            tokenH1: '什么是VTBC？',
            tokenH2: 'VTBC令牌是TBCC VPN服务发行的一种新型数字资产。 它是完全去中心化的，可以在与BNB配对的Binance DEX上进行交易。 VTBC在Binance Chain平台上可用。',
            tokenCaptionOne: 'VTBC-区块链中的新代币',
            tokenUlBlockOne: '可接受的价格',
            tokenUlBlockTwo: '固定数量的1,000,000令牌',
            tokenUlBlockThree: '与新的BEP8协议无缝运行',
            tokenUlBlockFour: '可在Binance DEX或TBCC钱包上购买',
            tokenCaptionTwo: '使用VTBC',
            tokenPItemOne: '支付VPN密钥以激活TBCC VPN应用',
            tokenPItemTwo: '使用VTBC令牌，您可以在Binance DEX上进行交易',
            tokenPItemThree: '通过AirDrop接收VTBC令牌',
            tokenCaptionThree: 'VTBC的市场数据',
            totalMarketCap: '总市值',
            priceText: '价钱',
            volumeText: '24小时成交量',
            globalRankText: '世界排名（在BEP8协议中）五',
            howH1: '如何使用TBCC VPN？',
            howH2: '为了开始使用TBCC VPN，您只需采取2个步骤',
            howPBlockOne: '要开始使用TBCC VPN应用，您需要安装移动应用程序（目前仅Android版本暂时可用）',
            howPBlockTwo: '为了激活VPN应用程序，您需要有一个VPN密钥',
            howCaptionOne: '如何获得TBCC VPN的密钥？',
            howPBlockThree: '很简单。 您需要安装TBCC Wallet移动应用程序并使用VTBC令牌购买密钥。 登录钱包',
            howPBlockFour: 'VTBC令牌可以在VTBC / BNB对中的Binance DEX上获得，也可以在手机上的TBCC Wallet应用中获得',
            key: '个VPN密钥',
            howPBlockFive: '注意：您的余额中需要有Binance Coin（BNB）',
            aboutH1: '关于TBCC VPN',
            aboutH2: 'TBCC VPN是TBCC Labs向用户提供的服务之一。TBCC VPN的使命是提供安全，快速的Internet连接，而不会出现任何滞后，被监视或被出售数据的情况。 ',
            globalServers: '国际服务器',
            aboutPBlockOne: '我们不使用像常规VPN服务这样的服务器。 TBCC VPN已完全分散。 您可以在世界任何地方使用我们的VPN，您的位置不受限制。',
            aboutCaptionOne: '与其他VPN服务不同，TBCC VPN具有以下鲜明特征',
            aboutUlBlockOne: 'IP黑名单（IP黑名单）',
            aboutUlBlockTwo: 'QoS保证',
            aboutUlBlockThree: '无需登录-您无需提供个人数据即可使用该服务',
            aboutUlBlockFour: '内部VPN径流',
            aboutUlBlockFive: '可变加密',
            keyFeatures: '关键特征',
            aboutCaptionTwo: '为什么TBCC VPN比其他更好？',
            aboutPBlockTwo: 'TBCC VPN比其他VPN安全得多，因为我们使用的原始加密技术不同于其他VPN。 您的互联网连接将非常快速-您不必担心无法立即在Binance DEX上进行购买。 此外，TBCC VPN具有简单易用的界面。',
            aboutH3One: '进阶网路冲浪',
            aboutH3Two: '完全匿名',
            aboutH3Three: '去中心化',
            aboutPBlockThree: '使用TBCC VPN，可以完全保护您免受跟踪和监视。您可以浏览互联网，观看视频或使用任何应用程序。',
            aboutPBlockFour: 'TBCC VPN可保护您免受间谍网站和烦人的广告商的不必要的关注。访问网站没有问题-您的真实IP将永远不会在Internet上可见。',
            aboutPBlockFive: 'TBCC VPN基于Cellframe分散式区块链平台。分散化使您可以独立于服务器位置，并且连接将尽可能快！'
        }

    }

    var language = 'EN';

    setLanguage(dictionary, language);

    $('.lang').change(function () {
        language = $(this).val();
        setLanguage(dictionary, language);
    })
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

function setLanguage(dictionary, language)
{
    $('#menuItemOne').text(dictionary[language].menuItemOne);
    $('#menuItemTwo').text(dictionary[language].menuItemTwo);
    $('#menuItemThree').text(dictionary[language].menuItemThree);
    $('#menuItemFour').text(dictionary[language].menuItemFour);
    $('#tbccVPN').text(dictionary[language].tbccVPN);
    $('#mainH2').text(dictionary[language].mainH2);
    $('#mainCaptionOne').text(dictionary[language].mainCaptionOne);
    $('#mainPBlockOne').text(dictionary[language].mainPBlockOne);
    $('#mainCaptionTwo').text(dictionary[language].mainCaptionTwo);
    $('#mainUlBlockLiOne').text(dictionary[language].mainUlBlockLiOne);
    $('#mainUlBlockLiTwo').text(dictionary[language].mainUlBlockLiTwo);
    $('#mainUlBlockLiThree').text(dictionary[language].mainUlBlockLiThree);
    $('#mainUlBlockLiFour').text(dictionary[language].mainUlBlockLiFour);
    $('#mainUlBlockLiFive').text(dictionary[language].mainUlBlockLiFive);
    $('#mainUlBlockLiSix').text(dictionary[language].mainUlBlockLiSix);
    $('#mainCaptionThree').text(dictionary[language].mainCaptionThree);
    $('#mainPBlockTwo').text(dictionary[language].mainPBlockTwo);
    $('#textButton').text(dictionary[language].textButton);
    $('#footerItemOne').text(dictionary[language].footerItemOne);
    $('#footerItemFour').text(dictionary[language].footerItemFour);
    $('#footerItemFive').text(dictionary[language].footerItemFive);
    $('#tokenH1').text(dictionary[language].tokenH1);
    $('#tokenH2').text(dictionary[language].tokenH2);
    $('#tokenCaptionOne').text(dictionary[language].tokenCaptionOne);
    $('#tokenUlBlockOne').text(dictionary[language].tokenUlBlockOne);
    $('#tokenUlBlockTwo').text(dictionary[language].tokenUlBlockTwo);
    $('#tokenUlBlockThree').text(dictionary[language].tokenUlBlockThree);
    $('#tokenUlBlockFour').text(dictionary[language].tokenUlBlockFour);
    $('#tokenCaptionTwo').text(dictionary[language].tokenCaptionTwo);
    $('#tokenPItemOne').text(dictionary[language].tokenPItemOne);
    $('#tokenPItemTwo').text(dictionary[language].tokenPItemTwo);
    $('#tokenPItemThree').text(dictionary[language].tokenPItemThree);
    $('#tokenCaptionThree').text(dictionary[language].tokenCaptionThree);
    $('#totalMarketCap').text(dictionary[language].totalMarketCap);
    $('#priceText').text(dictionary[language].priceText);
    $('#volumeText').text(dictionary[language].volumeText);
    $('#globalRankText').text(dictionary[language].globalRankText);

}
