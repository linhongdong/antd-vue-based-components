/* eslint-disable no-undef */
/**
 * 事件监听
 */
class EventListener {
    /**
     * 添加事件
     * @param element 要添加事件的元素
     * @param eventName 事件名称
     * @param handler 事件绑定函数
     * @param useCapture 冒泡还是捕获等配置
     */
    public addEvent(
        element: Element | any = {},
        eventName: string,
        handler: EventListenerOrEventListenerObject,
        useCapture: boolean | AddEventListenerOptions = false,
    ) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent(`on${eventName}`, handler);
        } else {
            element[`on${eventName}`] = handler;
        }
    }
    /**
     * 移除事件
     * @param element 要添加事件的元素
     * @param eventName 事件名称
     * @param handler 事件绑定函数
     */
    public removeEvent(element: Element | any = {}, eventName: string, handler: EventListenerOrEventListenerObject) {
        if (element.addEventListener) {
            element.removeEventListener(eventName, handler);
        } else if (element.detachEvent) {
            element.detachEvent(`on${eventName}`, handler);
        } else {
            element[`on${eventName}`] = null;
        }
    }
}

export default new EventListener();
