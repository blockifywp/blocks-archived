const Counter = element => {
    if ( element.innerHTML === element.getAttribute( 'data-end' ) ) {
        return;
    }

    let data = {
        start: parseFloat( element.getAttribute( 'data-start' ) ),
        end: parseFloat( element.getAttribute( 'data-end' ) ),
        delay: parseInt( element.getAttribute( 'data-delay' ) ) || 0,
        duration: parseInt( element.getAttribute( 'data-duration' ) ) || 1
    }

    let counter      = data.start;
    let intervalTime = Math.ceil( ( data.duration * 1000 ) / ( data.end - data.start ) )

    element.innerHTML = counter.toString();

    setTimeout( () => {
        const intervalHandler = () => {
            counter += ( data.end - data.start ) / Math.abs( data.end - data.start );
            element.innerHTML = counter.toString();

            if ( interval && counter === data.end ) {
                clearInterval( interval )
            }
        }

        const interval = setInterval( intervalHandler, intervalTime );
    }, data.delay * 1000 )
};

document.addEventListener( 'DOMContentLoaded', () => {
    const observer = new IntersectionObserver( entries => {
        entries.forEach( entry => {
            if ( entry.isIntersecting ) {
                Counter( entry.target );
            }
        } );
    } );

    const blocks = document.querySelectorAll( '.wp-block-blockify-counter' );

    [ ...blocks ].forEach( block => {
        block.innerHTML = '0';
        observer.observe( block );
    } );
} );
