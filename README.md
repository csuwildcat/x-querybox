## X-QUERYBOX - *An Element Query Web Component*

### How to use X-QUERYBOX

1. Add the X-Tag Web Components library to your page
2. Add the main.js amd main.css files located in /src to your page 
3. Start having hyper-responsive, element query fun!

#### Example Markup:

```HTML
  <x-querybox media="query(small-width, (max-width: 300px) and (max-height: 300px))">

    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>

  </x-querybox>
```

#### Example CSS:

```CSS
  x-querybox[matched-media~="small-width"] {
    font-size: 50%; /* small text for a wee lil element! */
  }
```

#### Adding `mediachange` Event Listeners:

```JS
  document.querySelector('x-querybox').addEventListener('mediachange', function(e){
    if (e.detail.indexOf('small-width') > -1) {
      // the 'small-width' query is active, do some smally-widthy stuff!
    }
  });
```