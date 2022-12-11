import './style.scss';

document.addEventListener( 'DOMContentLoaded', function() {
	const details = document.querySelectorAll( 'details' );

	details.forEach( ( targetDetail ) => {
		targetDetail.addEventListener( 'click', () => {

			details.forEach( ( detail ) => {
				if ( detail !== targetDetail ) {
					detail.removeAttribute( 'open' );
				}
			} );
		} );
	} );

	const summaries = document.getElementsByTagName( 'summary' );

	if ( summaries ) {
		const kebabCase = str =>
			str &&
			str
				.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
				.map(x => x.toLowerCase())
				.join('-');

		[ ...summaries ].forEach( function( summary ) {
			summary.id = kebabCase( summary.innerText );
		} );
	}
} );
