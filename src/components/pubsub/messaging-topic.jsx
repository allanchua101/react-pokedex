import {Subject} from 'rxjs/Subject';

export default class MessagingTopic {
    constructor() {
        this.subject = new Subject();
        this.observable = this.subject.asObservable();
    }

    publish(value) {
        this.subject.next(value);
    }

    subscribe(callback) {
        this.observable.subscribe(callback);
    }
}