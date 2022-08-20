import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    useInnerBlocksProps,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings
} from '@wordpress/block-editor';
import './tab.tsx';
import './editor.scss';
import metadata from "./block.json";

document.addEventListener(
    'DOMContentLoaded',
        event => setTabsHeight( event )
);

const setTabsHeight = event => {
    const tabsBlocks = document.getElementsByClassName( 'wp-block-blockify-tabs' );

    let titleHeight = 20;

    [ ...tabsBlocks ].forEach( ( tabs: HTMLDivElement ) => {
        const tabsContent = tabs.querySelectorAll<HTMLDivElement>( '.blockify-tab-content' );

        if ( event && ( tabs !== event.target && ! tabs.contains( event.target ) ) ) {
            return;
        }

        const style = document.createElement( 'style' );
        style.id    = 'tabs-css';

        let tabsHeight = 200;

        [ ...tabsContent ].forEach( ( tabContent: HTMLDivElement ) => {
            let tabHeight = tabContent?.offsetHeight;

            if ( tabContent?.parentElement && tabContent?.parentElement?.offsetHeight ) {
                titleHeight = tabContent?.parentElement?.offsetHeight;
            }

            if ( tabHeight > tabsHeight ) {
                tabsHeight = tabHeight + titleHeight;
            }
        } );

        const selected = tabs.querySelectorAll<HTMLDivElement>( '[data-type="blockify/tab"].has-child-selected .blockify-tab-content, [data-type="blockify/tab"].is-selected .blockify-tab-content' );

        if ( selected && selected[0] ) {
            if ( selected[0].parentElement['offsetHeight'] ) {
                titleHeight = selected[0].parentElement['offsetHeight'];
            }

            tabsHeight = selected[0].offsetHeight + titleHeight;
        }

        style.innerHTML = '#' + tabs.id + ' { height: ' + ( tabsHeight + 1 ) + 'px}#' + tabs.id + ' .blockify-tab-content { top: ' + titleHeight + 'px};';

        document.getElementById( 'tabs-css' )?.remove();

        tabs.appendChild( style );
    } );
}

registerBlockType( metadata, {
    edit: ( { attributes, setAttributes } ) => {
        const {
                  style,
                  tabColor,
                  tabColorActive,
                  tabGradient,
                  tabGradientActive,
                  tabBackgroundColor,
                  tabBackgroundColorActive,
                  tabBackgroundGradient,
                  tabBackgroundGradientActive,
                  tabBorderRadius
              } = attributes;

        let blockProps         = useBlockProps();
        const innerBlocksProps = useInnerBlocksProps( {}, {
            allowedBlocks: [ 'blockify/tab' ],
            template: [ [ 'blockify/tab' ], [ 'blockify/tab' ], [ 'blockify/tab' ] ],
        } );
        const classes          = [
            'wp-block-blockify-tabs',
            'items-justified-' + attributes?.layout?.justifyContent,
            'orientation-' + attributes?.layout?.orientation,
            'tab-width-' + attributes?.tabWidth,
            attributes?.flexibleHeight ? 'has-flexible-height' : '',
            blockProps?.className
        ];

        blockProps.style = {
            ...blockProps.style,
            padding: '0 !important',
            '--tab-padding-top': style?.spacing?.padding?.top,
            '--tab-padding-right': style?.spacing?.padding?.right,
            '--tab-padding-bottom': style?.spacing?.padding?.bottom,
            '--tab-padding-left': style?.spacing?.padding?.right,
            '--tab-link-border-radius': tabBorderRadius,
            '--tab-link-color': tabGradient ?? tabColor,
            '--tab-link-color-active': tabGradientActive ?? tabColorActive,
            '--tab-link-background-color': tabBackgroundGradient ?? tabBackgroundColor,
            '--tab-link-background-color-active': tabBackgroundGradientActive ?? tabBackgroundColorActive
        };

        delete blockProps.style['paddingTop'];
        delete blockProps.style['paddingRight'];
        delete blockProps.style['paddingBottom'];
        delete blockProps.style['paddingLeft'];

        // TODO: Not working with FSE, target iframe instead of window.
        [ 'load', 'click', 'keydown', 'mouseenter' ].map( eventName => {
            window.addEventListener( eventName, event => {
                console.log( eventName );
                setTabsHeight( event );
            } );
        } );

        return (
            <div
                { ...blockProps }
                className={ classes.join( ' ' ) }
            >
                <InspectorControls>
                    <PanelColorGradientSettings
                        title={ __( 'Tab link colors', 'blockify' ) }
                        settings={ [
                            {
                                colorValue: tabColor,
                                gradientValue: tabGradient,
                                label: __( 'Tab link', 'blockify' ),
                                onColorChange: val => setAttributes( {
                                    tabColor: val
                                } ),
                                onGradientChange: val => setAttributes( {
                                    tabGradient: val
                                } ),
                            },
                            {
                                colorValue: tabColorActive,
                                gradientValue: tabGradientActive,
                                label: __( 'Tab link active', 'blockify' ),
                                onColorChange: val => setAttributes( {
                                    tabColorActive: val
                                } ),
                                onGradientChange: val => setAttributes( {
                                    tabGradientActive: val
                                } ),
                            },
                            {
                                colorValue: tabBackgroundColor,
                                gradientValue: tabBackgroundGradient,
                                label: __( 'Tab link background', 'blockify' ),
                                onColorChange: val => setAttributes( {
                                    tabBackgroundColor: val
                                } ),
                                onGradientChange: val => setAttributes( {
                                    tabBackgroundGradient: val
                                } ),
                            },
                            {
                                colorValue: tabBackgroundColorActive,
                                gradientValue: tabBackgroundGradientActive,
                                label: __( 'Tab link background active', 'blockify' ),
                                onColorChange: val => setAttributes( {
                                    tabBackgroundColorActive: val
                                } ),
                                onGradientChange: val => setAttributes( {
                                    tabBackgroundGradientActive: val
                                } ),
                            }
                        ] }
                    />
                </InspectorControls>
                { innerBlocksProps?.children }
            </div>
        );
    },

    save: ( { attributes } ) => {
        let blockProps = useBlockProps.save();

        const {
                  style,
                  tabColor,
                  tabColorActive,
                  tabGradient,
                  tabGradientActive,
                  tabBackgroundColor,
                  tabBackgroundColorActive,
                  tabBackgroundGradient,
                  tabBackgroundGradientActive
              } = attributes;

        const classes = [
            'wp-block-blockify-tabs',
            'items-justified-' + attributes?.layout?.justifyContent,
            'orientation-' + attributes?.layout?.orientation,
            'tab-width-' + attributes?.tabWidth,
            attributes?.flexibleHeight ? 'has-flexible-height' : '',
            blockProps?.className
        ];

        blockProps.style = {
            ...blockProps.style,
            padding: '0 !important',
            '--tab-padding-top': style?.spacing?.padding?.top,
            '--tab-padding-right': style?.spacing?.padding?.right,
            '--tab-padding-bottom': style?.spacing?.padding?.bottom,
            '--tab-padding-left': style?.spacing?.padding?.right,
            '--tab-link-color': tabGradient ?? tabColor,
            '--tab-link-color-active': tabGradientActive ?? tabColorActive,
            '--tab-link-background-color': tabBackgroundGradient ?? tabBackgroundColor,
            '--tab-link-background-color-active': tabBackgroundGradientActive ?? tabBackgroundColorActive
        };

        return (
            <div
                { ...blockProps }
                className={ classes.join( ' ' ) }
            >
                <InnerBlocks.Content/>
            </div>
        );
    }
} );
