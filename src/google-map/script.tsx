window['initMaps'] = () => {
    const maps = document.getElementsByClassName( 'wp-block-blockify-google-map' );

    [ ...maps ].forEach( ( map: HTMLDivElement ) => {
        const opts = window?.['blockifyGoogleMap' + map.getAttribute( 'data-id' )] ?? {
            id: '',
            dark: {},
            position: '',
            map: {
                zoom: '',
                styles: {},
                center: {
                    lat: 0,
                    lng: 0,
                },
            },
        };

        const windowMatchMedia = window.matchMedia( '(prefers-color-scheme: dark)' );
        const newMap           = new google.maps.Map( map, opts?.map );

        if ( windowMatchMedia.matches ) {
            newMap.setOptions( { styles: opts?.dark } );
        }

        new google.maps.Marker( { position: opts?.position, map: newMap } );

        windowMatchMedia.addEventListener( 'change', event => {
            newMap.setOptions( { styles: event?.matches ? opts?.dark : opts.map.styles } );
        } );
    } );
}
