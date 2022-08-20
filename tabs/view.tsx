import './style.scss';
import domReady from "@wordpress/dom-ready";

domReady( () => {
    const toggleTabs = () => {
        const tabGroups = document.getElementsByClassName( 'wp-block-blockify-tabs' );

        if ( ! tabGroups ) {
            return;
        }

        [ ...tabGroups ].forEach( tabGroup => {
            const navItems = tabGroup.getElementsByClassName( 'blockify-tab-title' );
            const contents = tabGroup.getElementsByClassName( 'blockify-tab-content' );

            [ ...navItems ].forEach( ( navItem, index ) => {
                navItem.setAttribute( 'data-index', index.toString() );
            } );

            [ ...contents ].forEach( ( content, index ) => {
                content.classList.add( 'screen-reader-text' );
                content.setAttribute( 'data-index', index.toString() );
            } );

            navItems[0].classList.add( 'active' );
            contents[0].classList.remove( 'screen-reader-text' );

            [ ...navItems ].forEach( ( navItem, index ) => {
                const relatedSection = tabGroup.querySelector( '.blockify-tab-content[data-index="' + index + '"]' );

                navItem.addEventListener( 'click', () => {
                    [ ...navItems ].forEach( navItem => {
                        navItem.classList.remove( 'active' );
                    } );

                    [ ...contents ].forEach( content => {
                        content.classList.add( 'screen-reader-text' );
                    } );

                    navItem.classList.add( 'active' );
                    relatedSection.classList.remove( 'screen-reader-text' );
                } );
            } );
        } );
    };

    setTimeout( toggleTabs, 0 );
} );

