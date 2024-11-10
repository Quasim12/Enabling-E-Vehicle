// eventBus.js
const eventBus = {
    events: {},
    dispatch(event, data) {
      if (!this.events[event]) return;
      this.events[event].forEach(callback => callback(data));
    },
    subscribe(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },
    unsubscribe(event, callback) {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  };
  
  export default eventBus;