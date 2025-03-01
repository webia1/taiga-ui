import {TuiStaticRequestService} from '../static-request.service';

const RESPONSE = {
    status: 200,
    contentType: `text/plain`,
    responseText: `awesome response`,
};

describe(`TuiStaticRequest service`, () => {
    let service: TuiStaticRequestService;

    beforeEach(() => {
        service = new TuiStaticRequestService();
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it(`returns the same observable on second request for the same URL`, () => {
        const result = service.request(`test`);
        const second = service.request(`test`);

        expect(result).toBe(second);
    });

    it(`returns the different observable on second request for different URL`, () => {
        const result = service.request(`test1`);
        const second = service.request(`test2`);

        expect(result).not.toBe(second);
    });

    it(`the request is made to the url and completes`, () => {
        let result = ``;
        let completed = false;

        service.request(`test`).subscribe({
            next: response => {
                result = response;
            },
            complete: () => {
                completed = true;
            },
        });

        jasmine.Ajax.requests.mostRecent().respondWith(RESPONSE);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe(`test`);
        expect(result).toBe(`awesome response`);
        expect(completed).toBe(true);
    });

    it(`the request is only made once, same result is returned on the subsequent calls`, () => {
        let result1 = ``;
        let result2 = ``;
        let completed = false;

        service.request(`test`).subscribe(response => {
            result1 = response;
        });

        jasmine.Ajax.requests.mostRecent().respondWith(RESPONSE);

        service.request(`test`).subscribe({
            next: response => {
                result2 = response;
            },
            complete: () => {
                completed = true;
            },
        });

        expect(jasmine.Ajax.requests.count()).toBe(1);
        expect(result2).toBe(result1);
        expect(completed).toBe(true);
    });
});
