const contentPlayGrid = {
  loader: async () =>{
    contentPlayGrid.init.renderCss();
    contentPlayGrid.init.renderHtml();
    contentPlayGrid.init.onEvent();
  },
  init: {
    renderHtml: async ()=>{
      append('body', `
            <main class='abs center'>
                  <padding-main class='abs center' style='width: 95%; height: 95%;'>
                  </padding-main>
            </main>
      `);
      s('main').style.border = '2px solid white';
      let altura = 3;
      let anchura = 4;
      let top = 0;
      for(let y = 0; y<altura; y++){
        let left = 0;
        for(let x = 0; x<anchura; x++){
          let color;
          let zone;
          if(y==0){
            color = 'blue';
            zone = 'hand-blue';
          }else if (y==1) {
            if(x==0){
              color = 'blue';
              zone = 'bot-blue';
            }
            if(x==1){
              color = 'blue';
              zone = 'top-blue';
            }
            if(x==2){
              color = 'red';
              zone = 'top-red';
            }
            if(x==3){
              color = 'red';
              zone = 'bot-red';
            }
          }else if(y==2){
            color = 'red';
            zone = 'hand-red';
          }
          append('padding-main', `
              <div class='abs cell cell-`+x+`-`+y+`'
              zone='`+zone+`'
              cell-x='`+x+`'
              cell-y='`+y+`'
              style='
                width: `+(100/anchura)+`%;
                height: `+(100/altura)+`%;
                top: `+top+`%;
                left: `+left+`%;
              '>
                  <div class='abs' style='
                          width: 90%;
                          height: 90%;
                          padding: 2.5%;
                          margin: 2.5%;
                          border: 2px solid `+color+`;
                    '>
                          <!-- zone: <br> `+zone+` -->
                  </div>
              </div>
          `);
          left = left + (100/anchura);
        }
        top = top + (100/altura);
      }
    },
    renderCss: async ()=>{
      let cell_style = `
      <style>
      .cell {
        background: #0c0c0d;
        cursor: pointer;
        transition: .2s;
      }
      .cell:hover {
        background: #121213;
      }
      </style>
      `;
      append('body', cell_style);
    },
    onEvent: async ()=>{}
  },
  service: {},
  render: async () =>{
    if(data.var.h>data.var.w){
      s('main').style.height = data.var.w*0.95+'px';
      s('main').style.width = data.var.w*0.95+'px';
    }else{
      s('main').style.height = data.var.h*0.95+'px';
      s('main').style.width = data.var.h*0.95+'px';
    }
  }
};
