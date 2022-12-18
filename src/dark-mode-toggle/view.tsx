const setCookie = ( name: string, value: string, days: number ): void => {
	let expires = '';

	if ( days ) {
		const date = new Date();
		date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
		expires = '; expires=' + date.toUTCString();
	}

	document.cookie = name + '=' + ( value || '' ) + expires + '; path=/';
}

const getCookie = ( name: string ): string => {
	const nameEQ = name + '=';
	const ca     = document.cookie.split( ';' );

	for ( let i = 0; i < ca.length; i++ ) {
		let c = ca[i];

		while ( c.charAt( 0 ) == ' ' ) {
			c = c.substring( 1, c.length )
		}

		if ( c.indexOf( nameEQ ) == 0 ) {
			return c.substring( nameEQ.length, c.length );
		}
	}

	return '';
}

const eraseCookie = ( name: string ): void => {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

document.addEventListener( 'DOMContentLoaded', () => {
	const toggleButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll( '.wp-block-blockify-dark-mode-toggle' );

	if ( ! toggleButtons ) {
		return;
	}

	toggleButtons.forEach( toggleButton => {

		toggleButton.addEventListener( 'click', () => {
			document.body.classList.toggle( 'is-style-dark' );

			setCookie( 'blockifyDarkMode', document.body.classList.contains( 'is-style-dark' ) ? 'true' : 'false', 365 );
		} );
	} );
} );
