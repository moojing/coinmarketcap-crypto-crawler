import { ActionPanel, CopyToClipboardAction, Icon , List, OpenInBrowserAction, showToast, ToastStyle } from "@raycast/api";
import { useState, useEffect } from "react";
import $ from "cheerio";
import fetch from "node-fetch";

export default function ArticleList() {
  const [currencyPrice, setCurrencyPrice] = useState('');

  useEffect(() => {
  }, []);


  const onSearch = async (search: string) => {
    console.log('search :', search);
    const price  = await fetchPrice(search);
      
      console.log('price :', price);
      setCurrencyPrice(price)
    

  }
  return (
    <List isLoading={!currencyPrice}
      throttle
      searchBarPlaceholder="enter the crypto name ... "
      onSearchTextChange={onSearch}>


      <List.Item
        title={currencyPrice}
        subtitle="Raycast Blog"
        icon={Icon.Star}
        // accessoryTitle={new Date(article.date_modified).toLocaleDateString()}
        // actions={
        //   <ActionPanel>
        //     {/* <OpenInBrowserAction url={article.url} /> */}
        //     {/* <CopyToClipboardAction title="Copy URL" content={article.url} /> */}
        //   </ActionPanel>
        // }
      />

    </List>
  );
}



async function fetchPrice(coinName: string) {
console.log('coinName :', coinName);

  
  // fetch(`https://coinmarketcap.com/currencies/${coinName}/`)
  // .then((r) => r.text())
  // .then((html) => {
  //   const $html = $.load(html);
    
  //   const priceResult = $html(".priceValue")
  //   console.log('priceResult :', priceResult);
  //   if(!priceResult) return 0;
  //   return priceResult
    
  // });
  return 'mujings'
}
 