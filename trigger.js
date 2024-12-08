class EventTrigger {
  static addEventListener(eventName, callback) {
    EventTrigger.Listeners.count++;
    const eventId = "l" + EventTrigger.Listeners.count;
    EventTrigger.Listeners.refs[eventId] = {
      name: eventName,
      callback,
    };
    return eventId;
  }
  static removeEventListener(id) {
    return delete EventTrigger.Listeners.refs[id];
  }
  static removeAllListeners() {
    let removeError = false;
    Object.keys(EventTrigger.Listeners.refs).forEach((_id) => {
      const removed = delete EventTrigger.Listeners.refs[_id];
      removeError = !removeError ? !removed : removeError;
    });
    return !removeError;
  }
  static emitEvent(eventName, data) {
    Object.keys(EventTrigger.Listeners.refs).forEach((_id) => {
      if (
        EventTrigger.Listeners.refs[_id] &&
        eventName === EventTrigger.Listeners.refs[_id].name
      ) {
        EventTrigger.Listeners.refs[_id].callback(data);
      }
    });
  }
  static on(eventName, callback) {
    return EventTrigger.addEventListener(eventName, callback);
  }
  static rm(id) {
    return EventTrigger.removeEventListener(id);
  }
  static rmAll() {
    return EventTrigger.removeAllListeners();
  }
  static emit(eventName, data) {
    EventTrigger.emitEvent(eventName, data);
  }
}
EventTrigger.Listeners = {
  count: 0,
  refs: {},
};
// 이벤트 리스너 추가
const eventId1 = EventTrigger.addEventListener("testEvent", (data) => {
  console.log("handleTestEvent received:", data);
});
console.log("Event Listener added with ID:", eventId1);
// 이벤트 리스너 추가
const eventId2 = EventTrigger.addEventListener("testEvent", (data) => {
  console.log("handleTestEvent2 received:", data);
});
console.log("Event Listener added with ID:", eventId2);
// 이벤트 발생
EventTrigger.emitEvent("testEvent", { message: "Hello, Event 1!" });
// 이벤트 리스너 제거
const removeSuccess = EventTrigger.removeEventListener(eventId1);
console.log(`Event Listener ${eventId1} removed:`, removeSuccess);
// 동일한 이벤트를 다시 발생시켜 남아 있는 리스너 확인
EventTrigger.emitEvent("testEvent", { message: "Hello, Event 2!" });
// 모든 이벤트 리스너 제거
const removeAllSuccess = EventTrigger.removeAllListeners();
console.log("All Event Listeners removed:", removeAllSuccess);
// 이벤트 발생 (더 이상 리스너가 없음)
EventTrigger.emitEvent("testEvent", { message: "Hello, Event 3!" });
