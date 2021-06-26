((()=>{

  //----------------------------------------------------------------------------
  // UNDERpost.net LIBRARY
  //----------------------------------------------------------------------------

  {{UNDERPOST}}

  //----------------------------------------------------------------------------
  // COMPONENTS
  //----------------------------------------------------------------------------

  {{COMPONENTS}}

  //----------------------------------------------------------------------------
  // GLOBAL
  //----------------------------------------------------------------------------

  const global = {
    init: async ()=>{
      notifiValidator.loader();
      contentPlayGrid.loader();
      cards.loader();
    },
    render: async ()=>{
      notifiValidator.render();
      contentPlayGrid.render();
      cards.render();
    }
  };

  //----------------------------------------------------------------------------
  // DATA
  //----------------------------------------------------------------------------

  let data = {
    const: {
      callback: 100,
      lang: lang()=='en' ? 0 : 1,
      dir: 'ltr',
      token: null
    },
    var: {
      w: null,
      h: null
    }
  };

  {{INITDATA}}

  //----------------------------------------------------------------------------
  // MAIN HTML ( HEAD & BODY )
  //----------------------------------------------------------------------------

  const main = {
    init: async ()=> {
      s('html').lang = ['en','es'][data.const.lang];
      s('html').dir = data.const.dir;
      console.log('init template system lang -> '+['en','es'][data.const.lang]);
      append('body',`
        <style>
            h1, h2 {
              display: none;
            }
            body {
              cursor: default;
            }
        </style>
      `);
      notclick('body', 1, false);
	    notclick('body', 2, false);
      global.init();
      main.render();
    },
    render: async ()=>{
      if(data.var.w!=window.innerWidth || data.var.h!=window.innerHeight){
        data.var.w=window.innerWidth;
        data.var.h=window.innerHeight;
        s('body').style.width = data.var.w+'px';
        s('body').style.height = data.var.h+'px';
        console.log('-> render | w:'+data.var.w+' h:'+data.var.h);
        global.render();
      }
      console.log('callback');
      await timer(data.const.callback);
      main.render();
    }
  };

  main.init();

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
})());
