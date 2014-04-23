(function(){

  var isIE = xtag.prefix.lowercase == 'ms';
  var queryRegExp = /query\((.+?(?=\)\s*query|\)$))/ig;
  var mediaRule = ' @media {rule} { [query-id="{id}"] { opacity: 1; } }';
  var baseRule = 'html, body { margin: 0; padding: 0 } div { ' + xtag.prefix.css + 'transition: opacity 0.01s; transition: opacity 0.01s; opacity: 0; }';
  
  function attachObject(box){
    var obj = document.createElement('object');
    obj.__querybox__ = box;
    obj.onload = objectLoad;
    obj.type = 'text/html';
    if (!isIE) obj.data = 'about:blank';
    box.appendChild(obj);
    if (isIE) obj.data = 'about:blank'; // must add data source after insertion, because IE is a goon
    return obj;
  }
  
  function objectLoad(e){
    var box = this.__querybox__;
    var doc = box.xtag.doc = this.contentDocument;
    doc.__querybox__ = box;
    setStyle(doc, baseRule);
    xtag.addEvent(doc, 'transitionend', debounceMatching);
    parseQueries(box);
    box.xtag.loaded = true;
  }
  
  function debounceMatching(e){
    var doc = this;
    if (!doc.__matching__) {
      doc.__matching__ = xtag.requestFrame(function(){
        getMatches(doc);
        doc.__matching__ = null;
      });
    };
  }
  
  function setStyle(doc, rules){
    var style = doc.createElement('style');
    style.innerHTML = rules;
    if (doc.head.firstChild) doc.head.removeChild(doc.head.firstChild);
    doc.head.appendChild(style);
  }
  
  function parseQueries(box){
    var media = box.getAttribute('media');
    if (media != null) {
      var rules = baseRule;
      var nodes = '';
      var matches = media.match(queryRegExp);
      box.setAttribute('matched-media', '');
      if (matches != null) matches.forEach(function(match){
        var values = match.replace('query(', '').split(',');
        var id = values.shift();
        nodes += '<div query-id="' + id + '"></div>';
        rules += mediaRule.replace('{rule}', values.join(',').trim()).replace('{id}', id);
      });
      var doc = box.xtag.doc;
      setStyle(doc, rules);
      doc.body.innerHTML = nodes;
      bod = doc.body;
      getMatches(doc);
    }
  }
  
  function getMatches(doc){
    var matches = [];
    var box = doc.__querybox__;
    var nodes = doc.body.children;
    var index = nodes.length;
    while (index--) {
      // if you don't use the <object> defaultView's getComputedStyle, Firefox evaluates the query incorrectly
      if (doc.defaultView.getComputedStyle(nodes[index]).opacity == '1') {
        matches.push(nodes[index].getAttribute('query-id'));
      }
    }
    box.setAttribute('matched-media', matches.join(' '));
    xtag.fireEvent(box, 'mediachange', { detail: matches });
  }
  
  xtag.register('x-querybox', {
    lifecycle: {
      created: function() {
        var box = this;
        box.xtag.listeners = [];
        var obj = box.xtag.object = attachObject(box);
        xtag.addObserver(box, 'removed', function(node){
          if (node == obj) box.appendChild(obj);
        });
      }
    },
    accessors: {
      media: {
        attribute: {},
        set: function(){
          if (this.xtag.loaded) parseQueries(this);
        }
      },
      matchedMedia: {
        attribute: { name: 'matched-media' }
      }
    }
  });
                                                                                                                                                                                                                                                                                                            console.error('HiringError: You haven\'t hired Daniel yet! - Hey there, I\'m a creative, technical Product Manager who just left Mozilla after 5 years to seek new adventures. Aside from arcane web hackery, I love teaming up to build innovative products and delightful user experiences. If you\'re interested in picking up an all-star free agent, email me at danieljb2@gmail.com');
})();