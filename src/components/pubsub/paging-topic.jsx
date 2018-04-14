import {Subject} from 'rxjs/Subject';

/**
 * Class that implement pub-sub mechanisms
 * for paging related events.
 */
export default class PagingTopic {
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