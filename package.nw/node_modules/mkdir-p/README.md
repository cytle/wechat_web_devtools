# mkdir-p

  easy used 'mkdir', when dirpath or parent dirpath not exist, it will create the directory automatically.

# install

```js
npm install mkdir-p
```

# usage

Sync:

```js
var mkdir = require('mkdir-p');

mkdir.sync('/a/b/c/d');
```

Async:

```js
var mkdir = require('mkdir-p');

mkdir('/a/b/c/d', function(err){
  if(err){
    console.log(err);
  } else {
    console.log('ok');
  }
});
```

# License

  [MIT](LICENSE)