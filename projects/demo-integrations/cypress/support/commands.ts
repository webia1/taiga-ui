import {
    tuiAddMatchImageSnapshotCommand,
    tuiBeInViewportAssertion,
    tuiWaitAllImgInside,
} from '@taiga-ui/testing/cypress';

import {tuiFocus} from './focus';
import {tuiHideDocPage, tuiShowDocPage} from './hide-doc-page';
import {tuiHideHeader} from './hide-header';
import {tuiHideLanguageSwitcher} from './hide-language-switcher';
import {tuiHideNavigation} from './hide-navigation';
import {tuiHideVersionManager} from './hide-version-manager';
import {tuiScrollIntoView} from './scroll-into-view';
import {tuiSetLanguage} from './set-language';
import {tuiSetNightMode} from './set-night-mode';
import {tuiTab} from './type-tab';
import {tuiVisit} from './visit';
import {tuiWaitCodeHighlight} from './wait-code-highlight';
import {tuiWaitKitDialog} from './wait-kit-dialog';

declare global {
    namespace Cypress {
        interface Chainable {
            getByAutomationId(automationId: string): Chainable<JQuery<HTMLElement>>;

            findByAutomationId(automationId: string): Chainable<JQuery<HTMLElement>>;

            tuiVisit: typeof tuiVisit;
            tuiHideHeader: typeof tuiHideHeader;
            tuiWaitKitDialog: typeof tuiWaitKitDialog;
            tuiSetLanguage: typeof tuiSetLanguage;
            tuiSetNightMode: typeof tuiSetNightMode;
            tuiHideNavigation: typeof tuiHideNavigation;
            tuiHideVersionManager: typeof tuiHideVersionManager;
            tuiHideLanguageSwitcher: typeof tuiHideLanguageSwitcher;
            tuiWaitCodeHighlight: typeof tuiWaitCodeHighlight;
            tuiHideDocPage: typeof tuiHideDocPage;
            tuiShowDocPage: typeof tuiShowDocPage;

            tuiTab(direction: 'forward' | 'backward'): Chainable;

            tuiScrollIntoView(): Chainable;

            tuiFocus(): Chainable;

            tuiWaitAllImgInside(enabled?: boolean): Chainable;
        }

        interface Chainer<Subject> {
            (chainer: 'be.inViewport'): Chainable<Subject>;
        }
    }
}

Cypress.Commands.add(`getByAutomationId`, id => cy.get(`[automation-id=${id}]`));
Cypress.Commands.add(
    `findByAutomationId`,
    {prevSubject: true},
    <S>(subject: S, id: string) =>
        /**
         * `subject` is just `jQuery`-element which has method `.find()`.
         * This method doesn't have {@link https://docs.cypress.io/guides/core-concepts/retry-ability retry-ability}!
         * ___
         * `cy.wrap(subject)` is a `$Chainer`-element (cypress built-in implementation) which also has method `.find()`.
         * This method has retry-ability!
         */
        cy.wrap(subject).find(`[automation-id=${id}]`),
);
Cypress.Commands.add(`tuiVisit`, tuiVisit);
Cypress.Commands.add(`tuiHideHeader`, tuiHideHeader);
Cypress.Commands.add(`tuiWaitKitDialog`, tuiWaitKitDialog);
Cypress.Commands.add(`tuiSetLanguage`, tuiSetLanguage);
Cypress.Commands.add(`tuiSetNightMode`, tuiSetNightMode);
Cypress.Commands.add(`tuiHideNavigation`, tuiHideNavigation);
Cypress.Commands.add(`tuiHideVersionManager`, tuiHideVersionManager);
Cypress.Commands.add(`tuiWaitCodeHighlight`, tuiWaitCodeHighlight);
Cypress.Commands.add(`tuiHideLanguageSwitcher`, tuiHideLanguageSwitcher);
Cypress.Commands.add(`tuiHideDocPage`, tuiHideDocPage);
Cypress.Commands.add(`tuiShowDocPage`, tuiShowDocPage);

Cypress.Commands.add(
    `tuiTab`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiTab,
);

Cypress.Commands.add(
    `tuiScrollIntoView`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiScrollIntoView,
);

Cypress.Commands.add(
    `tuiFocus`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiFocus,
);

Cypress.Commands.add(
    `tuiWaitAllImgInside`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    tuiWaitAllImgInside,
);

tuiAddMatchImageSnapshotCommand({
    allowSizeMismatch: true, // Windows CI fix
    runInProcess: true, // macOS CI fix
    failureThreshold: 0.0004,
    failureThresholdType: `percent`,
    comparisonMethod: `ssim`,
    diffDirection: `horizontal`,
    customDiffConfig: {
        ssim: `fast`,
        windowSize: 24,
    } as any,
});

chai.use(tuiBeInViewportAssertion);
