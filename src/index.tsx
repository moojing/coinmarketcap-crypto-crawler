import { ActionPanel, CopyToClipboardAction, Icon, List, OpenInBrowserAction, showToast, ToastStyle } from "@raycast/api";
import { useState, useEffect } from "react";
import $ from "cheerio";
import fetch from "node-fetch";

export default function ArticleList() {
  const [currencyPrice, setCurrencyPrice] = useState('');
  const [priceDiff,setPriceDiff] = useState('');
  const [isLoading, setIsLoading] = useState(false)



  const onSearch = (search: string) => {


    setIsLoading(true)

    fetchPrice(search).then(({ priceValueText, priceDiffText }) => {
      setCurrencyPrice(priceValueText);
      setPriceDiff(priceDiffText);
      setIsLoading(false)
    });

  }
  return (
    <List isLoading={isLoading}
      throttle
      searchBarPlaceholder="enter the crypto name ... "
      onSearchTextChange={onSearch}>


      <List.Item
        title={currencyPrice}
        subtitle={priceDiff}
        icon={Icon.Star}
      />

    </List>
  );
}



async function fetchPrice(coinName: string) {
  console.log('coinName :', coinName);


  return fetch(`https://coinmarketcap.com/currencies/${coinName}/`)
    .then((r) => r.text())
    .then((html) => {
      const $html = $.load(html);

      const priceValue = $html(".priceValue")

      const priceDirectionClassName = $html(".priceValue + span > span[class^=icon-Caret]").attr('class');
      const priceDirection = priceDirectionClassName && priceDirectionClassName.split('-').includes('up') ? '+' : '-'
      const priceDiffValue = priceValue.next("span").text()


      const priceDiffText = `${priceDirection} ${priceDiffValue}`



      // console.log('priceValueDiff :', priceValueDiff);
      // > span[class^=icon-Caret]
      // console.log('priceValueDiff :', priceValueDiff);

      // console.log('priceNext :', $html(".priceValue").next().find("class=[icon-Caret-]") );

      const priceValueText = priceValue.text()
      if (!priceValueText) return '';
      return { priceValueText, priceDiffText }
    });

}
