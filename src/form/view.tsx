document.addEventListener( 'DOMContentLoaded', () => {
    let recaptcha    = document.getElementsByClassName( 'g-recaptcha' )[0] as HTMLDivElement;
    let hasAutoTheme = recaptcha?.getAttribute( 'data-theme' ) === 'auto';

    if ( ! hasAutoTheme ) {
        return;
    }
    let siteKey    = recaptcha?.getAttribute( 'data-sitekey' );

    let mediaMatch = window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' );

    recaptcha.setAttribute( 'data-theme', mediaMatch.matches ? 'dark' : 'light' );

    mediaMatch.addEventListener( 'change', () => {
        let grecaptcha = window?.['grecaptcha'] as any;

        grecaptcha?.reset( recaptcha, {
            theme: mediaMatch.matches ? 'dark' : 'light',
            sitekey: siteKey
        } );
    } );
} );

window.onload = () => {
    let recaptchaResponse = document.querySelector( '#g-recaptcha-response' ) as HTMLTextAreaElement;

    if ( recaptchaResponse ) {
        recaptchaResponse.setAttribute( 'required', 'required' );
    }

    const form = document.querySelector( 'form' );

    form.addEventListener( 'submit', event => {
        if ( ! recaptchaResponse?.value ) {
            event.preventDefault();
        }
    } );
};
