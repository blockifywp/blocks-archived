import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import {
    PanelBody
} from '@wordpress/components';
import {
    InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import WidthControl from "./width-control";

registerBlockType( 'blockify/submit', {
    apiVersion: 2,
    title: __( 'Submit', 'blockify' ),
    description: __( 'Displays a submit button', 'blockify' ),
    icon: 'button',
    category: 'blockify-form',
    className: 'wp-block-blockify-submit',
    parent: [
        'blockify/form'
    ],
    keywords: [
        __( 'Form', 'blockify' ),
        __( 'Input', 'blockify' ),
        __( 'Button', 'blockify' ),
    ],
    supports: {
        multiple: false,
        align: false,
        alignWide: false,
        color: {
            gradients: true,
            background: true,
            text: true,
        },
        typography: {
            fontSize: true,
            lineHeight: true,
        },
        spacing: {
            margin: true,
            padding: true,
        },
        __experimentalBorder: {
            width: true,
            style: true,
            color: true,
            radius: true,
            __experimentalDefaultControls: {
                width: true,
                color: true
            }
        }
    },
    attributes: {
        value: {
            type: 'string',
            default: __( 'Submit', 'blockify' )
        },
        width: {
            type: 'string',
            default: 'auto'
        },
        textAlign: {
            type: "string"
        }
    },
    edit: ( { attributes, setAttributes } ) => {
        let blockProps            = useBlockProps();
        const [ width, setWidth ] = useState( attributes.width );
        const classArray          = blockProps.className.split( ' ' );
        let classString           = '';

        classArray.forEach( classItem => {
            if ( ! classItem.includes( '-color' ) ) {
                classString += ' ' + classItem;
            }
        } );

        blockProps.style = {
            ...blockProps.style,
            width: attributes?.width
        }

        return (
            <>
                <InspectorControls key="settings">
                    <PanelBody title={ __( 'Width settings', 'blockify' ) }>

                        <WidthControl
                            width={ width }
                            setWidth={ setWidth }
                            label={ __( 'Button width', 'blockify' ) }
                            onClick={ key => {
                                if ( key === width ) {
                                    setAttributes( { width: 'auto' } );
                                } else {
                                    setAttributes( { width: key } );
                                }
                            } }
                        />

                    </PanelBody>
                </InspectorControls>

                <RichText
                    { ...blockProps }
                    className={ blockProps.className + ' wp-block-button__link wp-element-button' }
                    tagName={ 'div' }
                    value={ attributes?.value }
                    placeholder={ __( 'Submit', 'blockify' ) }
                    onChange={ val => setAttributes( {
                        value: val
                    } ) }
                />
            </>
        );
    },
    save: ( { attributes } ) => {
        const blockProps = useBlockProps.save();
        const classArray = blockProps.className.split( ' ' );
        let classString  = '';

        blockProps.style = {
            ...blockProps.style,
            width: attributes?.width
        }

        classArray.forEach( classItem => {
            if ( ! classItem.includes( '-color' ) ) {
                classString += ' ' + classItem;
            }
        } );

        return (
            <RichText.Content
                { ...blockProps }
                tagName={ 'button' }
                className={ blockProps.className + ' wp-block-button__link wp-element-button' }
                value={ attributes.value }
            />
        );
    }
} );
