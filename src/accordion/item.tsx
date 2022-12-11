import { __ } from '@wordpress/i18n';
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import domReady from "@wordpress/dom-ready";

domReady( () => {
    registerBlockStyle( 'blockify/accordion-item', {
        name: 'closed',
        label: __( 'Closed', 'blockify' ),
        isDefault: true,
    } );
    registerBlockStyle( 'blockify/accordion-item', {
        name: 'open',
        label: __( 'Open', 'blockify' ),
    } );
} );

registerBlockType( 'blockify/accordion-item', {
    apiVersion: 2,
    title: __( 'Accordion item', 'blockify' ),
    category: 'blockify',
    parent: [
        'blockify/accordion'
    ],
    icon: 'plus',
    attributes: {
        summary: {
            type: 'string',
            default: __( 'Item title', 'blockify' )
        }
    },
    edit: ( { attributes, setAttributes } ) => {
        const blockProps  = useBlockProps();
        const { summary } = attributes;

        return (
            <details { ...blockProps }>
                <RichText
                    tagName={ 'summary' }
                    className={ 'blockify-accordion-summary' }
                    placeholder={ summary }
                    value={ summary }
                    onChange={ val => setAttributes( {
                        summary: val
                    } ) }
                />
                <div className={ 'blockify-accordion-content' }>
                    <InnerBlocks
                        template={ [
                            [ 'core/paragraph' ]
                        ] }
                    />
                </div>
            </details>
        );
    },
    save: ( { attributes } ) => {
        const blockProps  = useBlockProps.save();
        const { summary } = attributes;

        return (
            <details { ...blockProps }>
                <RichText.Content
                    tagName={ 'summary' }
                    className={ 'blockify-accordion-summary' }
                    placeholder={ summary }
                    value={ summary }
                />
                <div className={ 'blockify-accordion-content' }>
                    <InnerBlocks.Content/>
                </div>
            </details>
        );
    }
} );
