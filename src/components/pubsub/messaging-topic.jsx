import {Subject} from 'rxjs/Subject';

export default class MessagingTopic {
    constructor() {
        this.subject = new Subject();
    }

    publish(value) {
        this.subject.next(value);
    }

    messages() {
        return this.subject.asObservable();
    }
}