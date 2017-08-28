// const oid = sessionStorage.getItem('oid');
// var socket = io('https://testpc.aqumon.com:443/getPush');
// var socket = io('http://192.168.0.155:5050', {forceNew: false, transports: ['websocket'], path: '/getPush', query: {uid: 100000379}})
// socket.on('data', function(msg){
//   console.warn("data",msg)
// });
// socket.on('datadsd', function(msg){
//   console.log("datadsd",msg)
// });


// {'uid': uid, 'action': 'confirmation_result', 'result': 'accept'}

// websocket 触发 vuex 指定 值,其他页面监听不同值的变化来 触发不同的行为

const wsBase = 'wss://testpc.aqumon.com/getPush';
let counter = 0;
let timeoutObj = null;
let websocket = null;
let socketFlag = false;

function websocketInit(vue, uid) {
  if (vue.$store.state.isGuodu) {
    let wsUri = wsBase;
    if (location.host.indexOf('localhost') === -1) {
      wsUri = wsBase.replace('testpc.aqumon.com', location.host);
    }
    if (counter > 10 * 60) {
      return;
    }
    console.log(wsUri);
    if (websocket && websocket.close) {
      websocket.close();
      socketFlag = true;
    }
    websocket = new WebSocket(wsUri);
    const heartCheck = {
      timeout: 60000, //60s
      reset: function () {
        clearTimeout(timeoutObj);
        console.log('reset'); this.start();
      },
      start: function () {
        timeoutObj = setTimeout(function () {
          var heart_beat = { action: "ping" };
          websocket.send(JSON.stringify(heart_beat));
          console.log('start')
        }, this.timeout)
      }
    }
    console.log('init')
    websocket.onopen = (evt) => {
      console.log('onopen')
      heartCheck.start();
      counter = 0;
      console.log(evt);
      const temp = { event: 'uid', data: uid };

      websocket.send(JSON.stringify(temp));
      console.warn(temp);
    };

    websocket.onerror = (evt) => {
      if (socketFlag) {
        socketFlag = false;
        return;
      }
      setTimeout(() => {
        counter++;
        websocketInit(vue, uid);
        // websocket.open();
      }, 5000);
      console.log(evt);
    };

    websocket.onmessage = (evt) => {
      // if(evt && evt.data == 'pong'){
      //   heartCheck.reset();
      //   return;
      // }
      counter = 0;
      if (evt && evt.data) {
        const Message = JSON.parse(evt.data);
        switch (Message.action) {
          case 'confirmation_result':
            if (Message.result === 'accept') {
              vue.$store.commit('WS_EVENT_CONFIRM', true + Math.random());
            } else if (Message.result === 'reject') {
              /**
               * {"action":"confirmation_result","uid": uid,"result":"reject"}
               * @type {[type]}
               */
              vue.$store.commit('WS_EVENT_REJECT', true + Math.random());
            }
            break;
          case 'kick_out':
            vue.$store.commit('WS_EVENT_KICKOFF', true + Math.random());
            break;
          case 'pong':
            // vue.$store.commit('WS_EVENT_KICKOFF', true +Math.random());
            heartCheck.reset();
            break;
          default:
            break;
        }
      }
      // vue.$store.commit('WS_EVENT_CONNECT', evt.data + Math.random());
      /**
       * {"action":"confirmation_result","uid": uid,"result":"accept"}
       * @type {[type]}
       */
    };
    websocket.onclose = (evt) => {
      // websocket = new WebSocket(wsUri);
      // websocketInit();
      setTimeout(() => {
        counter++;
        websocketInit(vue, uid);
        // websocket.open();
      }, 5000);
      console.log(evt);
    };
  }
};

export default websocketInit;
