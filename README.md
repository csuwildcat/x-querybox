## X-QUERYBOX - *The Element Query Web Component*

### How to use X-QUERYBOX

1. Add the X-Tag Web Components library to your page
2. Add the main.js amd main.css files located in /src to your page 
3. Start having hyper-responsive, element query fun!

#### Example HTML:

```HTML
  <x-querybox media="query(small, (max-width: 300px) and (max-height: 300px))">

    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>

  </x-querybox>
```

#### Adding `mediachange` Listeners:

```JS
  document.querySelector('x-querybox').addEventListener('mediachange', function(e){
    if (e.detail.indexOf('small') > -1) {
      // the 'small' query is active, do some small stuff!
    }
  });
```