**The end point**
p https://data.mongodb-api.com/app/application-qrcode-ukplu/endpoint/data/v1



```js
 async function wrapper() {
      const result = await fetch(
        `https://data.mongodb-api.com/app/application-qrcode-ukplu/endpoint/product?arg1=Product&arg2=name&arg3=alpha`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstParam: "yourFirstParam",
            secondParam: "yourOtherValue",
          }),
        }
      );
      console.log(Object.keys(result));
    } 
```
```
tab to scan button
```