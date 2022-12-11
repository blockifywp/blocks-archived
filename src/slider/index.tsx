import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    useBlockProps,
    InspectorControls,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import {
    ToggleControl,
    PanelBody,
    PanelRow,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';
import './slide.tsx';
import './editor.scss';

import Glide from '@glidejs/glide';
import { useEffect, useState } from "@wordpress/element";
import { select } from '@wordpress/data';

const metadata = require( './block.json' );

registerBlockType( metadata, {
    edit: props => {
        const {
                  attributes,
                  clientId,
                  setAttributes
              }               = props;
        const {
                  showArrows,
                  showDots,
              }               = attributes;
        const blockProps      = useBlockProps();
        const [ parentBlock ] = useState( select( 'core/block-editor' ).getBlocksByClientId( clientId )[0] );

        const innerBlocksProps = useInnerBlocksProps( blockProps, {
            allowedBlocks: [
                'blockify/slide'
            ],
            template: [
                [ 'blockify/slide', [], [
                    [ 'core/paragraph' ]
                ] ],
                [ 'blockify/slide', [], [
                    [ 'core/paragraph' ]
                ] ],
                [ 'blockify/slide', [], [
                    [ 'core/paragraph' ]
                ] ],
            ]
        } );

        const defaultSettings = {
            type: 'carousel',
            perView: parseInt( attributes?.perView ) ?? 3,
            gap: 0,
            breakpoints: {
                782: {
                    perView: parseInt( attributes?.perView ) > 1 ? 2 : 1
                },
                512: {
                    perView: 1
                }
            }
        };

        const [ glide, setGlide ]: Glide = useState( {} );

        useEffect( () => {

            // TODO: Enable glide init on site editor.
            if ( ! document.querySelector( '.glide' ) ) {

                const iframe = document.getElementsByClassName( 'edit-site-visual-editor__editor-canvas' )[0];

                if ( iframe ) {
                    console.log( iframe );
                }

                return;
            }

            let newGlide = new Glide( '#block-' + clientId, defaultSettings );

            setGlide( newGlide );
            newGlide.mount();
        }, [ setGlide ] );

        setAttributes( {
            clientId: clientId
        } );

        return (
            <div { ...blockProps } className={ blockProps.className + ' glide' }>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Slider Settings', 'blockify' ) }
                        initialOpen={ true }
                        className={ 'blockify-slider-settings' }
                    >
                        <PanelRow>
                            <NumberControl
                                label={ __( 'Per View', 'blockify' ) }
                                help={ __( 'Number of slides to display in the viewport on desktop.', 'blockify' ) }
                                onChange={ value => {
                                    setAttributes( {
                                        perView: parseInt( value )
                                    } );

                                    if ( typeof glide.update === 'function' ) {
                                        glide.update( {
                                            perView: parseInt( value ),
                                            breakpoints: {
                                                782: {
                                                    perView: parseInt( value ) > 1 ? 2 : 1
                                                }
                                            }
                                        } );
                                    }
                                } }
                                step={ 1 }
                                shiftStep={ 1 }
                                isDragEnabled={ false }
                                isShiftStepEnabled={ false }
                                value={ parseInt( attributes?.perView ) ?? 3 }
                                min={ 1 }
                                max={ 6 }
                                require={ true }
                            />
                            <br/>
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show arrows', 'blockify' ) }
                                checked={ showArrows ?? false }
                                onChange={ () => setAttributes( {
                                    showArrows: ! showArrows
                                } ) }
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show dots', 'blockify' ) }
                                checked={ showDots ?? false }
                                onChange={ () => setAttributes( {
                                    showDots: ! showDots
                                } ) }
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>

                <div className="glide__track" data-glide-el="track">
                    <div className={ 'glide__slides' }>
                        { innerBlocksProps.children }
                    </div>
                </div>

                { showArrows &&
				  <div className="glide__arrows" data-glide-el="controls">
					  <button className="glide__arrow glide__arrow--left" data-glide-dir="<">{ __( 'Previous', 'blockify' ) }</button>
					  <button className="glide__arrow glide__arrow--right" data-glide-dir=">">{ __( 'Next', 'blockify' ) }</button>
				  </div>
                }

                { showDots &&
				  <div className="glide__bullets" data-glide-el="controls[nav]">

                      {
                          Object.keys( parentBlock.innerBlocks ).map( ( key, index ) =>
                              <button
                                  className="glide__bullet"
                                  data-glide-dir={ index }
                              />
                          )
                      }
				  </div>
                }

            </div>
        );
    },
    save: ( { attributes } ) => {
        const blockProps       = useBlockProps.save();
        const innerBlocksProps = useInnerBlocksProps.save();

        const { clientId, showArrows, showDots } = attributes;

        return (
            <div { ...blockProps } className={ blockProps.className + ' glide' } id={ blockProps?.id ?? 'block-' + clientId }>

                <div data-glide-el="track" className="glide__track">
                    <div className="glide__slides">
                        { innerBlocksProps.children }
                    </div>
                </div>

                { showArrows &&
				  <div className="glide__arrows" data-glide-el="controls">
					  <button className="glide__arrow glide__arrow--left" data-glide-dir="<">‹</button>
					  <button className="glide__arrow glide__arrow--right" data-glide-dir=">">›</button>
				  </div>
                }

                { showDots &&
				  <div className="glide__bullets" data-glide-el="controls[nav]">
                      {
                          [ 1, 2, 3 ].map( ( key, index ) =>
                              <button
                                  className="glide__bullet"
                                  data-glide-dir={ index }
                              />
                          )
                      }
				  </div>
                }

            </div>
        );
    }
} );

