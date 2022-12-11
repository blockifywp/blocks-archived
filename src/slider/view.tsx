import Glide from '@glidejs/glide';

const glideInit = () => {
    const sliders = document.getElementsByClassName( 'glide' );

    if ( ! sliders ) {
        return;
    }

    [ ...sliders ].forEach( slider => {
        const perView = slider.getAttribute( 'data-per-view' );

        new Glide( '#' + slider.id, {
            type: 'carousel',
            perView: parseInt( perView ),
            gap: 0,
            breakpoints: {
                783: {
                    perView: parseInt( perView ) > 1 ? 2 : 1
                },
                512: {
                    perView: 1
                }
            }
        } ).mount();
    } );
}

window.addEventListener( 'load', glideInit );
