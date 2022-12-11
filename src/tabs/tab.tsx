import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

registerBlockType( 'blockify/tab', {
    apiVersion: 2,
    title: 'Tab',
    parent: [
        'blockify/tabs'
    ],
    icon: 'table-row-after',
    category: 'blockify',
    attributes: {
        title: {
            type: 'string',
            default: __( 'Tab title', 'blockify' )
        },
        style: {
            type: 'object',
            default: {
                spacing: {
                    padding: {
                        top: '1em',
                        right: '1em',
                        bottom: '1em',
                        left: '1em'
                    }
                },
                border: {
                    radius: 'var(--wp--custom--border--radius)'
                },
                typography: {
                    lineHeight: '1'
                }
            }
        }
    },
    edit: ( { attributes, setAttributes } ) => {
        let blockProps = useBlockProps();

        return (
            <section { ...blockProps }>
                <RichText
                    tagName={ 'span' }
                    className={ 'blockify-tab-title' }
                    value={ attributes.title }
                    onChange={ ( title ) => setAttributes( { title } ) }
                />
                <div className={ 'blockify-tab-content' }>
                    <InnerBlocks template={ [ [
                        'core/group',
                        {
                            spacing: {
                                padding: {
                                    top: '1em',
                                    right: '1em',
                                    bottom: '1em',
                                    left: '1em',
                                }
                            }
                        },
                        [
                            [ 'core/paragraph' ]
                        ]
                    ] ] }/>
                </div>
            </section>
        );
    },

    save: ( { attributes } ) => {
        let blockProps = useBlockProps.save();

        return (
            <section { ...blockProps }>
                <RichText.Content
                    tagName={ 'span' }
                    className={ 'blockify-tab-title' }
                    value={ attributes.title }
                />
                <div className={ 'blockify-tab-content' }>
                    <InnerBlocks.Content/>
                </div>
            </section>
        );
    }
} );
