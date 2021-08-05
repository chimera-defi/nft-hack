#!/usr/bin/env bash
set -e -o pipefail

python3 set_tokens.py -i ~/Downloads/mdtp/kiba.jpg -n 'Kiba Labs' -t 711 -w 1 -h 1 -d "Bringing you the finest digital products" -u "https://www.kibalabs.com"
sleep 90
python3 transfer_tokens.py -t 711 -w 1 -h 1 -r '0x18090cDA49B21dEAffC21b4F886aed3eB787d032'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/1729.png -n '1729.com' -t 1729 -w 1 -h 1 -d "Learn Skills. Earn Crypto." -u '1729.com'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/doutore-logo.png -n 'Doutore' -t 3623 -w 10 -h 2 -u 'doutore.com'
sleep 90
python3 transfer_tokens.py -t 3623 -w 10 -h 2 -r '0x13fFCd7A643D2C8b83fAa8F2217819129E2413d4'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/CVZA.png -n 'Earn free airdrops for every Cerveza ($CVZA) you hodl!' -t 96 -w 5 -h 4 -d 'Freibier.io performs Airdorps-as-a-Service on Tezos chain, it helps project owners to execute their airdrops seamlessly. Every airdrop automatically distributes a portion of the drop the the holders of Freibier.io tokens: https://www.freibier.io/' -u 'Freibier.io'
sleep 90
python3 transfer_tokens.py -t 96 -w 5 -h 4 -r '0x65f6F29D3eb871254d71A79CC4F74dB3AAF3b86e'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/eviday.png -n 'Eviday' -t 1417 -w 6 -h 2 -d 'Eviday is a UCL-backed startup offering a solution to businesses trying to make hybrid working work. We are developing an employee experience platform that enables organisations to understand in real-time how their people, technology and workplaces affect the wellbeing and productivity of their people. Find out more here: https://eviday.ai/' -u 'https://eviday.ai'
sleep 90
python3 transfer_tokens.py -t 1417 -w 6 -h 2 -r '0x3eA4b5f220e2049A7D5f49efb12832238048e7ea'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/hashink.png -n 'Hashink NFT Autographs for Everyone!' -t 7563 -w 6 -h 3 -d 'Hashink is the modern version of autographs for celebrities.  NFT autographs, with royalty perks for celebrities and fans, and 100% memorabilia ownership for the end user.' -u 'https://hashink.app/'
sleep 90
python3 transfer_tokens.py -t 7563 -w 6 -h 3 -r '0x53a24123D2feB61b53A499119a90b9E5a62726Be'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/shhbuzz.png -n 'Shhh!' -t 6319 -w 4 -h 5 -d 'Use https://shhh.buzz/ to send secret messages to your friends and colleagues.' -u 'https://shhh.buzz'
sleep 90
python3 transfer_tokens.py -t 6319 -w 4 -h 5 -r '0x28e22396C45Ac478C70F3fdD438c56af2F8B50f9'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/CocoNFT_10-2.png -n 'CocoNFT' -t 2775 -w 10 -h 2 -d "NFTs made easy for creators. Use CocoNFT to turn your social media posts like Instagram into NFTs that you can sell to your fans and followers. Best of all, there's no upfront costs. Get started at CocoNFT.com" -u 'https://CocoNFT.com'
sleep 90
python3 transfer_tokens.py -t 2775 -w 10 -h 2 -r '0x8c2650AaB5Ed6C5349e477FF42AC9df1b792882B'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/goodghosting.png -n 'GoodGhosting' -t 5727 -w 4 -h 5 -d 'GoodGhosting is a DeFi saving pool that rewards regular contributions. Jump in at https://goodghosting.com/' -u 'https://goodghosting.com'
sleep 90
python3 transfer_tokens.py -t 5727 -w 4 -h 5 -r '0xEd936bc60AF587DdD1Ab93728e7164cC288FdE82'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/dappy.png -n 'dAppy Doge' -t 2341 -w 4 -h 5 -d "dAppy Doge is an endless flying game with NFTs!" -u 'https://dappydoge.com'
sleep 90
python3 transfer_tokens.py -t 2341 -w 4 -h 5 -r '0xdD4c825203f97984e7867F11eeCc813A036089D1'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/kangaroo.png -n 'Kangaroo Discord Bot' -t 4684 -w 4 -h 4 -d "Kangaroo is an Ethereum tipping bot built on Layer 2. Send and recieve tokens with nearly 100x lower fees. Engage and incentivize your community with crypto funds that your members can actually use. Add to Discord at https://kangaroobot.xyz/." -u 'https://kangaroobot.xyz/'
sleep 90
python3 transfer_tokens.py -t 4684 -w 4 -h 4 -r '0x1aAf71Ee97713566FB7138e4FcE4f33bE5514227'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/azulo-app.jpg -n 'Azulo-app' -t 4967 -w 5 -h 4 -d "Azulo is a decentralized family trust system to manage and govern joint assets without limitations based on location or wealth class. You can find the Azulo app at https://azulo.app/." -u 'https://azulo.app/'
sleep 90
python3 transfer_tokens.py -t 4967 -w 5 -h 4 -r '0x60Bd53e0aC10c3F6e16D9768FA9DBE56339DAF9b'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/mckurz.png -n 'McKurz Capital DEX' -t 5879 -w 5 -h 3 -d "The McKurz Capital DEX is a decentralized ERC-20 exchange where users can exchange assets from within an Ethereum wallet without the hassle and cost of transferring tokens or NFT's to a centralized exchange. You can find the Kovan deployment of the exchange at https://www.mckurz-dex.com/" -u 'https://www.mckurz-dex.com/'
sleep 90
python3 transfer_tokens.py -t 5879 -w 5 -h 3 -r '0x91744ccD83d4CA77a4e4698374A9D18d0c99db48'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/rarepress.png -n 'Rarepress' -t 2848 -w 6 -h 4 -d "Rarepress is an NFT Operating System that makes it dead simple to programmatically mint, trade, and interact with NFTs on Ethereum, with nothing but a few lines of JavaScript code." -u 'https://rarepress.org/'
sleep 90
python3 transfer_tokens.py -t 2848 -w 6 -h 4 -r '0xFb7b2717F7a2a30B42e21CEf03Dd0fC76Ef761E9'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/logo_poap.png -n 'POAP' -t 3155 -w 5 -h 6 -d "The bookmarks of your life" -u 'http://poap.xyz/'
sleep 90
python3 transfer_tokens.py -t 3155 -w 5 -h 6 -r '0xf6B6F07862A02C85628B3A9688beae07fEA9C863'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/avastar-james.png -n 'Avastars' -t 6643 -w 5 -h 5 -d "Generative Art Stored Entirely On The Blockchain.  Second Generation NFT allowing #Trueownership of Digital Art." -u "https://avastars.io/"
sleep 90
python3 transfer_tokens.py -t 6643 -w 5 -h 5 -r '0xafB5b05AFB592fBA50d094d294b3Cf3F0cBA93a3'
sleep 90
python3 set_tokens.py -i ~/Downloads/mdtp/alien.jpeg -n "VOID #4815" -t 4815 -w 3 -h 3 -d "Visitor of Imma Degen #4815, aka \"The Party\"" -u "https://twitter.com/VOID4815"
sleep 90
python3 transfer_tokens.py -t 4815 -w 3 -h 3 -r '0x594612E533db57C2401D0645BEc5920364acCa6C'
sleep 90
